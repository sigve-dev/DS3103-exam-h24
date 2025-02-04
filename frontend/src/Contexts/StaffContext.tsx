import React, { createContext, useContext, useEffect, useState } from "react";
import IStaff from "../Interfaces/Staff/IStaff";
import StaffService from "../Services/StaffService";
import IStaffContext from "../Interfaces/Staff/IStaffContext";

interface StaffContextProps {
    staff: IStaff[];
    fetchStaff: () => Promise<void>;
    addStaff: (newStaff: IStaff) => Promise<void>;
    removeStaff: (id: number) => Promise<void>;
}

export const StaffContext = createContext<IStaffContext | undefined>(undefined);

export const useStaffContext = (): StaffContextProps => {
    const context = useContext(StaffContext);
    if (!context) throw new Error("useStaffContext must be used within StaffProvider");
    return context;
};

export const StaffProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [staff, setStaff] = useState<IStaff[]>([]);

    const fetchStaff = async () => {
        try {
            const data = await StaffService.fetchAllStaff();
            setStaff(data);
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const addStaff = async (newStaff: IStaff) => {
        try {
            await StaffService.createStaff(newStaff);
            fetchStaff();
        } catch (error) {
            console.error("Error adding staff:", error);
        }
    };

    const removeStaff = async (id: number) => {
        try {
            await StaffService.deleteStaff(id);
            fetchStaff();
        } catch (error) {
            console.error("Error removing staff:", error);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    return (
        <StaffContext.Provider value={{ staff, fetchStaff, addStaff, removeStaff }}>
            {children}
        </StaffContext.Provider>
    );
};
