## AWS S3 - Upload and Delete

Upload to and delete files from Amazon Web Service S3 with nodejs. In AWS, I'm using IAM which supplies basic security. It is setup so users only have permission to read, add (put), or delete objects from a bucket. Images are public, but the bucket isn't. 

I'm using React for the front end.

### Prerequisites

You will need to have an sufficient version of [node.js](https://nodejs.org/en/) and [npm](https://nodejs.org/en/) (or [yarn](https://yarnpkg.com/lang/en/)).

You can use [postman](https://www.getpostman.com/) to test the HTTP requests.

### Create react app

Choose a directory and create your react app.
```
$ create-react-app <app-name>
```

### Install

* aws-sdk
* multer
* multerS3
* dotenv
* superagent
* axios
* react-dropzone
* massive (for postgreSQL) (optional)

```
$ npm install aws-dk multer multerS3 dotenv superagent axios react-dropzone massive
```

We also need express, but that's already installed with create-react-app. Also massive is not necessary. I just used it to store the link to the file in S3 to my database. It isn't necessary for understanding how to upload and delete from S3.

## Getting Started

We're going to start with the backend since it's the most important part of this demo, so let's start by setting up the sever.

### Server

In the root folder create a new folder named server, and in that folder create a new file named index.js
```
/app-name
   /node_modules
   /public
   /server
      index.js
   /src
   package.json
   README.md
```

...README in progess

<!-- ## Helpful sources

### Multer and MulterS3
* [Multer](https://github.com/expressjs/multer)
* [MulterS3](https://github.com/badunk/multer-s3)
* [Image uploading by Traversy](https://www.youtube.com/watch?v=9Qzmri1WaaE)
* [Scotch.io - AWS S3 with Express and MulterS3](https://scotch.io/@cizu/building-a-amazon-s3-api-with-express-and-multer-s3)
### AWS
* [AWS S3 Docs](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)
* [python-aws-s3 by keith](https://github.com/keithweaver/python-aws-s3)
* [AWS IAM](https://www.youtube.com/watch?v=DXNS-EP9sXM&t=5s)
* [AWS S3](https://www.youtube.com/watch?v=mt32JEAxrA4)

Aspects of each of these resources helped me understand how the parts works. -->