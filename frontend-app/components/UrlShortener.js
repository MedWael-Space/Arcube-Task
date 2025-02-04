import { useState } from "react";
import styles from './UrlShortener.module.css'; 

export default function UrlShortener() {
  const [longUrl, setLongUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const url = e.target.value;
    setLongUrl(url);

    // URL validation
    const urlPattern = /^(https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}.*|www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}.*)$/;
    if (urlPattern.test(url)) {
      setIsValidUrl(true);
      setError("");
    } else {
      setIsValidUrl(false);
      setError("Please enter a valid URL (e.g., http://www.example.com or www.example.com).");
    }

    if (url === "") {
      setShortenedUrl("");
      setError("");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl) {
      setError("Please enter a valid URL (e.e., http://www.example.com or www.example.com).");
      return;
    }

    setIsLoading(true);
    console.log(longUrl)
    try {

      const response = await fetch('https://arcube-task-backend-three.vercel.app/api/v1.0.0/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten the URL');
      }

      const data = await response.json(); 
      setShortenedUrl(data.shortUrl);

    } catch (error) {
      setError('Something went wrong, please try again.');
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <div className="container d-flex justify-content-center align-items-start min-vh-100 pt-5">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '700px' }}>
        <h2 className="text-center mb-4">URL Shortener</h2>
        
 
        <form onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
            <input
              type="text"
              className={`form-control form-control-lg ${styles.input}`}
              placeholder="Enter your URL"
              value={longUrl}
              onChange={handleChange}
              aria-label="URL"
            />
            <button
              type="submit"
              className={`${styles.btnCustom} ${isLoading ? styles.loading : ''}`}
              disabled={!isValidUrl || isLoading}
            >
              {isLoading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Shorten"
              )}
              {isLoading && <span className="ms-2">Loading ...</span>}
            </button>
          </div>
        </form>
        {error && (
          <p className="alert alert-danger text-center">
            {error}
          </p>
        )}
     
        {shortenedUrl && (
          <div className="mt-3 text-center">
            <p>Shortened URL:</p>
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
              {shortenedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
