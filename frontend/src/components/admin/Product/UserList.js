import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Pagination from "@material-ui/lab/Pagination";
import ProductService from './ProductService';
import Product from './Product';
import Sidebar from '../../client/Sidebar';
import RealEstateService from '../../client/Service/RealEstateService';
import User from './User';
import UserService from './UserService';

const UserList = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useState({
        id: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        dateOfBirth: "",
        phone: "",
        avatar: ""
    });

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const pageSizes = [5, 10];

    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    useEffect(() => {
        retrieveUsers();
        
    }, [page, pageSize])

    const retrieveUsers = () => {
        const fetchData = async () => {
            const params = getRequestParams(page, pageSize);
            setLoading(true);
            try {
                const response = await UserService.getAllUser(params);
                const { users, totalPages } = response.data;

                setAccount(users);
                setCount(totalPages);

            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
      };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    const deleteAccount = (e, id) => {
        e.preventDefault();
        UserService.deleteUser(id).then((res) => {
            if (account) {
                setAccount((prevElement) => {
                    return prevElement.filter((account) => account.id !== id)
                })
            }
        })
    }

    const viewAccount = (e, id) => {
        e.preventDefault();
        UserService.getUserById(id).then((res) => {
            if (account) {
                setAccount((prevElement) => {
                    return prevElement.filter((account) => account.id !== id)
                })
            }
        })
    }

    return (
        <div className='row'>
            <div class="col-sm-3">
                <Sidebar />
            </div>
            <div class="col-sm-9">

                <div className='flex shadow border-b overflow-x-scroll'>
                    <table class="table table-sm">
                        <thead >
                            <tr>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    #
                                </th>

                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Tên Tài Khoảng
                                </th>

                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Email
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">
                                    Trạng thái
                                </th>
                                <th className="text-left font-medium uppercase tracking-wider py-3 px-6">

                                </th>
                            </tr>

                        </thead>
                        {!loading && (
                            <tbody className='bg-white'>

                                {account.map((account) => (
                                    <User account={account}
                                        deleteAccount={deleteAccount}                                    
                                        key={account.id}>
                                    </User>

                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className="col-md-12 list d-flex justify-content-between">
                    <div className="mt-3">
                        {"Items per Page: "}
                        <select onChange={handlePageSizeChange} value={pageSize}>
                            {pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-3">

                        <Pagination
                            color="primary"
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserList;