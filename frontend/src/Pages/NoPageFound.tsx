import { Link } from "react-router-dom";

{/* 
    Opprettet en egen unik side, dersom brukeren skriver inn feil url så vil de få en feilmelding
    og muligheten å trykke på en knapp som tar dem tilbake til hjemmesiden.     
*/}

const NoPageFound = () => {
    return (
        <section>
            <main className="container text-center my-5">
                <h1 className="display-4 text-dark">404</h1>
                <p >
                    Whoops! The page you're looking for doesn't exist.
                </p>
                <Link to="/">
                    Go back to the homepage
                </Link>
            </main>
            <footer className="mt-5 text-center">
                <p className="text-secondary small">
                    &copy; 2024 Trump Database. All rights reserved Kandidatnr.: 39
                </p>
            </footer>
        </section>
    )
}

export default NoPageFound;