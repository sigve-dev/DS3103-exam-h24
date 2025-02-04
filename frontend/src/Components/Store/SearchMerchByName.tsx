import { useState } from "react";
import StoreService from "../../Services/StoreService";

const SearchMerchByName = () => {
    const [name, setName] = useState("");
    const [merchList, setMerchList] = useState<any[]>([]);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!name.trim()) {
            setError("Please enter a valid name.");
            return;
        }

        try {
            const result = await StoreService.searchByName(name);
            if (result.length === 0) {
                setError("No merchandise found.");
                setMerchList([]);
            } else {
                setMerchList(result);
                setError("");
            }
        } catch (e) {
            console.error("Error during search:", e);
            setError("An error occurred while searching. Please try again.");
            setMerchList([]);
        }
    };

    return (
        <section className="card p-3">
            <h4 className="text-dark text-center">Search by Name</h4>
            <article className="d-flex mb-3">
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control me-2"
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </article>
            {error && <p className="text-danger">{error}</p>}
            {merchList.length > 0 && (
                <article className="mt-3">
                    <h5>Results:</h5>
                    <ul className="list-group">
                        {merchList.map((merch) => (
                            <li key={merch.id} className="list-group-item">
                                <strong>{merch.name}</strong> - ${merch.price}
                            </li>
                        ))}
                    </ul>
                </article>
            )}
        </section>
    );
};

export default SearchMerchByName;
