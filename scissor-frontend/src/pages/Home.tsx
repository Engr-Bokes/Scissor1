import React, { useState } from 'react';
import ShortenUrlForm from '../components/ShortenUrlForm';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';

const Home: React.FC = () => {
    const [shortUrl, setShortUrl] = useState<string | null>(null);

    const handleShortUrlGenerated = (url: string) => {
        setShortUrl(url);
    };

    return (
        <div className="home">
            <div className="header">
                <h2>Welcome to Scissor</h2>
                <Logout />
            </div>
            <p>Simplify your links with our powerful URL shortener.</p>
            <ShortenUrlForm onShortUrlGenerated={handleShortUrlGenerated} />
            {shortUrl && (
                <div className="result">
                    <p>
                        Shortened URL: 
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                            {shortUrl}
                        </a>
                    </p>
                    <p>
                        <Link to={`/${shortUrl.split('/').pop()}/analytics`}>
                            View Analytics
                        </Link>
                    </p>
                </div>
            )}
            <p>
                <Link to="/link-history">View your Link History</Link>
            </p>
        </div>
    );
};

export default Home;
