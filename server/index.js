require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      path = require('path'),  // A core node module for working with file and directory paths ( install uneccessary )
      aws = require('aws-sdk'),
      multer = require('multer'),
      multerS3 = require('multer-s3');

// Configuration settings for the region, credentials, and other options for aws requests
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION
});

//
const app = express();

// AWS S3
const s3 = new aws.S3();

//
app.use(bodyParser.json());
// massive(process.env.CONNECTION_STRING)
//     .then(db => app.set('db', db))
//     .catch(err => console.log(err));

// Storage
const storage = multerS3({
    s3: s3,                                      // S3 storage
    bucket: process.env.AWS_BUCKET,              // The file is stored a specific bucket
    acl: 'public-read',                          // The file will be viewable by anyone
    contentType: multerS3.AUTO_CONTENT_TYPE,     // This multerS3 method finds the content type of the file. The default contentType is 'application/octet-stream' in S3, which makes file downloadable in the browser instead of viewable.
    metadata: function (req, file, cb) {         // Metadata provides info about other data in the file
        cb(null, { fieldName: file.fieldname }); // The fieldname metedata will be whatever the request fieldname is ('image')
    },
    key: function (req, file, cb) {              // The key is the name of the file
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  // path.ext() gets the file extension (.jpg, .png, .gif...)
    }
})

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('image')  // This fieldname must match request fieldname ('image')

// Endpoints
app.post('/api/upload', upload, (req, res, next) => {
    console.log('Uploaded File: ', req.file);
    res.status(200).send('File uploaded');
});


const port = process.env.SERVER_PORT || 3060;
app.listen(port, () => console.log(`Listening on port: ${port}`));