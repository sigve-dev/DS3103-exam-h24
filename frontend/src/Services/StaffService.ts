import axios from "axios";
import IStaff from "../Interfaces/Staff/IStaff";

// Endepunkt for kommunikasjon med staffController endepunktet i Web API
const StaffControllerEndpoint = "http://localhost:5255/api/TrumpStaff";

const StaffService = (()=> {
    const fetchAllStaff = async (): Promise<IStaff[]> => {
        try{
            const response = await axios.get(`${StaffControllerEndpoint}/all`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching all staff`);
            throw error 
        }
    };

    const createStaff = async (newStaff: IStaff): Promise<IStaff> => {
        try {
            const response = await axios.post(StaffControllerEndpoint, newStaff);
            return response.data;
        } catch (error) {
            console.error(`Error creating staff`);
            throw error 
        }
    };

    const deleteStaff = async (id: number): Promise<void> => {
        try {
            await axios.delete(`${StaffControllerEndpoint}/${id}`);
        } catch (error) {
            console.error(`Error creating staff`);
            throw error 
        }
    };

    return {
        fetchAllStaff,
        createStaff,
        deleteStaff
    };

})();

export default StaffService;
