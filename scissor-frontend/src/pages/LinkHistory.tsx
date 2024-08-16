import React, { useEffect, useState } from 'react';
import '../styles/LinkHistory.css';

const LinkHistory: React.FC = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/urls`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
                    },
                });

                const data = await response.json();
                setUrls(data);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };

        fetchUrls();
    }, []);

    return (
        <div className="link-history">
            <h2>Your Link History</h2>
            {urls.length > 0 ? (
                <ul>
                    {urls.map((url: any) => (
                        <li key={url._id}>
                            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
                            <p>Original URL: {url.originalUrl}</p>
                            <p>Clicks: {url.clicks}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have not shortened any URLs yet.</p>
            )}
        </div>
    );
};

export default LinkHistory;
