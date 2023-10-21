import React, { useState } from 'react';
import axios from 'axios';
import './FileUploadForm.css'; // Create a separate CSS file

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [signature, setSignature] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSignatureChange = (event) => {
    setSignature(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('signature', signature);

      setUploading(true);

      axios
        .post('http://localhost:4000/uploadDNA', formData)
        .then((response) => {
          console.log(response.data);
          setSelectedFile(null);
          setSignature('');
          setUploading(false);
        })
        .catch((error) => {
          console.error(error);
          setUploading(false);
        });
    }
  };

  return (
    <div className="container">
      <h1>Upload a DNA File</h1>
      <textarea
        placeholder="Your Signature of the form 0x...."
        value={signature}
        onChange={handleSignatureChange}
        className="signature-input"
      />  
      <div className="file-upload">
        {selectedFile && (
          <p className="file-name">File Name: {selectedFile.name}</p>
        )}
        <label htmlFor="fileInput" className="file-label">
          {uploading ? 'Uploading...' : 'Choose File'}
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="file-input"
        />  
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="upload-button"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default FileUploadForm;
