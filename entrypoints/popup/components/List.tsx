import React from 'react';
import LineItem from './Line';

interface ListItem {
    title: string;
    endDate: string;
    group: string;
    repoLink: string;
    is_done: boolean;
}

interface ListProps {
    data: ListItem[];
}

const List: React.FC<ListProps> = ({ data }) => {
    return (
        <div className="list">
            {data.map((item, index) => (
                <LineItem 
                    key={index} 
                    title={item.title} 
                    endDate={item.endDate} 
                    group={item.group} 
                    repoLink={item.repoLink} 
                    is_done={item.is_done} 
                />
            ))}
        </div>
    );
};

export default List;
