import { useState, useEffect } from "react";
import StoreList from "../Components/Store/StoreList";
import SearchMerchById from "../Components/Store/SearchMerchById";
import SearchMerchByName from "../Components/Store/SearchMerchByName";
import UpdateMerch from "../Components/Store/UpdateMerch";
import StoreService from "../Services/StoreService";
import 'bootstrap/dist/css/bootstrap.min.css';

const StorePage = () => {
    const [merchList, setMerchList] = useState<any[]>([]);
    const [filterType, setFilterType] = useState<string | null>(null);

    const fetchMerchList = async () => {
        try {
            const result = await StoreService.fetchAll();
            if (result.success) {
                setMerchList(result.data);
            } else {
                console.error("Failed to load merchandise from API:", result.data);
            }
        } catch (error) {
            console.error("Error getting merchandise:", error);
        }
    };

    const refreshMerchList = () => {
        fetchMerchList();
    };

    const handleDelete = async (id: number) => {
        try {
            await StoreService.deleteMerch(id);
            refreshMerchList();
        } catch (error) {
            console.error("Error deleting merchandise:", error);
        }
    };

    useEffect(() => {
        fetchMerchList();
    }, []);

    const handleFilterByType = (type: string | null) => {
        setFilterType(type);
    };

    const filteredMerchList = filterType ? merchList.filter(
        (merch) => merch.type.toLowerCase() === filterType.toLowerCase()): merchList;

    return (
        <div className="store-page container my-5">
            <header>
                <section className="d-flex justify-content-center align-items-center mb-4">
                    <h1 className="text-dark">Shop Items</h1>
                </section>
            </header>

            <main>
                <section className="search-and-update-section mb-4 p-4 bg-light border rounded">
                    <div className="row g-3">
                        <article className="col-md-4 col-sm-12">
                            <SearchMerchById />
                        </article>
                        <article className="col-md-4 col-sm-12">
                            <SearchMerchByName />
                        </article>
                        <article className="col-md-4 col-sm-12">
                            <UpdateMerch refreshMerchList={refreshMerchList} />
                        </article>
                    </div>
                </section>

                <section className="d-flex justify-content-center mb-3">
                    <button className="btn btn-primary mx-2" onClick={() => 
                            handleFilterByType(null)}>
                        Show All
                    </button>
                    <button className="btn btn-primary mx-2" onClick={() => 
                            handleFilterByType("Accessory")}>
                        Show Accessories
                    </button>
                    <button className="btn btn-primary mx-2" onClick={() =>
                            handleFilterByType("Clothing")}>
                        Show Clothing
                    </button>
                </section>

                <StoreList merchList={filteredMerchList} onDelete={handleDelete} />
            </main>

            <footer className="mt-5 text-center">
                <p className="text-secondary small">
                    &copy; 2024 Trump Database. All rights reserved Kandidatnr.: 39
                </p>
            </footer>
        </div>
    );
};

export default StorePage;
