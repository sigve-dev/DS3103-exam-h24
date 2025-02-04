import axios from "axios";

// Endepunkt for kommunikasjon med TrumpMerchController endepunktet i Web API
const merchControllerEndpoint = "http://localhost:5255/api/TrumpMerch";

const StoreService = (() => {
    // Henter alle varer fra databasen
    const fetchAll = async () => {
        try {
            const result = await axios.get(merchControllerEndpoint);
            return { success: true, data: result.data }; 
        } catch (error) {
            console.error("Error retrieving merch", error);
            return { success: false, data: "Could not retrieve merch" };
        }
    };

    // Henter en vare fra databasen basert på ID
    const getById = async (id: number) => {
        try {
            const result = await axios.get(`${merchControllerEndpoint}/${id}`);
            return result.data; 
        } catch (error) {
            console.error(`Error getting merch with following id: ${id}:`, error);
            throw error; 
        }
    };

    // Legger til en ny vare i databasen
    const postMerch = async (merch: { name: string; image: string }) => {
        try {
            const response = await axios.post(merchControllerEndpoint, merch, {
                headers: { "Content-Type": "application/json" },
            });
            // Returnerer den nyopprettede varen
            return response.data; 
        } catch (error) {
            console.error("Error POSTing new merch to the API", error);
            throw error;
        }
    };

    // Oppdaterer eksisterende vare i databasen
    const updateMerch = async (updatedMerch: { id: number; name: string; image?: string }) => {
        try {
            const response = await axios.put(
                `${merchControllerEndpoint}/${updatedMerch.id}`,
                updatedMerch,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Updated following merch: ", response.data);
            
            // Returnerer den oppdaterte varen
            return response.data; 
        } catch (error) {
            console.error("Error updating the merch");
            throw error;
        }
    };

    // Sletter en vare fra databasen basert på ID
    const deleteMerch = async (id: number) => {
        try {
            await axios.delete(`${merchControllerEndpoint}/${id}`);
            console.log(`Merch with id: ${id} was removed.`);
        } catch (error) {
            console.error(`Error deleting merch with id: ${id}`);
            throw error;
        }
    };

    // Søker etter varer i databasen basert på navn
    const searchByName = async (name: string) => {
        try {
            const response = await axios.get(`${merchControllerEndpoint}/by-name/${name}`);
            // Returnerer liste med varer som matcher navnet
            return response.data;
        } catch (error) {
            console.error("Error retrieving merch by name");
            throw error;
        }
    };

    // Returnerer basisstien for bilder
    const getImageEndpoint = () => "http://localhost:5255/images/";

    // Returnerer alle CRUD-metoder for bruk i frontend-komponenter
    return {
        fetchAll,       
        getById,        
        postMerch,      
        updateMerch,   
        deleteMerch,   
        getImageEndpoint, 
        searchByName,   
    };
})();

export default StoreService;
