import { Outlet } from "react-router-dom";
import Navbar from "./temp/Navbar";
import Footer from "./temp/Footer";

function App() {
    return (
        <>   
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )

}

export default App