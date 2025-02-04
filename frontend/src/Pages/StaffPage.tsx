import RegisterStaff from "../Components/Staff/RegisterStaff";
import StaffList from "../Components/Staff/StaffList";

const StaffPage = () => {
    return (
        <section className="staff-page container my-5">
            <div className="row justify-content-center mb-5">
                <article className="col-md-8 col-lg-6">
                    <RegisterStaff />
                </article>
            </div>

            <div className="row">
                <article className="col-12">
                    <h3 className="text-center text-dark mb-4">Staff Members</h3>
                    <StaffList />
                </article>
            </div>

            <footer className="mt-5 text-center">
                <p className="text-secondary small">
                    &copy; 2024 Trump Database. All rights reserved Kandidatnr.: 39
                </p>
            </footer>
        </section>
    );
};

export default StaffPage;
