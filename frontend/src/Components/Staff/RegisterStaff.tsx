import React, { useState } from "react";
import { useStaffContext } from "../../Contexts/StaffContext";
import IStaff from "../../Interfaces/Staff/IStaff";
import './RegisterStaff.css'

const RegisterStaff = () => {
    const { addStaff } = useStaffContext();

    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [position, setPosition] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newStaff: IStaff = { name, department, position, id: 0 };

        try {
            await addStaff(newStaff);
            setName("");
            setDepartment("");
            setPosition("");
            alert("Staff member added successfully!");
        } catch (error) {
            alert("Failed to add staff member. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-staff card p-3 mb-4 shadow">
            <h3 className="text-center text-dark mb-4">Add New Staff Member</h3>
            <article className="form-group mb-3">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </article>
            <article className="form-group mb-3">
                <label>Department</label>
                <input
                    type="text"
                    className="form-control"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
            </article>
            <article className="form-group mb-3">
                <label>Position</label>
                <input
                    type="text"
                    className="form-control"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                />
            </article>
            <button type="submit" className="btn btn-primary">
                Add Staff
            </button>
        </form>
    );
};

export default RegisterStaff;
