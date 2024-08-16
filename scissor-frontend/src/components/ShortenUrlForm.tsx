import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import '../styles/ShortenUrlForm.css';

interface ShortenUrlFormProps {
    onShortUrlGenerated: (url: string) => void;
}

const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ onShortUrlGenerated }) => {
    const [url, setUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const { token } = useAuth();

    const handleShorten = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ originalUrl: url, customUrl }),
            });

            const data = await response.json();
            setShortUrl(data.shortUrl);
            onShortUrlGenerated(data.shortUrl);

            // Generate QR code
            const qrCodeUrl = `${process.env.REACT_APP_QR_CODE_API}?data=${encodeURIComponent(data.shortUrl)}&size=150x150`;
            setQrCode(qrCodeUrl);

        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    return (
        <div className="shorten-url-form">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to shorten"
            />
            <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Enter custom URL (optional)"
            />
            <button onClick={handleShorten}>Shorten URL</button>

            {shortUrl && (
                <div className="result">
                    <h2>Shortened URL:</h2>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>

                    {qrCode && (
                        <div className="qr-code">
                            <h3>Scan QR Code:</h3>
                            <img src={qrCode} alt="QR Code" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShortenUrlForm;
