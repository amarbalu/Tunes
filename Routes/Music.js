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
const btoa=require('btoa')
const conn = mongoose.createConnection(dbConfig.url,
    {
        useNewUrlParser: true
      }
);
let gfs
conn.once('open',()=>{

     gfs =   Grid(conn.db,mongoose.mongo);
     gfs.collection('uploads')
})
const app = express(); 


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin' , '*');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     // res.append('Access-Control-Allow-Credentials', true);
//     next();
// });

// Setting up the storage element
let storage = GridFsStorage({
    url: dbConfig.url,
    options: {
        useNewUrlParser: true
      },
      file: (req, file) => {
       
        return new Promise((resolve, reject) => {
          // crypto.randomBytes(16, (err, buf) => {
          //   if (err) {
          //     return reject(err)
          //   }
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
            // buf.toString('hex') + path.extname(file.originalname);
            
           
          // })
        })
      }
});

// Multer configuration for single file uploads
let uploadFile = multer({
     storage
});

// Route for file upload
app.post('/upload',uploadFile.single('file'), (req, res) => {
    
  gfs.files.findOne({filename:req.file.filename}).then(file=>{
    mm.parseStream(gfs.createReadStream(file),file.contentType,{fileSize:file.length}).then(
    md=>{
        
        gfs.files.update(
          {filename:file.filename},{
            $set:{'metadata':md}
          }
        ).then(resp=>{if(resp.result.nModified===1){
          res.json({status:"done",name:req.file.filename, file_uploaded: true});
        }else{
          res.sendStatus(500)
        }
      }
    )
  })
        
   
});
});

app.get('/files',async(req,res)=>{
try{
await  gfs.files.find().toArray((err,files)=>{
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
app.get('/files/:filename',async(req,res)=>{
const filename=req.params.filename;
let song;
try{

   song=  await gfs.files.findOne({filename:filename})
}catch(ex){
  console.log(ex)
}
console.log(song.filename)
 gfs.createReadStream(song.filename).pipe(res)
})


// app.post("/upload",upload.single('file'),(req,res)=>{
//     console.log(req.file)
// })

module.exports=app;