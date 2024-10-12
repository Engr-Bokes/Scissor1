import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import LoadingButton from '../components/LoadingButton';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            setError('Invalid credentials, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <LoadingButton onClick={handleLogin} isLoading={isLoading} text="Login" />
            </form>
            <p>
                Don't have an account? <Link to="/">Register</Link>
            </p>
        </div>
    );
};

export default Login;
