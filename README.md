# AWS S3 - Upload and Delete

This is a simple app that uploads files to and deletes files from AWS S3. After a file is uploaded, the image link is stored in the database.

On the AWS side, I'm using IAM which supplies basic security. It is setup so users only have permission to read, add (put), or delete objects in a specific bucket. Images are public, but the bucket isn't.

## Modules Installed

* aws-sdk
* multer
* multerS3
* superagent
* react-dropzone
* express
* body-parser
* massive
* postgreSQL
* axios

