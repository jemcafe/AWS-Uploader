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

// Sever
const app = express();

// AWS S3
const s3 = new aws.S3();

// JSON parser
app.use(bodyParser.json());

// Connnection to the database (Massive is for PostgreSQL)
massive(process.env.CONNECTION_STRING)
    .then(db => app.set('db', db))
    .catch(err => console.log(err));

// Storage
const storage = multerS3({
    s3: s3,                                      // S3 storage
    bucket: process.env.AWS_BUCKET,              // The file will be stored in the specified bucket
    acl: 'public-read',                          // The file will be viewable by anyone
    contentType: multerS3.AUTO_CONTENT_TYPE,     // This multerS3 method finds the content type of the file. The default contentType is 'application/octet-stream' in S3, which makes file downloadable in the browser instead of viewable.
    metadata: function (req, file, cb) {         // Metadata provides info about the other data in the file (extra information)
        cb(null, { fieldName: file.fieldname }); // The fieldname will be whatever the request fieldname is (it's named 'image' on the front end)
    },
    key: function (req, file, cb) {              // The key is the name of the file
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);  // path.ext() gets the file extension (.jpg, .png, .gif...)
    }
})

// Init upload
const upload = multer({
    storage: storage,              // Storage location
    limits: { fileSize: 1000000 }  // File size limit in bytes
}).single('image')                 // This fieldname must match the request fieldname (I chose to call it 'image') 


// Uploads file to S3 ( upload used as middleware )
// app.post('/api/upload', upload, (req, res, next) => {
//     console.log('Uploaded file: ', req.file);
//     const db = app.get('db');
//     const { key, location } = req.file;

//     // The file name (key) and the link to the file (location) are added to database after the upload
//     db.create_image( [key, location] ).then( images => {
//         const image = { id: images[0].id, image_url: images[0].image_url }
//         res.status(200).json(image);
//     }).catch(err => console.log(err));
// });

// Uploads file to S3 ( upload not used as middleware )
app.post('/api/upload', (req, res, next) => {
    const db = app.get('db');

    upload(req, res, (error) => {
        // If there's an error, the error message is sent
        if (error) {
            res.status(412).json({ msg: error });

        // If no file was submitted, an error message is sent
        } else if (req.file == undefined) {
            res.status(412).json({ msg: 'Error: no file selected' });
        
        // Upload successful
        } else {
            console.log('Uploaded file: ', req.file);
            const { key, location } = req.file;

            // The file name (key) and link to the file (location) are added to database
            db.create_image( [key, location] ).then( images => {
                const image = { 
                    id: images[0].id, 
                    image_url: images[0].image_url 
                }
                res.status(200).json(image);
            }).catch(err => console.log(err));
        }
    })
});

// Deletes object from S3
app.delete('/api/delete/:key', (req, res, next) => {
    const db = app.get('db');

    // Parameters for the S3 delete method. The bucket and file name are needed.
    const params = { 
        Bucket: process.env.AWS_BUCKET, 
        Key: req.params.key
    };

    // Deletes object from S3
    s3.deleteObject(params, (error, data) => {
        // If there's an error return and send the error
        if (error) return res.json({ msg: error });

        // Deletes image info from the database after its deleted from S3
        db.delete_image( [req.params.key] ).then( () => {
            res.status(200).json({ msg: 'Deleted'});
        }).catch(err => console.log(err));
    });
});

// Gets all the image links from the database
app.get('/api/images', (req, res, next) => {
    const db = app.get('db');
    
    db.read_images().then( images => {
        res.status(200).json(images)
    }).catch(err => console.log(err));
});


const port = process.env.SERVER_PORT || 3060;
app.listen(port, () => console.log(`Listening on port: ${port}`));