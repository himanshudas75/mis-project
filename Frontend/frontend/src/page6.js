import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small';

const Page6 = () => {
    const [uploads, setUploads] = useState([
        {
            id: 1,
            photo: null,
            signature: null,
        }
    ]);

    const MAX_FILE_SIZE_KB = 100; // Maximum file size in KB

    const handlePhotoChange = (e, id) => {
        const file = e.target.files[0];
        if (file.size / 1024 > MAX_FILE_SIZE_KB) {
            alert(`Photo file size exceeds ${MAX_FILE_SIZE_KB}KB. Please upload a smaller file.`);
            return;
        }
        const updatedUploads = uploads.map(upload => {
            if (upload.id === id) {
                return { ...upload, photo: file };
            }
            return upload;
        });
        setUploads(updatedUploads);
    };

    const handleSignatureChange = (e, id) => {
        const file = e.target.files[0];
        if (file.size / 1024 > MAX_FILE_SIZE_KB) {
            alert(`Signature file size exceeds ${MAX_FILE_SIZE_KB}KB. Please upload a smaller file.`);
            return;
        }
        const updatedUploads = uploads.map(upload => {
            if (upload.id === id) {
                return { ...upload, signature: file };
            }
            return upload;
        });
        setUploads(updatedUploads);
    };

    const handleDelete = (id, type) => {
        const updatedUploads = uploads.map(upload => {
            if (upload.id === id && type==='photo') {
                return { ...upload, id: upload.id, photo: null };
            }
            else if (upload.id === id && type==='sign') {
                return { ...upload, id: upload.id, signature: null };
            }
            return upload;
        });
        setUploads(updatedUploads);
    };

    const handleEditPhoto = (id) => {
        const fileInput = document.getElementById(`photo-input-${id}`);
        fileInput.click();
    };

    const handleEditSignature = (id) => {
        const fileInput = document.getElementById(`signature-input-${id}`);
        fileInput.click();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('All Uploads:', uploads);
        localStorage.setItem('current', 6);
        // Handle form submission here, you can upload files to a server or process them
    };

    return (
        <div className="page3">
            <NavbarSmall current={6}/>
            <h2>Upload Photo and Signature</h2>
            <div className='instruct'>
                <h3>Instructions</h3>
                <p>Only jpg|gif|png|jpeg|pdf files allowed</p>
                <p>File size should not exceed 100KB</p>
            </div>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th style={{width: '20rem'}}>Document</th>
                            <th style={{width: '20rem'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uploads.map(upload => (
                            <tr key={upload.id}>
                                <td>Photo</td>
                                <td className='align' style={{width: '20rem'}}>
                                    {upload.photo && (
                                        <img src={URL.createObjectURL(upload.photo)} alt="UploadedPhoto" style={{ width: '200px', height: 'auto',  margin: '0.5rem auto' }} />
                                    )}
                                    <label htmlFor={`photo-input-${upload.id}`} className="upload-label inputfile" id='upload-label'>Upload</label>
                                    <input
                                        id={`photo-input-${upload.id}`}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handlePhotoChange(e, upload.id)}
                                        required
                                    />
                                </td>
                                <td style={{width: '20rem'}}>
                                    <button type="button" onClick={() => handleEditPhoto(upload.id)} id='edit'></button>
                                    <button type="button" onClick={() => handleDelete(upload.id,'photo')} id='delete'></button>
                                </td>
                            </tr>
                        ))}
                        {uploads.map(upload => (
                            <tr key={upload.id}>
                                <td>Signature</td>
                                <td className='align' style={{width: '20rem'}}>
                                    {upload.signature && (
                                        <img src={URL.createObjectURL(upload.signature)} alt="Uploaded Signature" style={{ width: '100px', height: 'auto', margin: '0.5rem auto' }} />
                                    )}
                                    <label htmlFor={`signature-input-${upload.id}`} id="upload-label">Upload</label>
                                    <input
                                        id={`signature-input-${upload.id}`}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleSignatureChange(e, upload.id)}
                                        required
                                    />
                                </td>
                                <td style={{width: '20rem'}}>
                                    <button type="button" onClick={() => handleEditSignature(upload.id)} id='edit'></button>
                                    <button type="button" onClick={() => handleDelete(upload.id,'sign')} id='delete'></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="next" type="submit">Save and Review</button>
            </form>
        </div>
    );
};

export default Page6;
