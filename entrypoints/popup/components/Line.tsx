import React, { useEffect, useState } from 'react';

interface LineItemProps {
    title: string;
    endDate: string;
    group: string;
    repoLink: string;
    is_done: boolean;
}

const LineItem: React.FC<LineItemProps> = ({ title, endDate, repoLink, is_done }) => {
    const [timeLeft, setTimeLeft] = useState('');

    // Function to calculate the time left until the end date
    const calculateTimeLeft = () => {
        const now = new Date();
        const end = new Date(endDate);
        const difference = end.getTime() - now.getTime();

        if (difference <= 0) {
            return "Time's up";
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);

        return `${days}d ${hours}h ${minutes}m`;
    };

    // Update the countdown every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

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
        <div className="line-item">
            <a href={repoLink} target="_blank" rel="noopener noreferrer">
                <h3>{title}</h3>
            </a>
            <p>End date: {formattedEndDate} | {timeLeft}</p>
            {/* disabled={is_done} */}
            <button onClick={() => {
                if(!is_done) {
                    browser.runtime.sendMessage({type: "toggle_done", title: title, value: true});
                    browser.runtime.sendMessage({type: "fetch_api"})
                }
                else {
                    browser.runtime.sendMessage({type: "toggle_done", title: title, value: false});
                    browser.runtime.sendMessage({type: "fetch_api"})
                }
            }}>{is_done ? "Done" : "Not Done"}</button>
        </div>
    );
};

export default LineItem;
