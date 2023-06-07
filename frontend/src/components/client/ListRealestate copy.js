import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import RealEstateService from '../services/RealEstateService'

const ListRealEstate = () => {

    const [RealEstate, setRealEstate] = useState([])

    useEffect(() => {

        getAllRealEstate();
    }, [])

    const getAllRealEstate = () => {
        RealEstateService.getAllRealEstate().then((response) => {
            setRealEstate(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteRealEstate = (realestatesId) => {
        RealEstateService.deleteRealEstate(realestatesId).then((response) =>{
            getAllRealEstate();
 
        }).catch(error =>{
            console.log(error);
        })
         
     }


    return (
        <div className = "container">
            <h2 className = "text-center"> List Real Estate </h2>
            <Link to = "/add-realestate" className = "btn btn-primary mb-2" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th> Real Estate Id </th>
                    <th> Title </th>
                    <th> Address </th>
                    <th> Descriptions </th>
                    <th> Image </th>
                    <th> Actions </th>
                </thead>
                <tbody>
                    {
                        RealEstate.map(
                            RealEstate =>
                            <tr key = {RealEstate.id}>                                 
                                <td>{RealEstate.id}</td>
                                <td>{RealEstate.title}</td>
                                <td>{RealEstate.address}</td>
                                <td>{RealEstate.descriptions}</td>
                                <td><img style={{ width: 100, height: 100 }} src={require('./moi.jpg')} /></td>
                                <Link className="btn btn-info" to={`/edit-realestate/${RealEstate.id}`} >Update</Link>
                                <button className = "btn btn-danger" onClick = {() => deleteRealEstate(RealEstate.id)}
                                    style = {{marginLeft:"10px"}}> Delete</button>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListRealEstate