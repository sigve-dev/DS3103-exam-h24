import { useState, useContext } from "react";
import { StoreContext } from "../../Contexts/StoreContext";
import "./RegisterMerch.css";

const RegisterMerchComponent = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [details, setDetails] = useState("");
    const [error, setError] = useState("");

    const storeContext = useContext(StoreContext);

    if (!storeContext) {
        throw new Error("StoreContext must be used within a StoreProvider.");
    }

    const { postMerch } = storeContext;

    const registerMerch = async () => {
        try {
            if (!image) {
                setError("Please select an image.");
                return;
            }

            const formData = new FormData();
            formData.append("file", image);

            const uploadResponse = await fetch("http://localhost:5255/api/ImageUpload", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error("Image upload failed.");
            };

            const { fileName } = await uploadResponse.json();

            const newMerch = {
                name,
                image: fileName,
                type,
                quantity,
                price,
                details,
            };

            await postMerch(newMerch);

            alert("Merchandise registered successfully!");
            setName("");
            setImage(null);
            setType("");
            setQuantity(0);
            setPrice(0);
            setDetails("");
            setError("");
        } catch (e) {
            console.error("Error registering merchandise");
            setError("Failed to register merchandise. Please try again.");
        }
    };

    return (
        <main className="">
            <h3 className="text-dark text-center">Register New Item for Shop</h3>

            {/* bruker card og p-4 klassen for å pakke input form inn i en boks, med padding slik at det blir mellomrom fra kantene.
                Dette gir boksen en litt mer fyldig følelse, der den ikke føles så trang.*/}
            <section className="card p-4">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        registerMerch();
                    }}
                    // Bruker noValidate her for å håndtere validering av skjemaet, slik at 
                    // det isteden for nettleseren håndteres av JavaScript koden. 
                    noValidate
                >
                    {error && <p className="error">{error}</p>}

                    <article className="form-group mb-3">
                        <label htmlFor="name" className="form-label">
                            What's the items name?
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter merchandise name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </article>

                    <article className="form-group mb-3">
                        <label htmlFor="image" className="form-label">
                            Upload the items image:
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files?.[0] || null)}
                            required
                        />
                    </article>

                    <article className="form-group mb-3">
                        <label htmlFor="type" className="form-label">
                            What type of merch is it?
                        </label>
                        <select
                            id="type"
                            className="form-control"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select Type
                            </option>
                            <option value="Accessory">Accessory</option>
                            <option value="Clothing">Clothing</option>
                        </select>
                    </article>


                    <section className="row">
                        <article className="col-md-6 form-group mb-3">
                            <label htmlFor="quantity" className="form-label">
                                How many items are there?
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                className="form-control"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                required
                            />
                        </article>

                        <article className="col-md-6 form-group mb-3">
                            <label htmlFor="price" className="form-label">
                                What is the price of the item?
                            </label>
                            <input
                                type="text"
                                id="price"
                                className="form-control"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Tillater kun number uten komma eller punktum.
                                    if (/^\d*$/.test(inputValue)) {
                                        setPrice(Number(inputValue)); // Oppdaterer state med riktig number.
                                    }
                                }}
                            />
                        </article>
                    </section>

                    <article className="form-group mb-3">
                        <label htmlFor="details" className="form-label">
                            Any specific details about the item?
                        </label>
                        <input
                            id="details"
                            className="form-control"
                            placeholder="Enter additional details"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                        ></input>
                    </article>

                    <button type="submit" className="btn btn-primary w-100">
                        Register Item
                    </button>
                </form>
            </section>
        </main>
    );
};

export default RegisterMerchComponent;
