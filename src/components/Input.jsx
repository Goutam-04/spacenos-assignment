"use client";

import { useState } from 'react';
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Container } from '@/components/Container';

export function Input() {
  const [file, setFile] = useState("");
  const [clicked, setClicked] = useState(false);
  const [url, setUrl]=useState(null)

  function handleChange(event) {
      setFile(event.target.files[0]);
  }

  const handleUpload = async () => {
    setClicked(true);
  
    if (!file) {
      alert("file not selected");
      setClicked(false);
      return;
    }
  
    try {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      await uploadTask;
  
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(downloadURL);
      setUrl(downloadURL);
    } catch (error) {
      console.log(error);
    }
  
    setClicked(false);
  };
  

  return (
    <Container>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded">
        {clicked?'Uploading...':'Upload'}
      </button>
      {clicked && (<p>Please wait for sometime as it is a free tier, it might take few seconds</p>)}
      {url && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Uploaded Image:</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {url}
          </a>
        </div>
      )}
    </Container>
  );
}
