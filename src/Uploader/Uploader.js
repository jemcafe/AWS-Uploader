import React, { Component } from 'react';
import './Uploader.css';
import Dropzone from 'react-dropzone';

class Uploader extends Component {
    onDrop = (files) => {
        console.log(files);
    }

    render () {
        return(
            <div className="uploader">
                <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
                    <div className="plus-icon"><i className="fas fa-plus"></i></div>&nbsp;Upload image
                </Dropzone>
            </div>
        )
    }
}

export default Uploader;