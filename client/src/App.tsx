// rename to App.tsx when file naming issues are resolved.

import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
    return (
        <>   
            <Navbar/>
            <Outlet/>
        </>
    )
}


export default App