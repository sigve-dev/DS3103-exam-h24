import { useContext } from "react";
import StaffItem from "./StaffItem";
import { StaffContext } from "../../Contexts/StaffContext";
import IStaffContext from "../../Interfaces/Staff/IStaffContext";
import './StaffList.css'

const StaffList = () => {
    const { staff, removeStaff } = useContext(StaffContext) as IStaffContext;

    const handleDelete = async (id: number) => {
        try {
            await removeStaff(id);
            alert("You've removed the staff member successfully.");
        } catch (error) {
            console.error("Error removing staff:", error);
            alert("Failure removing staff member.");
        }
    };

    const renderStaffList = () => {
        return staff.map((member) => (
            <StaffItem
                key={member.id}
                name={member.name}
                department={member.department}
                position={member.position}
                onDelete={() => handleDelete(member.id)}
            />
        ));
    };

    return (
        <section className="staff-list">
            {staff.length > 0 ? renderStaffList() : <p>No staff members available.</p>}
        </section>
    );
};

export default StaffList;
