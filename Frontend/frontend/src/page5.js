import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small';

const Page5 = () => {
    const [documents, setDocuments] = useState([
        {
            id: 1,
            documentType: 'PHD',
            documentFile: null,
            editing: false,
        }
    ]);

    const handleDocumentTypeChange = (e, id) => {
        const updatedDocuments = documents.map(doc => {
            if (doc.id === id) {
                return { ...doc, documentType: e.target.value };
            }
            return doc;
        });
        setDocuments(updatedDocuments);
    };

    const MAX_FILE_SIZE_MB = 1;

    const handleDocumentChange = (e, id) => {
        const file = e.target.files[0];
        if (file.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
            alert(`File size exceeds ${MAX_FILE_SIZE_MB}MB. Please upload a smaller file.`);
            return;
        }
        const updatedDocuments = documents.map(doc => {
            if (doc.id === id) {
                return { ...doc, documentFile: file };
            }
            return doc;
        });
        setDocuments(updatedDocuments);
    };

    const handleDeleteDoc = (id) => {
        const updatedDocuments = documents.map(doc => {
            if (doc.id === id) {
                return { ...doc, documentFile: null };
            }
            return doc;
        });
        setDocuments(updatedDocuments);
    };

    const handleDelete = (id) => {
        if (documents.length > 1) {
            const updatedDocuments = documents.filter(doc => doc.id !== id);
            setDocuments(updatedDocuments);
        }
    };

    const handleEdit = (id) => {
        // Reset the file input element for editing
        const fileInput = document.getElementById(`document-input-${id}`);
        if (fileInput) {
            fileInput.value = null;
            fileInput.click(); // Trigger click event to open file browser
        }
    };

    const handleAddMore = () => {
        const newId = documents.length + 1;
        setDocuments([
            ...documents,
            { id: newId, documentType: '', documentFile: null, editing: true }
        ]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('All Documents:', documents);
        localStorage.setItem('current', 5);
        // Handle form submission here, you can upload files to a server or process them
    };

    return (
        <div className="page3">
            <NavbarSmall current={5}/>
            <h2>Upload Documents</h2>
            <div className='instruct'>
                <h3>Instructions</h3>
                <p>Please upload documents Educational Qualification Certificate, Caste Certificate, Research related documents etc</p>
                <p>All Documnets must be self attested</p>
                <p>Also mention uploaded certificate document in the given column</p>
                <p>Only jpg|gif|png|jpeg|pdf files allowed</p>
                <p>File size should not exceed 1024KB</p>
            </div>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '20rem'}}>Document Type</th>
                            <th>Document</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(doc => (
                            <tr key={doc.id}>
                                <td style={{width: '20rem'}}>
                                    {doc.editing ? (
                                        <input
                                            type="text"
                                            value={doc.documentType}
                                            onChange={(e) => handleDocumentTypeChange(e, doc.id)}
                                            required
                                        />
                                    ) : (
                                        <span>{doc.documentType}</span>
                                    )}
                                </td>
                                <td>
                                    {doc.documentFile ? (
                                        <div>
                                            <a href={URL.createObjectURL(doc.documentFile)} target="_blank" rel="noopener noreferrer" >
                                                <button id='view-btn' type='button'></button>
                                            </a>
                                            <input
                                                id={`document-input-${doc.id}`}
                                                type="file"
                                                accept=".pdf,.jpg,.png,.gif,.jpeg"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleDocumentChange(e, doc.id)}
                                                required
                                            />
                                        </div>

                                    ) : (
                                        <>
                                            <label htmlFor={`document-input-${doc.id}`} id="upload-label">Upload</label>
                                            <input
                                                id={`document-input-${doc.id}`}
                                                type="file"
                                                accept=".pdf,.jpg,.png,.gif,.jpeg"
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleDocumentChange(e, doc.id)}
                                                required
                                            />
                                        </>
                                    )}
                                </td>
                                <td style={{width: '20rem'}}>
                                    <button type="button" id="edit" onClick={() => handleEdit(doc.id)}></button>
                                    <button type="button" id="delete" onClick={() => handleDeleteDoc(doc.id)}></button>
                                    <button type="button" id="remove" onClick={() => handleDelete(doc.id)}></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="add" type="button" onClick={handleAddMore}>+</button><p>Add More</p>
                <button className='next' type="submit"><a href='/details/page6' style={{color:'white', textDecoration:'none'}}>Click to Next</a></button>
            </form>
        </div>
    );
};

export default Page5;
