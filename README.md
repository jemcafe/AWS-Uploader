# AWS S3 - Upload and Delete

This is a simple react app where files can be uploaded to and deleted from AWS S3. After a file is uploaded, the image link is stored in the database.

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

<!-- ## Helpful sources

### Multer and MulterS3
* https://www.youtube.com/watch?v=9Qzmri1WaaE
* https://github.com/badunk/multer-s3
* https://scotch.io/@cizu/building-a-amazon-s3-api-with-express-and-multer-s3
### AWS
* https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html
* https://github.com/keithweaver/python-aws-s3
* https://www.youtube.com/watch?v=DXNS-EP9sXM&t=5s
* https://www.youtube.com/watch?v=mt32JEAxrA4

Aspects of each of these resources helped me understand how the parts works. -->