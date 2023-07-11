import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import FileService from './Service/FileService';
import ImageGallery from 'react-image-gallery';


const ImagesListing = () => {

    const { id } = useParams();

    const [image, setImage] = useState({
        imageList: []
    });

    useEffect(() => {

        FileService.getImagesId(id).then((response) => {
            setImage({ imageList: response.data });
        });
    }, [])

    return (
        <div>

            <div id="carouselExampleIndicators" class="carousel slide">
                
                <div class="carousel-indicators">
                {
                    image.imageList.map( (image, index) =>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} class="active" aria-current="true" aria-label="Slide 1"></button>
                )}
                  
                </div>
                <div class="carousel-inner">
                {
                    image.imageList.map( image =>
                    <div class="carousel-item active">
                        <img src={image.fileUri} class="d-block w-100" alt="..." />
                    </div>
                )}

                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
           
        </div>
    );
}


export default ImagesListing;