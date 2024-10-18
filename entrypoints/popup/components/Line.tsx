import React, { useEffect, useState } from "react";
import "../style.css";

// props correspond to a single backend data element
interface LineItemProps {
  title: string;
  endDate: string;
  group: string;
  repoLink: string;
  is_done: boolean;
}

const LineItem: React.FC<LineItemProps> = ({ title, endDate, repoLink, is_done }) => {
  ////////// STATE VARIABLES //////////
  const [timeLeft, setTimeLeft] = useState("");
  const [timeClass, setTimeClass] = useState("");
  /////////////////////////////////////

  // Function to calculate the time left and update the CSS class based on the remaining time
  const calculateTimeLeft = () => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end.getTime() - now.getTime();

    if (difference <= 0) {
      setTimeClass("time-up");
      return "Time's up";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    // Update the CSS class based on the remaining time
    if (is_done) {
      setTimeClass("grey");
    } else if (difference <= 2 * 24 * 60 * 60 * 1000) {
      setTimeClass("red"); // Less than or equal to 2 days
    } else if (difference <= 7 * 24 * 60 * 60 * 1000) {
      setTimeClass("orange"); // Less than or equal to 7 days
    } else {
      setTimeClass("green"); // More than 7 days
    }

    // returns only values above 0 (no need to display "0d" for example)
    if (days == 0) {
      if (minutes == 0) return `${hours}h ${minutes}m`;

      return `${hours}h ${minutes}m`;
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
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`line-item ${timeClass}`}>
      <a href={repoLink} target="_blank" rel="noopener noreferrer">
        <h2>{title}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
        </svg>
      </a>

      <div className="content">
        <div className="info">
          <p>Date de fin : {formattedEndDate}</p>
          <p>Compte à rebours : {timeLeft}</p>
        </div>
        <div className="action">
          <button
            onClick={() => {
              if (!is_done) {
                // sends messages to background.ts to change the value of is_done and refetch the API to refresh the content
                browser.runtime.sendMessage({ type: "toggle_done", title: title, value: true });
                browser.runtime.sendMessage({ type: "fetch_api" });
              } else {
                // sends messages to background.ts to change the value of is_done and refetch the API to refresh the content
                browser.runtime.sendMessage({ type: "toggle_done", title: title, value: false });
                browser.runtime.sendMessage({ type: "fetch_api" });
              }
            }}
          >
            {is_done ? "Done" : "Not Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineItem;
