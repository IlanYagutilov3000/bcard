import { FunctionComponent, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { deleteUser, editUserStatus, getAllUsers } from "../services/userService";
import DeleteUserModal from "./DeleteUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { errorMsg, successMsg } from "../services/feedback";
import { SiteTheme } from "../App";

interface SandBoxProps {

}

const SandBox: FunctionComponent<SandBoxProps> = () => {
    const [users, setUsers] = useState<User[]>([])
    const [userChanged, setUserChanged] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>("");
    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
    const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);
    const [statusChange, setStatusChange] = useState<boolean>(true);
    const { color, background } = useContext(SiteTheme);

    useEffect(() => {
        getAllUsers().then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [userChanged]);

    let refresh = () => {
        setUserChanged(!userChanged)
    }

    return (
        <>
            <div className="container appMargin" >
                <h5 className="text-center">All Users</h5>
                {users.length ? (<table className="table table-dark table-striped" >
                    <thead >
                        <tr>
                            <th className="col-2">First Name</th>
                            <th className="col-2">Last Name</th>
                            <th className="col-2">Email</th>
                            <th className="col-2">is Business</th>
                            <th className="col-2">Country</th>
                            <th className="col-2">Edit</th>
                            <th className="col-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (<tr key={user._id} >
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.email}</td>
                            {user.isBusiness ? (<td><i className="fa-solid fa-check"></i></td>) : (<td>{/* <i className="fa-solid fa-x"></i> */}<div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={() => {
                                    editUserStatus(user._id as string, statusChange as boolean).then((res) => {
                                        successMsg("User Changed To Business")
                                        setUserChanged(!userChanged)
                                    }).catch((err) => {
                                        console.log(err);
                                        errorMsg("User Didn't Change To Business")
                                    })
                                }} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Not Bizz
                                </label>
                            </div></td>)}
                            <td>{user.address.country}</td>
                            <td><button className="btn" onClick={() => {
                                setOpenUpdateUser(true)
                                setUserId(user._id as string)
                            }} ><i className="fa-solid fa-pen text-success"></i></button></td>
                            <td><button className="btn" onClick={() => {
                                setOpenDeleteUser(true)
                                setUserId(user._id as string)
                            }} ><i className="fa-solid fa-trash text-danger"></i></button></td>
                        </tr>))}
                    </tbody>
                </table>) : (<div className="loader">
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                    <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                </div>)}
            </div>

            <UpdateUserModal show={openUpdateUser} onHide={() => setOpenUpdateUser(false)} refresh={refresh} userId={userId} />

            <DeleteUserModal show={openDeleteUser} onHide={() => setOpenDeleteUser(false)} refresh={refresh} userId={userId} />

        </>
    );
}

export default SandBox;