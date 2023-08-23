import Geocode from "react-geocode";
import { useState } from "react";
import {GoogleMap,LoadScript,Marker,MarkerF} from '@react-google-maps/api'
import { getGeocode,getLatLng } from 'use-places-autocomplete';
import { Fragment } from 'react';
import { useEffect } from "react";
import RealEstateService from './Service/RealEstateService';
import { Suspense } from "react";

const Place = ({id})=>{

  
    const containerStyle = {
        width: '500px',
        height: '500px',
      };

    const [laglng,setLaglng] = useState(null);
    useEffect(()=>{
        RealEstateService.getRealEstateById(id).then((response) => {
            
            Geocode.setLanguage('vi')
            Geocode.setRegion('VN')
            Geocode.setApiKey("AIzaSyA7QMEaYntyKOIFQmB911DQaU92GHXfffM")
            Geocode.fromAddress(response.data.address).then(
            (response) => {
              setLaglng(response.results[0].geometry.location);            
            }).catch(error =>{
                console.log(error)
            })
            
            
          
        }).catch(error => {
            console.log(error)
        })
            
    },[])
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Fragment>
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={laglng}
                zoom={10}
              
                >
                 <MarkerF position={laglng}></MarkerF>
                </GoogleMap>
            
        </Fragment>
        </Suspense>
    ) 

    }

export default Place;