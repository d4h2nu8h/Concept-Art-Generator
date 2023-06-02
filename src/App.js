import React, { useState } from 'react';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // Show the loader
      const response = await axios.post('http://localhost:4750/generate-image', { prompt });
      const imageUrl = response.data.generatedImageUrl[0];
      setImageUrl(imageUrl);
      setError('');
    } catch (error) {
      setError('Error generating image');
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  return (
    <div className="container">
      <h1 className="title">Concept Art Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="search-input"
          placeholder="Enter a prompt"
        />
        <button type="submit" className="submit-button">Generate Image</button>
      </form>
      {isLoading ? ( // Display the loader while image is being loaded
        <ContentLoader
          speed={2}
          width={512}
          height={512}
          viewBox="0 0 512 512"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="8" ry="8" width="512" height="512" />
        </ContentLoader>
      ) : (
        imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt="Generated Concept Art" className="generated-image" />
          </div>
        )
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
