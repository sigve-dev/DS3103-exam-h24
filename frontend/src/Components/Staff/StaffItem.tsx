import { FC } from "react";
import './StaffItem.css'

interface StaffItemProps {
    name: string;
    department: string;
    position: string;
    onDelete: () => void;
}

const StaffItem: FC<StaffItemProps> = ({ name, department, position, onDelete }) => {
    return (
        <div className="staff-item card p-3 mb-3 shadow-sm">
            <h3>{name}</h3>
            <p>Department: {department}</p>
            <p>Position: {position}</p>
            <button className="btn btn-danger" onClick={onDelete}>
                Remove
            </button>
        </div>
    );
};

export default StaffItem;
