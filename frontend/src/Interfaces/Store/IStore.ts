interface IStore {
    id?: number;
    name: string;
    image: string;
    type: string;
    quantity: number;
    price: number;
    details?: string;
}

export default IStore;
