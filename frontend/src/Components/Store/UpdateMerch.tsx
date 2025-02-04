import React, { useState } from "react";
import StoreService from "../../Services/StoreService";

interface UpdateMerchProps {
    refreshMerchList: () => void;
}

const UpdateMerch: React.FC<UpdateMerchProps> = ({ refreshMerchList }) => {
    const [id, setId] = useState<number | null>(null);
    const [merch, setMerch] = useState<any>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch merchandise by ID
    const fetchMerch = async () => {
        if (!id) {
            setError("Please enter a valid ID.");
            return;
        }

        try {
            const result = await StoreService.getById(id);
            if (!result) {
                setError("Merchandise not found.");
                setMerch(null);
                return;
            }
            setMerch(result);
            setError("");
            setSuccess("");
        } catch (err) {
            console.error("Error fetching merchandise:", err);
            setError("Failed to fetch merchandise. Please try again.");
            setMerch(null);
        }
    };

    const handleUpdate = async () => {
        if (!merch) {
            setError("No merchandise loaded to update.");
            return;
        }

        try {
            await StoreService.updateMerch(merch);
            setSuccess("Merchandise updated successfully.");
            setError("");

            refreshMerchList();
        } catch (err) {
            console.error("Error updating merchandise:", err);
            setError("Failed to update merchandise. Please try again.");
            setSuccess("");
        }
    };

    return (
        <section className="card p-3">
            <h4 className="text-dark text-center">Update Merchandise</h4>

            <article className="d-flex mb-3">
                <input
                    type="number"
                    placeholder="Enter ID"
                    className="form-control me-2"
                    value={id || ""}
                    onChange={(e) => setId(Number(e.target.value))}
                />
                <button onClick={fetchMerch} className="btn btn-primary">
                    Search
                </button>
            </article>

            {error && <p className="text-danger">{error}</p>}

            {success && <p className="text-success">{success}</p>}

            {merch && (
                <article className="mt-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="form-control mb-2"
                        value={merch.name || ""}
                        onChange={(e) =>
                            setMerch({ ...merch, name: e.target.value })
                        }
                    />

                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="form-control mb-2"
                        value={merch.price || ""}
                        onChange={(e) =>
                            setMerch({ ...merch, price: Number(e.target.value) })
                        }
                    />

                    <button onClick={handleUpdate} className="btn btn-success">
                        Update
                    </button>
                </article>
            )}
        </section>
    );
};

export default UpdateMerch;
