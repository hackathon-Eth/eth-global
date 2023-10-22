import React, {useMemo, useState} from 'react';import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './FileUploadForm.css';
import Check from '../components/check';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#f5f5f5da',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  marginBottom: "2rem",
  height:"100%",
  justifyContent:"center",
  backgroundColor:"transparent",
  color:"#f5f5f5da"
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const FileUploadForm = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [signature, setSignature] = useState('');
  const [uploading, setUploading] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      console.log(selectedFile);
    }
  });
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
  }), [
    isFocused,
    isDragAccept,
  ]);
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
    <div style={{display:"flex",height:"100%"}}>
      <div style={{width:"50%", padding:"2rem",display:"flex",flexDirection:"column"}}>
      <h1>Upload a DNA File</h1>
      <textarea
        placeholder="Your Signature of the form 0x...."
        value={signature}
        onChange={handleSignatureChange}
        className="signature-input"
      />  
       <button
        onClick={handleUpload}
        disabled={uploading}
        className="upload-button"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {selectedFile?(
        <>       
         <p className='file-name' style={{marginTop:"3rem"}}>Filename: {selectedFile.name}</p>
        <p className='file-name'>Filetype: {selectedFile.type}</p>
        <p className='file-name'>File Size: {Math.round(selectedFile.size/1024)} KB</p>
        </>


      ):(
        <></>
      )}
      </div>
      {selectedFile?(
        <Check/>
      ):(
        <div {...getRootProps({style})} className="dropzone">
        <input {...getInputProps()} />
          <p>Select File or Drop it here</p>
      </div>
      )}
     
     
    </div>
  );
}

export default FileUploadForm;
