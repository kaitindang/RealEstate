import ReactMapGL from '@goongmaps/goong-map-react';
import Marker from '@goongmaps/goong-map-react';
import { Fragment, useState } from "react";
import React from 'react';




const Place = ({laglng})=>{


  const [viewport, setViewport] = useState({
    width: 700,
    height: 700,
    latitude: laglng.lat,
    longitude: laglng.lng,
    zoom: 12
  });

  const[maker,setMaker] = useState({
    latitude: laglng.lat,
    longitude: laglng.lng,
  })

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      
      goongApiAccessToken='PrLvkQKJlfK7iBycRsODlcRk3XsPI2DgHYgnNHs5'
    >
      <Marker {...maker}
            goongApiAccessToken='5gy8P5nRJTXhOlFaCVuRURIcPr4pmAlqm3BvF9IW'>
        <a>YOU ARE HERE</a>
      </Marker>
    </ReactMapGL>
  );

  }

export default Place;