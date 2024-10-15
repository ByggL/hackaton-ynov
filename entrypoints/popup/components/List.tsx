import React from 'react';
import LineItem from './Line';

interface ListItem {
    title: string;
    end_date: string;
    group: string;
    repo_link: string;
    isDone: boolean;
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
                    endDate={item.end_date} 
                    group={item.group} 
                    repoLink={item.repo_link} 
                    isDone={item.isDone} 
                />
            ))}
        </div>
    );
};

export default List;
