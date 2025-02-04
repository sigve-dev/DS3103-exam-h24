import React from "react";
import StoreItem from "./StoreItem";
import './StoreList.css';

interface StoreListProps {
    merchList: any[];
    onDelete: (id: number) => void;
}

const StoreList: React.FC<StoreListProps> = ({ merchList, onDelete }) => {
    if (!Array.isArray(merchList)) {
        console.error("Merchandise list is not an array:", merchList);
        return <p>No merchandise to display.</p>;
    }

    return (
        <section className="store-list">
            {merchList.map((merchItem, index) => (
                <article className="store-item-container" key={`merch-${index}`}>
                    <StoreItem {...merchItem} onDelete={onDelete} />
                </article>
            ))}
        </section>
    );
};

export default StoreList;
