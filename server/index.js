require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      aws = require('aws-sdk'),
      multer = require('multer'),
      multerS3 = require('multer-s3'),
      path = require('path');  // A core node module for working with file and directory paths ( install uneccessary )

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
massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .catch(err => console.log(err));

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
    storage: storage,              // Storage
    limits: { fileSize: 1000000 }, // File size limit
}).single('image')                 // This fieldname must match request fieldname ('image')


// Uploads file to S3
app.post('/api/upload', upload, (req, res, next) => {
    console.log('Uploaded file: ', req.file);
    const db = app.get('db');
    const { key, location } = req.file;

    // The file name and link are added to database after the upload
    db.create_image( [key, location] ).then( images => {
        const image = { id: images[0].id, image_url: images[0].image_url }
        res.status(200).json(image);
    }).catch(err => console.log(err));
});

// Deletes object from S3
app.delete('/api/delete/:key', (req, res, next) => {
    const db = app.get('db');
    // Parameters for the S3 method
    const params = { 
        Bucket: process.env.AWS_BUCKET, 
        Key: req.params.key
    };
    // Deletes object from S3
    s3.deleteObject(params, (err, data) => {
        // If error return error
        if (err) return res.json({ error: err });

        // Deletes image from the database
        db.delete_image( [req.params.key] ).then( () => {
            res.status(200).json({ msg: 'Deleted'});
        }).catch(err => console.log(err));
    });
});

// Gets image link info from the database
app.get('/api/images', (req, res, next) => {
    const db = app.get('db');
    db.read_images().then( images => {
        res.status(200).json(images)
    }).catch(err => console.log(err));
});


const port = process.env.SERVER_PORT || 3060;
app.listen(port, () => console.log(`Listening on port: ${port}`));