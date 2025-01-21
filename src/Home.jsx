import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import Developer from './components/Developer';

const Home=()=> {
  const [url, setUrl] = useState();
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copySuccess,setCopySuccess]=useState('');
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl("");
      console.log(url);
    try {
      setCopySuccess('');
      // Send the URL as a request parameter
const response = await fetch(`${backendUrl}`+'/shorten', {
        method: 'POST', // Specify the method
        headers:{
          'Content-Type':'text/plain',
        },
        body:url,
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Read the response as text
      const data = await response.text();
      setShortUrl(data); // Set the response text as the shortened URL
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      console.error(err);
    }
  };
  const handleCopy=async()=>{
    try{
      await navigator.clipboard.writeText(shortUrl);
      setCopySuccess('Copied to Clipboard');
    }catch(err){
      setCopySuccess('Failed to copy!');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-between '>
    <div className="flex flex-col items-center justify-center mt-52">
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="url"
          placeholder="Enter your URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded-md mb-4 w-80"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Shorten URL
        </button>
      </form>
      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Shortened URL:</h2>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
          <button onClick={handleCopy} className='bg-[#b146eb] text-white p-1 rounded-md hover:bg-[#9c1ee0] transition duration-200 mx-3 px-2'><ContentCopyIcon></ContentCopyIcon></button>
          {copySuccess&&<Alert severity="success">{copySuccess}</Alert>
          }
        </div>
      )}
      {error && <p className="text-red-500 mt-4"><Alert severity="error">{error}</Alert></p>}
     
      </div>
{/*     <Developer></Developer> */}
    </div>
  );
}
export default Home;

