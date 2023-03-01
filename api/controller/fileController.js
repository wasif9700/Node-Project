const multer = require('multer');
const fs = require('fs');
const path = require('path');
const port = 3300
const express = require('express')
const app = express()
app.use(express.json())



  const fileUpload = (req, res) => {
    if(req.body.file === ""){
      return res.status(404).json({
        message:"file not attached"
      })
    }
    res.status(200).json({
      message: "File uploaded"
    });
  };

 

 const getimage = (req,res)=>{
    let dir = "uploads/" + req.email
    fs.readdir(dir,(err,files)=>{
      if(err){
      return res.status(500).json({
          message:"Error Fetching File"
        });
      }

      let fileUrls= files.map((file)=>{
        return `${req.protocol}://${req.hostname}:${port}/${dir}/${file}`
      });
     return res.json({
        files:fileUrls
      })
    })
  }


  const deleteimg = (req,res)=>{
    let dir = "uploads/" + req.email
    fs.rmdir(dir,{recursive: true},(err,files)=>{
      if(err){
        return res.status(500).json({
            message:"Error Deleting File!"
          });
        }
  
        return res.status(200).json({
          message: "Deleted Successfully!!!!!"
        })
    })
  
  }

  module.exports = {fileUpload,getimage,deleteimg}