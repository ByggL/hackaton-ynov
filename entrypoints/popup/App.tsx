import React, { useState, useEffect } from 'react';
import List from './components/List';
import jsonData from '../data.json';

const App = () => {
    const [data, setData] = useState([]);

    // Ici on pourrait fetch les données depuis une API ou un fichier JSON
    useEffect(() => {
        setData(jsonData);
    }, []);

    return (
        <div className="App">
            <List data={data} />
        </div>
    );
};

export default App;
