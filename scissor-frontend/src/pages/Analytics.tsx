import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../styles/Analytics.css';

const Analytics: React.FC = () => {
    const { code } = useParams<{ code: string }>();
    const [analyticsData, setAnalyticsData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${code}/analytics`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch analytics data');
                }
                const data = await response.json();
                setAnalyticsData(data);
            } catch (err) {
                setError('Failed to fetch analytics data');
                console.error(err);
            }
        };

        fetchAnalytics();
    }, [code, token]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!analyticsData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="analytics">
            <h2>Analytics for {analyticsData.shortUrl}</h2>
            <p><strong>Original URL:</strong> {analyticsData.originalUrl}</p>
            <p><strong>Clicks:</strong> {analyticsData.clicks}</p>
            <p><strong>Last Accessed:</strong> {new Date(analyticsData.lastAccessed).toLocaleString()}</p>
        </div>
    );
};

export default Analytics;
