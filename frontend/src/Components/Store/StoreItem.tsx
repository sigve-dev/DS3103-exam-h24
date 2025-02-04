import { FC } from "react";
import IStore from "../../Interfaces/Store/IStore";
import StoreService from "../../Services/StoreService";
import "./StoreItem.css";

interface StoreItemProps extends IStore {
    onDelete: (id: number) => void;
}

const StoreItem: FC<StoreItemProps> = ({
    id,
    name,
    image,
    type,
    quantity,
    price,
    details,
    onDelete,
}) => {
    const imageUrl = StoreService.getImageEndpoint() + image;

    return (
        <section className="store-item">
            <img src={imageUrl} alt={name} className="store-item-image" />
            <article className="store-item-content">
                <h2 className="store-item-title">{name}</h2>
                <p className="store-item-text">Type: {type}</p>
                <h3 className="store-item-text">Price: ${price}</h3>
                <h4 className="store-item-text">Quantity: {quantity}</h4>
                <h5 className="store-item-text">{details}</h5>
                <button
                    className="store-item-button"
                    onClick={() => onDelete(id)}
                >
                    Delete
                </button>
            </article>
        </section>
    );
};

export default StoreItem;
