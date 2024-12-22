import { FunctionComponent, useContext, useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { deleteUser, editUserStatus, getAllUsers } from "../services/userService";
import DeleteUserModal from "./DeleteUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { errorMsg, successMsg } from "../services/feedback";
import { SiteTheme } from "../App";
import { Pagination } from 'react-bootstrap';

interface SandBoxProps { }

const SandBox: FunctionComponent<SandBoxProps> = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userChanged, setUserChanged] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");
    const [openDeleteUser, setOpenDeleteUser] = useState<boolean>(false);
    const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(false);
    const [statusChange, setStatusChange] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage = 300;

    useEffect(() => {
        getAllUsers()
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userChanged]);

    let refresh = () => {
        setUserChanged(!userChanged);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="appMargin">
                <div className="container tableScroll">
                    <h5 className="text-center">All Users</h5>
                    {users.length ? (
                        <table className="table table-dark table-striped">
                            <thead>
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
                                {currentUsers.map((user: User) => (
                                    <tr key={user._id}>
                                        <td>{user.name.first}</td>
                                        <td>{user.name.last}</td>
                                        <td>{user.email}</td>
                                        {user.isBusiness ? (
                                            <td>
                                                <i className="fa-solid fa-check"></i>
                                            </td>
                                        ) : (
                                            <td>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                        onChange={() => {
                                                            editUserStatus(user._id as string, statusChange).then((res) => {
                                                                successMsg("User Changed To Business");
                                                                setUserChanged(!userChanged);
                                                            }).catch((err) => {
                                                                console.log(err);
                                                                errorMsg("User Didn't Change To Business");
                                                            });
                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        Not Bizz
                                                    </label>
                                                </div>
                                            </td>
                                        )}
                                        <td>{user.address.country}</td>
                                        <td>
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    setOpenUpdateUser(true);
                                                    setUserId(user._id as string);
                                                }}
                                            >
                                                <i className="fa-solid fa-pen text-success"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    setOpenDeleteUser(true);
                                                    setUserId(user._id as string);
                                                }}
                                            >
                                                <i className="fa-solid fa-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="loader">
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
                        </div>
                    )}

                    
                </div>
                {/* Pagination Component */}
                <Pagination className=" justify-content-center">
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </Pagination>
            </div>

            <UpdateUserModal
                show={openUpdateUser}
                onHide={() => setOpenUpdateUser(false)}
                refresh={refresh}
                userId={userId}
            />
            <DeleteUserModal
                show={openDeleteUser}
                onHide={() => setOpenDeleteUser(false)}
                refresh={refresh}
                userId={userId}
            />
        </>
    );
};

export default SandBox;