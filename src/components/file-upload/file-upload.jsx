import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import './file-upload.scss';

class FileUpload extends React.Component{

    render(){
        return(
            <section className="file-upload">
                <Dropzone className={'zone ' + (this.props.files.length > 0 ? 'active': '')} onDrop={this.props.onDrop} accept=".pdf" multiple={false}>
                    <span>{this.props.files.length > 0 ? this.props.files[0].name : this.props.copy.DROPZONE_TEXT.NO_FILE_TEXT}</span>
                </Dropzone>
                <div className={`form-group ${this.props.fileInfoText ? 'has-error' : ''}`}>
                    <small className="help-block">{this.props.fileInfoText}</small>
                </div>
            </section>
        )
    }
}

FileUpload.propTypes = {
    onDrop: PropTypes.func.isRequired,
    copy: PropTypes.object.isRequired
}

export default FileUpload;