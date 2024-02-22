import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import dichvuRoutes from "./routes/dichvus.js";

import cookieParser from "cookie-parser";
import multer from "multer";

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const fs = require('fs');
// const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/test', (req,res)=> {
  res.json('abc')
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
  file.originalname = file.originalname.replace(/\s/g, "");
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.array("files"), function (req, res) {
  const files = req.files;
  console.log(req.body.oldImage);
  console.log(req.files);

  console.log(req.body.oldImage.split(',').length);
  if (files) {
    const filenames = files.map(file => file.filename);

    if (req.body.oldImage) {
      try {
        if ((req.body.oldImage.split(',').length) == 1) {
          fs.unlinkSync(path.join('../client/public/upload', req.body.oldImage));
        } else if ((req.body.oldImage.split(',').length) > 1) {
          let deleteFiles = req.body.oldImage.split(',');
          for (let i =0; i<req.body.oldImage.split(',').length; i++) {
            fs.unlinkSync(path.join('../client/public/upload', deleteFiles[i]));
            console.log('Deleted '+deleteFiles[i]);
          }
        
        }

        console.log('Old image deleted');
      } catch(err) {
        console.error('Error in deleting old image: ', err);
      }
    }

    res.status(200).json(filenames);
  } else {
    res.status(200).json('No files');
  }
});

// app.post("/api/upload", upload.single("file"), function (req, res) {
//   const file = req.file;
//   console.log(req.file);
//   if (file) {
//     res.status(200).json(file.filename);
//   } else {
//     res.status(200).json('No file');
//   }
// });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dichvus", dichvuRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});


