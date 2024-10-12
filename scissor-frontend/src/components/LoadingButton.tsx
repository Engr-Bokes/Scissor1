import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon
import '../styles/Spinner.css'; // Import spinner styles

interface LoadingButtonProps {
    onClick: () => void | Promise<void>;
    isLoading: boolean;
    text: string;
    disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ onClick, isLoading, text, disabled = false }) => {
    return (
        <button onClick={onClick} disabled={isLoading || disabled}>
            {isLoading ? <FaSpinner className="spinner-icon" /> : text}
        </button>
    );
};

export default LoadingButton;
