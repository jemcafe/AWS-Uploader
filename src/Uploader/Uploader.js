import React, { Component } from 'react';
import './Uploader.css';
import Aux from '../hoc/Aux';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import axios from 'axios';

class Uploader extends Component {
    constructor() {
        super();
        this.state ={
            files: [],
            image: null
        }
    }

    onDrop = (files) => {
        console.log(files);
        this.setState({ files });
        // The upload method can go here for an immediate upload after the drop. I'm just using submit button for now.
    }

    upload = (e) => {
        e.preventDefault();
        const { files } = this.state;

        superagent.post('/api/upload')
        .attach('image', files[0])
        .end((err, res) => {
            if (err) { 
                console.log(err);
                console.log('Error', res.body);
            } else {
                console.log('File uploaded: ', res.body);
                this.setState({ image: res.body });
            }
        });
    }

    delete = () => {
        const url = this.state.image.image_url.split('/');
        const fileName = url[url.length-1];
        axios.delete(`/api/delete/${fileName}`)
        .then( res => {
            console.log(res.data);
            this.setState({ image: null });
        }).catch(err => console.log(err));
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
                { this.state.image && <img src={this.state.image.image_url} alt="pic"/> }
                <button className="btn" onClick={this.delete}>Delete</button>
            </Aux>
        )
    }
}

export default Uploader;