import { FC } from "react";
import AppRouting from "./Routing/AppRouting";
import { StoreProvider } from "./Contexts/StoreContext";
import { StaffProvider } from "./Contexts/StaffContext";

const App: FC = () => {
    return (
        <StoreProvider>
            <StaffProvider>
                    <AppRouting />
            </StaffProvider>
        </StoreProvider>
    );
};

export default App;
