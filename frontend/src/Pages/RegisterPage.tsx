import RegisterMerchComponent from "../Components/RegisterMerch/RegisterMerchComponent";

const RegisterPage = () => {
    return (
        <section className="register-page container my-5">
            <article className="">
                <RegisterMerchComponent />
            </article>

            <footer className="mt-5 text-center">
                <p className="text-secondary small">
                    &copy; 2024 Trump Database. All rights reserved Kandidatnr.: 39
                </p>
            </footer>
        </section>
    );
};

export default RegisterPage;
