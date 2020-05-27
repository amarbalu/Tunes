const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("../mongodb");
const dbConfig = require("../config/database.config.js");
const mm = require("music-metadata");
const btoa = require("btoa");
const { Readable } = require("readable-stream");
const ObjectID = require("bson-objectid");
// const redis=require('redis')
// const util=require('util')
// const redisUrl="redis://127.0.0.1:6379";

// const client=redis.createClient(redisUrl);
const conn = mongoose.createConnection(dbConfig.url, {
  useNewUrlParser: true,
});

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
//    client.get= util.promisify(client.get);
//    const cache=await client.get(req.user.id);
//    if(cache){
//      console.log("From Cache")
// res.json(JSON.parse(cache));
//    }else{
    await gridFSBucket.find({_id:regex}).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.json({
          err: "No files exists",
        });
      }
      // client.set(req.user.id,JSON.stringify(files))
      return res.json(files);
    });
  // }
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
    var trackID = req.params.trackID;
  } catch (ex) {
    console.log(ex);
  }
  let downloadStream = await bucket.openDownloadStream(trackID);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
});

module.exports = app;
