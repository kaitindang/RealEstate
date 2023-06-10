import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const ListEmployeeComponent = () => {


    return (
        <div className = "container">
            <h2 className = "text-center"> List Employees </h2>
            <Link to = "/add-employee" className = "btn btn-primary mb-2" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Employee Id </th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                   
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent