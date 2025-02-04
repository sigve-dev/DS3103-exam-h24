import "./HomePage.css";

const HomePage = () => {
    return (
        <section className="home-page container text-center my-5">
            <header className="mb-5">
                <h1 className="display-4 text-dark">Welcome to Trump Database</h1>
                <p className="lead text-secondary">
                    The ultimate site keeping track of all Merch and Staff!
                </p>

                <p>
                    Add/Remove both staff and merch as you see fit.
                </p>
            </header>

            <main>
                <img
                    src="src/assets/images/trump.jpg"
                    alt="Trump Database"
                    className="img-fluid rounded shadow"
                />
            </main>

            <footer className="mt-5">
                <p className="text-secondary small">
                    &copy; 2024 Trump Database. All rights reserved Kandidatnr.: 39
                </p>
            </footer>
        </section>
    );
};

export default HomePage;
