import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FileService from './Service/FileService';

const UploadImageComponent = (props) => {

    const navigate = useNavigate();

    const [upload, setUpload] = useState({
        files: null,
        fileUploaded: null,
        uploaderName: ''
    });

    const onFileChange = (event) => {
        setUpload({ ...upload, files: event.target.files });
    };

    const onUploaderNameChange = (event) => {
        setUpload({ ...upload, uploaderName: event.target.value });
    };

    const onUpload = (event) => {
        event.preventDefault();

        const formData = new FormData();

        for (const key of Object.keys(upload.files)) {
            formData.append('files', upload.files[key]);
        }
        formData.append('name', upload.uploaderName);

        FileService.uploadImage(formData).then((response) => {
            console.log(response.data);
            setUpload({ ...upload, fileUploaded: true });
        }).catch(error => {
            console.log(error);
        });

        navigate('/my-images')
    }

    return (
        <div className='row'>
            <div className='card col-md-12'>
                <h3 className='text-center'>Upload Image</h3>
                <div className='card-body'>
                    <form onSubmit={onUpload}>
                        <div>
                            <label>Select a file:</label>
                            <input className='mx-2' type='file' name='file' onChange={onFileChange} multiple></input>
                        </div>

                        <div className="mt-3">
                            <label>Uploader Name:</label>
                            <input className='mx-2' type='text' name='uploaderName' value={upload.uploaderName} onChange={onUploaderNameChange}></input>
                        </div>
                        <button className="btn btn-success" type='submit'>Submit </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default UploadImageComponent;