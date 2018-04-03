# AWS S3 Upload

Files can be uploaded to AWS S3.

On the AWS side, I'm using IAM which supplies some basic security. It is setup where the user is only given permission to read, add (put), or delete objects in the specified bucket.

## Modules Installed

* express
* body-parser
* massive
* postgreSQL
* axios
* aws-sdk
* multer
* multerS3
* superagent
* react-dropzone