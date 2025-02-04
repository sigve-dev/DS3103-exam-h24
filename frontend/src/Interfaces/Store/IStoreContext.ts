import IStore from "./IStore";

interface IStoreContext {
    merch: IStore[];
    getMerchById: (id: number) => Promise<IStore | null>;
    postMerch: (newMerch: IStore) => Promise<void>;
    putMerch: (updatedMerch: IStore) => Promise<IStore | null>;
    deleteMerch: (id: number) => void;
}

export default IStoreContext;
