const express=require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const multer  = require('multer');
const mongoose = require('../mongodb')
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const dbConfig = require('../config/database.config.js');
const crypto=require('crypto')
const mm = require('music-metadata');
const btoa=require('btoa');
const fs=require('fs');
const {Readable} = require('readable-stream');
const ObjectID = require("bson-objectid");
const conn = mongoose.createConnection(dbConfig.url,
    {
        useNewUrlParser: true
      }
);
let gfs
// conn.once('open',()=>{

//      gfs =   Grid(conn.db,mongoose.mongo);
//      gfs.collection('uploads')
// })
const app = express(); 


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up the storage element
let storage = GridFsStorage({
    url: dbConfig.url,
    options: {
        useNewUrlParser: true
      },
      file: (req, file) => {
       
        return new Promise((resolve, reject) => {
            const filename = btoa(file.originalname)
            gfs.files.findOne({filename:filename}).then(file=>{
             
             if(!file){ const fileInfo = {
                filename: filename,
                metadata:{file:filename},
                bucketName: 'uploads'
              }
              resolve(fileInfo)
            }else{
              reject("File already exists")
            }
            })
        })
      }
});

// Multer configuration for single file uploads
// let uploadFile = multer({
//      storage
// });
let uploadFile=multer();

// Route for file upload
app.post('/upload',uploadFile.single('file'), (req, res) => {
  const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });

  const readableTrackStream = new Readable();
  readableTrackStream.push(req.file.buffer);
  readableTrackStream.push(null);
  mm.parseBuffer(req.file.buffer, req.file.mimetype, { fileSize: req.file.size }).then(
    md=>{
      const writeStream = gridFSBucket.openUploadStream(btoa(md.common.title), {chunkSizeBytes:1024, metadata:md, contentType: null, aliases: null});
      let id = writeStream.id;
      readableTrackStream.pipe(writeStream);

      writeStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      writeStream.on('finish', () => {
        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
      });
      
        })
//   gfs.files.findOne({filename:req.file.filename}).then(file=>{
//     mm.parseStream(gfs.createReadStream(file),file.contentType,{fileSize:file.length}).then(
//     md=>{
        
//         gfs.files.update(
//           {filename:file.filename},{
//             $set:{'metadata':md}
//           }
//         ).then(resp=>{if(resp.result.nModified===1){
//           res.json({status:"done",name:req.file.filename, file_uploaded: true});
//         }else{
//           res.sendStatus(500)
//         }
//       }
//     )
//   })
        
   
// });
});

app.get('/files',async(req,res)=>{
  const gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
  try{
await  gridFSBucket.find().toArray((err,files)=>{
     if(!files || files.length === 0){
         return res.json({
             err:"No files exists"
         }) 
     }
     return res.json(files);
 }) 

}catch(ex){
  console.log(ex)
}
})
app.get('/files/:trackID',async(req,res)=>{
  const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
 
  try{
    var trackID = new ObjectID(req.params.trackID);
    // song = await bucket.find({filename:trackID})
  }catch(ex){
    console.log(ex)
  }
  let downloadStream = await bucket.openDownloadStream(trackID);
  
 
downloadStream.on('data', (chunk) => {
  res.write(chunk);
});

downloadStream.on('error', () => {
  res.sendStatus(404);
});

downloadStream.on('end', () => {
  res.end();
});
// let song;
// try{

//    song=  await gridFSBucket.findOne({filename:filename})
// }catch(ex){
//   console.log(ex)
// }
// console.log(song.filename)
//  fs.createReadStream(song.filename).pipe(res)
})


// app.post("/upload",upload.single('file'),(req,res)=>{
//     console.log(req.file)
// })

module.exports=app;