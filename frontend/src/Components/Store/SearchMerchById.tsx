import { useState } from "react";
import StoreService from "../../Services/StoreService";

const SearchMerchById = () => {
    const [id, setId] = useState<number | null>(null);
    const [merch, setMerch] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!id) {
            setError("Please enter a valid ID.");
            return;
        }

        try {
            const result = await StoreService.getById(id);
            setMerch(result);
            setError("");
        } catch (e) {
            setError("Merchandise not found.");
            setMerch(null);
        }
    };

    return (
        <div className="card p-3">
            <h4 className="text-dark text-center">Search by ID</h4>
            <div className="d-flex mb-3">
                <input
                    type="number"
                    placeholder="Enter ID"
                    className="form-control me-2"
                    onChange={(e) => setId(Number(e.target.value))}
                />
                <button onClick={handleSearch} className="btn btn-primary ">
                    Search
                </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {merch && (
                <div className="mt-3">
                    <h5>Merchandise Found:</h5>
                    <p>Name: {merch.name}</p>
                    <p>Type: {merch.type}</p>
                    <p>Price: ${merch.price}</p>
                </div>
            )}
        </div>
    );
};

export default SearchMerchById;
