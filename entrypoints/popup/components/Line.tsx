import React, { useEffect, useState } from 'react';
import '../style.css';

interface LineItemProps {
    title: string;
    endDate: string;
    group: string;
    repoLink: string;
    isDone: boolean;
}

const LineItem: React.FC<LineItemProps> = ({ title, endDate, repoLink, isDone }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [timeClass, setTimeClass] = useState('');

    // Function to calculate the time left and update the CSS class based on the remaining time
    const calculateTimeLeft = () => {
        const now = new Date();
        const end = new Date(endDate);
        const difference = end.getTime() - now.getTime();

        if (difference <= 0) {
            setTimeClass('time-up');
            return "Time's up";
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        // Update the CSS class based on the remaining time
        if (difference <= 2 * 24 * 60 * 60 * 1000) {
            setTimeClass('red'); // Less than or equal to 2 days
        } else if (difference <= 7 * 24 * 60 * 60 * 1000) {
            setTimeClass('orange'); // Less than or equal to 7 days
        } else {
            setTimeClass('green'); // More than 7 days
        }

        return `${days}d ${hours}h ${minutes}m`;
    };

    // Update the countdown every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [endDate]);

    // Format the end date
    const formattedEndDate = new Date(endDate).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`line-item ${timeClass}`}>
            <a href={repoLink} target="_blank" rel="noopener noreferrer">
                <h2>{title}</h2>
            </a>
            <div className="content">
                <div className="info">
                    <p>Date de fin : {formattedEndDate}</p>
                    <p>Compte à rebours : {timeLeft}</p>
                </div>
                <div className="action">
                    <button>{isDone ? "Done" : "Not Done"}</button>
                </div>
            </div>
        </div>
    );
};

export default LineItem;
