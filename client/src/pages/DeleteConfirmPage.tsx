import { deleteUser } from "../api/userAPI";
import auth from "../utils/auth";

const DeleteConfirmPage = () => {

    const ReturnHome = () => {
        window.location.assign('/')
    }

    const confirmDelete = async () => {
        await deleteUser();
        auth.logout();
    }

    return(
        <>
            <h1 className="delete-alert">Are you sure you want to delete your profile? All saved events will be lost</h1>
            <button className="btn btn-delete" onClick={confirmDelete}>Delete</button>
            <button className="btn" onClick={ReturnHome}>Cancel</button>
        </>
    )
}


export default DeleteConfirmPage