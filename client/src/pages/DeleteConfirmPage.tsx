import { deleteUser } from "../api/userAPI";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

const DeleteConfirmPage = () => {


    const confirmDelete = async () => {
        await deleteUser();
        auth.logout();
    }

    return(
        <div className="dlt-container">
            <h2 className="dlt-alert">Are you sure you want to delete your profile? All saved events will be lost</h2>
            <div className="dlt-btn-container">
                <Link to='/'><button className="btn btn-primary">Cancel</button></Link>
                <button className="btn dlt-btn btn-primary" onClick={confirmDelete}>Delete</button>
            </div>
        </div>
    )
}


export default DeleteConfirmPage