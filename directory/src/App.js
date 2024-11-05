import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/get-directory')
      .then(response => {
        setFiles(response.data.files);
      })
      .catch(error => {
        console.error('Error fetching directory content:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Directory Files</h1>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
