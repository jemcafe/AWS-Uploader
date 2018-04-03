import React, { Component } from 'react';
import './Uploader.css';
import Aux from '../hoc/Aux';
import Dropzone from 'react-dropzone';
import upload from 'superagent';

class Uploader extends Component {
    constructor() {
        super();
        this.state ={
            files: [],
            image: ''
        }
    }

    onDrop = (files) => {
        console.log(files);
        this.setState({ files });
        // the upload http request can go here for an immediate upload after the drop. I'm just using submit button for now.
    }

    upload = (e) => {
        e.preventDefault();
        const { files } = this.state;

        upload.post('/api/upload')
        .attach('image', files[0])
        .end((err, res) => {
            if (err) { 
                console.log(err);
                console.log('Error', res.body);
            } else {
                console.log('File upload', res);
                // this.setState({ image: res.body.file });
            }
        });
    }

    render () {
        return(
            <Aux>
                <form onSubmit={this.upload}>
                    <div className="uploader">
                        <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
                            <div className="plus-icon"><i className="fas fa-plus"></i></div>&nbsp;Upload image
                        </Dropzone>
                        <h4>Drop file</h4>
                        <ul>
                            { this.state.files.map((e, i) => <li key={i}>{e.name} - {e.size} bytes</li>) }
                        </ul>
                    </div>
                    <div className="submit-btn">
                        <input className="btn" type="submit"/>
                    </div>
                </form>
                { this.state.image && <img src={this.state.image} alt="pic" style={{maxWidth: '80%'}}  /> }
            </Aux>
        )
    }
}

export default Uploader;