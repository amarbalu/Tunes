const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("../mongodb");
const dbConfig = require("../config/database.config.js");
const mm = require("music-metadata");
const btoa = require("btoa");
const { Readable } = require("readable-stream");

const app = express.Router();
const conn = mongoose.createConnection(dbConfig.url, {
  useNewUrlParser: true,
});
let uploadFile = multer();

// Route for file upload
app.post("/upload", uploadFile.single("file"), (req, res) => {
  const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  try {
    
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);
    mm.parseBuffer(req.file.buffer, req.file.mimetype, {
      fileSize: req.file.size
    }).then((md) => {
      gridFSBucket
        .find({ filename: btoa(md.common.title) })
        .toArray((err, files) => {
          if (!files || files.length === 0) {
            const writeStream = gridFSBucket.openUploadStreamWithId(
              `id${req.user.id}ran${Math.random()}`,
              btoa(md.common.title),
              {
                chunkSizeBytes: 1024,
                metadata: md,
                contentType: null,
                aliases: null, 
               
              },
            );
            let id = writeStream.id;
            readableTrackStream.pipe(writeStream);

            writeStream.on("error", () => {
              return res
                .status(500)
                .json({ status: "error", message: "Error uploading file" });
            });

            writeStream.on("finish", () => {
              return res
                .status(201)
                .json({
                  status: "done",
                  message:
                    "File uploaded successfully, stored under Mongo ObjectID: " +
                    id,
                });
            });
          } else {
            res
              .status(500)
              .json({ status: "error", message: "File already exists" });
          }
        });
    });
  } catch (ex) {
    res.status(500);
  }
});

app.get("/files", async (req, res) => {
console.log(req.csrfToken)
  try {    
    const id=req.user.id
    const regex=new RegExp(`^id${id}`);
    const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
    await gridFSBucket.find({
      // _id:regex
    }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.json({
          err: "No files exists",
        });
      }
      return res.json(files);
    });
  } catch (ex) {
    console.log(ex);
  }
});
app.delete("/trashit/:trackID", async (req, res) => {
  
  try {
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
    bucket.delete(req.params.trackID, function (error) {
      if (!error) {
        
        res.status(201).json({
          success: true,
          message: `Record with id ${req.params.trackID} deleted successfully`,
        });
      }
    });
  } catch (ex) {
    console.log(ex);
  }
});
app.get("/files/:trackID", async (req, res) => {
  const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  try {
    const trackID = req.params.trackID; 
    await bucket.find({_id:trackID}).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "No files exists",
        });
      }
      const responseHeaders = {}; 
     const rangeRequest = readRangeHeader(req.headers['range'], files[0].length );

  // If 'Range' header exists, we will parse it with Regular Expression.
  if (rangeRequest===null) {
      responseHeaders['Content-Type'] = "audio/mp3"
      responseHeaders['Content-Length'] = files[0].length;  // File size.
      responseHeaders['Accept-Ranges'] = 'bytes';

      //  If not, will return file directly.
      sendResponse(res, 200, responseHeaders, bucket.openDownloadStream(trackID));
      return null;
  }

  var start = rangeRequest.Start;
  var end = rangeRequest.End;

  // If the range can't be fulfilled. 
  if (start >= files[0].length || end >= files[0].length-1) {
      // Indicate the acceptable range.
      responseHeaders['Content-Range'] = 'bytes */' + files[0].length; // File size.

      // Return the 416 'Requested Range Not Satisfiable'.
      sendResponse(res, 416, responseHeaders, null);
      return null;
  }

  // Indicate the current range. 
  responseHeaders['Content-Range'] = 'bytes ' + start + '-' + end + '/' + files[0].length;
  responseHeaders['Content-Length'] = start == end ? 0 : (end - start + 1);
  responseHeaders['Content-Type'] = 'audio/mp3';
  responseHeaders['Accept-Ranges'] = 'bytes';
  responseHeaders['Cache-Control'] = 'no-cache';

  // Return the 206 'Partial Content'.
  sendResponse(res, 206, responseHeaders, bucket.openDownloadStream(trackID, { start: start, end: files[0].length }));
    });

  } catch (ex) {
    console.log(ex);
  }
 
  
});
function sendResponse(response, responseStatus, responseHeaders, readable) {
  response.writeHead(responseStatus, responseHeaders);

  if (readable == null)
      response.end();
  else
      readable.on('data', function (chunk) {
         response.write(chunk)
      });
      readable.on("end", () => {
        response.end();
  });

  return null;
}

function getMimeNameFromExt(ext) {
  var result = mimeNames[ext.toLowerCase()];
  
  // It's better to give a default value.
  if (result == null)
      result = 'application/octet-stream';
  
  return result;
}

function readRangeHeader(range, totalLength) {
      /*
       * Example of the method 'split' with regular expression.
       * 
       * Input: bytes=100-200
       * Output: [null, 100, 200, null]
       * 
       * Input: bytes=-200
       * Output: [null, null, 200, null]
       */

  if (range == null || range.length == 0)
      return null;

  var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
  var start = parseInt(array[1]);
  var end = parseInt(array[2]);
  var result = {
      Start: isNaN(start) ? 0 : start,
      End: isNaN(end) ? (totalLength - 1) : end
  };
  
  if (!isNaN(start) && isNaN(end)) {
      result.Start = start;
      result.End = totalLength - 1;
  }

  if (isNaN(start) && !isNaN(end)) {
      result.Start = totalLength - end;
      result.End = totalLength - 1;
  }

  return result;
}


module.exports = app;
