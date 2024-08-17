import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import LinkHistory from './pages/LinkHistory';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1>Scissor - URL Shortener</h1>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/home"
                                element={
                                    <PrivateRoute>
                                        <Home />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/:code/analytics"
                                element={
                                    <PrivateRoute>
                                        <Analytics />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/link-history"
                                element={
                                    <PrivateRoute>
                                        <LinkHistory />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <footer className="App-footer">
                        <p>&copy; 2024 Scissor. All rights reserved.</p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
