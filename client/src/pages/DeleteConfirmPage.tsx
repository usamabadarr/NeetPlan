import { deleteUser } from "../api/userAPI";
import auth from "../utils/auth";
import { Link } from "react-router-dom";

const DeleteConfirmPage = () => {


    const confirmDelete = async () => {
        await deleteUser();
        auth.logout();
    }

    return(
        <>
            <h1 className="delete-alert">Are you sure you want to delete your profile? All saved events will be lost</h1>
            <button className="btn btn-delete" onClick={confirmDelete}>Delete</button>
            <Link to='/'><button className="btn">Cancel</button></Link>
        </>
    )
}


export default DeleteConfirmPage