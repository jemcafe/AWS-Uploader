# AWS S3 - Upload and Delete

This is a simple react app where files can be uploaded to and deleted from AWS S3.

On the AWS side, I'm using IAM which supplies basic security. It is setup so users only have permission to read, add (put), or delete objects in a specific bucket. Images are public, but the bucket isn't.

### Prerequisites

You will need to have an sufficient version of [node.js](https://nodejs.org/en/) and [npm](https://nodejs.org/en/) (or [yarn](https://yarnpkg.com/lang/en/)).

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
* react-dropzone
* axios
* massive (for postgreSQL) (optional)

```
$ npm install aws-dk multer multerS3 dotenv superagent axios massive react-dropzone
```

We also need express, but that's already installed with create-react-app. Also massive is not necessary. I just used it to store the link to the file in S3 to my database. It isn't necessary for understanding how to upload and delete from S3.

## Getting Started

We're going to start with the backend, since it's the most important part of this app. You can use [postman](https://www.getpostman.com/) to test HTTP requests without the need of a front end for now, but we will have a front end as well.

Okay, let's create the sever.

In the root folder create a new folder named server, and in that folder create a ne file named index.js
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

### Server

...README in progess