import { FC, createContext, useEffect, useState } from "react";
import IStore from "../Interfaces/Store/IStore";
import StoreService from "../Services/StoreService";
import IStoreContext from "../Interfaces/Store/IStoreContext";
import IProps from "../Interfaces/IProps";

export const StoreContext = createContext<IStoreContext | null>(null);

export const StoreProvider: FC<IProps> = ({ children }) => {
    const [merch, setMerch] = useState<IStore[]>([]);

    useEffect(() => {
        getAndSetMerchFromService();
    }, []);

    const getAndSetMerchFromService = async () => {
        try {
            const merchFromService = await StoreService.fetchAll();
            if (merchFromService.success) {
                setMerch(merchFromService.data);
            } else {
                console.error("Error fetching merchandise:", merchFromService.data);
                setMerch([]);
            }
        } catch (error) {
            console.error("Error fetching merch:", error);
        }
    };

    const getMerchById = async (id: number): Promise<IStore | null> => {
        try {
            if (id != null && id !== undefined && id.toString().length > 0) {
                const merchFromService = await StoreService.getById(id);
                return merchFromService;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error getting merch by ID:", error);
            return null; 
        }
    };

    const postMerch = async (newMerch: IStore): Promise<void> => {
        try {
            await StoreService.postMerch(newMerch);
            getAndSetMerchFromService();
        } catch (error) {
            console.error("Error posting merchandise:", error);
        }
    };

    const putMerch = async (updatedMerch: IStore): Promise<IStore | null> => {
        try {
            const result = await StoreService.putMerch(updatedMerch);
            if (result != null) {
                getAndSetMerchFromService();
                return updatedMerch;
            }
            return null;          
            
        } catch (error) {
            console.error("Error updating merchandise:", error);
            return null; 
        }
    };

    const deleteMerch = async (id: number) => {
        try {
            await StoreService.deleteMerch(id);
            setMerch((prevMerch) => prevMerch.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting merchandise:", error);
        }
    };

    return (
        <StoreContext.Provider
            value={{ merch, getMerchById, postMerch, putMerch, deleteMerch }}
        >
            {children}
        </StoreContext.Provider>
    );
};
