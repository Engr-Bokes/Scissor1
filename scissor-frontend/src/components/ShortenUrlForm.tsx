import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import LoadingButton from '../components/LoadingButton';
import '../styles/ShortenUrlForm.css';

interface ShortenUrlFormProps {
    onShortUrlGenerated: (url: string) => void;
}

// Function to validate URL format using a regular expression
const isValidUrl = (url: string) => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol (optional at this stage)
        '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
        'localhost|' + // OR localhost
        '\\d{1,3}(\\.\\d{1,3}){3})' + // OR IPv4
        '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // port and path
        '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
        '(\\#[-a-zA-Z0-9_]*)?$', 'i' // fragment locator
    );
    return !!urlPattern.test(url);
};

// Helper function to add "https://" if missing
const addProtocolIfMissing = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
};

const ShortenUrlForm: React.FC<ShortenUrlFormProps> = ({ onShortUrlGenerated }) => {
    const [url, setUrl] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
    const { token } = useAuth();

    const handleShorten = async () => {
        // Add protocol to URL if missing (https:// by default)
        const formattedUrl = addProtocolIfMissing(url);

        // Validate the newly formatted URL
        if (!isValidUrl(formattedUrl)) {
            setError('Please enter a valid URL.');
            return;
        }

        setIsLoading(true);
        setError(null); // Clear any previous error message

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/shorten`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ originalUrl: formattedUrl, customUrl }),
            });

            const data = await response.json();
            setShortUrl(data.shortUrl);
            onShortUrlGenerated(data.shortUrl);

            // Generate QR code for the shortened URL
            const qrCodeUrl = `${process.env.REACT_APP_QR_CODE_API}?data=${encodeURIComponent(data.shortUrl)}&size=150x150`;
            setQrCode(qrCodeUrl);

        } catch (error) {
            console.error('Error shortening URL:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="shorten-url-form">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to shorten"
                className={error ? 'error' : ''}
            />
            {error && <p className="error-message">{error}</p>}

            <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Enter custom URL (optional)"
            />
            <LoadingButton
                onClick={handleShorten}
                isLoading={isLoading}
                text="Shorten URL"
                disabled={!url || isLoading}
            />

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
