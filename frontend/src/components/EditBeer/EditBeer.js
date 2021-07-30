import React, { useState } from "react"
// import hopsDataService from '../../services/hops.service';
import S3FileUpload from 'react-s3'
import notesIcon from '../../static/icons/notes.svg';
import strengthIcon from '../../static/icons/strength.svg';
import typeIcon from '../../static/icons/type.svg';
import beerIcon from '../../static/icons/beer.svg';
import "./EditBeer.css";
import addPhoto from '../../static/icons/addPhoto.svg';

import axios from 'axios'
import httpValue from '../../http-common'


import { useAuth0, user } from "@auth0/auth0-react";

const config = {
    bucketName: "hops-bucket",
    dirName: "user-images",
    accessKey: process.env.REACT_APP_S3_ACCESS_KEY,
    secretKey: process.env.REACT_APP_S3_SECRET_KEY,
    region: 'eu-west-1',
}


function EditBeerDetails(props) {
    const { getAccessTokenSilently, user } = useAuth0();

    const [beer, setBeer] = useState({
        id: props.id,
        name: props.name,
        details: props.details,
        beerType: props.beer_type,
        brewery: props.brewery,
        alcPer: props.alc_per,
        country: props.country_origin,
        container: props.container,
        user_comment: "",
        image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/no_image_can.jpg",
        added_by: "",
        submitted: false
    })

    const onChangeName = (e) => {
        setBeer({
            ...beer,
            name: e.target.value
        });
    }

    const onChangeDetails = (e) => {
        setBeer({
            ...beer,
            details: e.target.value
        });
    }

    const onChangeBeerType = (e) => {
        setBeer({
            ...beer,
            beerType: e.target.value
        });
    }

    const onChangeBrewery = (e) => {
        setBeer({
            ...beer,
            brewery: e.target.value
        });
    }

    const onChangeAlcPer = (e) => {
        setBeer({
            ...beer,
            alcPer: e.target.value
        });
    }

    const onChangeCountry = (e) => {
        setBeer({
            ...beer,
            country: e.target.value
        });
    }

    const onChangeContainer = (e) => {
        setBeer({
            ...beer,
            container: e.target.value
        });
    }

    const onChangeComment = (e) => {
        setBeer({
            ...beer,
            user_comment: e.target.value
        });
    }

    const onChangeImageS3upload = (e) => {
        setBeer({
            ...beer,
            image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/beer_loading.gif"
        })

        // form[0] is the loaction of the image upload field in the form. 
        S3FileUpload.uploadFile(e.target.form[0].files[0], config)
            .then((upload) => {
                console.log(upload.location)
                this.setState({
                    image_url: upload.location,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const editBeer = async (e) => {

        const token = await getAccessTokenSilently();
        const url = `${httpValue}/beers/edit/${beer.id}`;

        let data = {
            name: beer.name,
            details: beer.details,
            beer_type: beer.beerType,
            brewery: beer.brewery,
            alc_per: beer.alcPer,
            country_origin: beer.country,
            container: beer.container,
            user_comment: beer.user_comment,
            image_url: beer.image_url,
            added_by: user.sub,
        };

        const headers = {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
        }

        axios.post(url, data, {
            headers: headers
        })
            .then(() => {
                setBeer({
                    ...beer,
                    submitted: true
                });
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className="page">
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={editBeer}>

                    <div className="relative">
                        <img className="beer-image" src={beer.image_url} alt="Beer Placeholder"></img>

                        <div className="absolute top-44 flex w-full items-center justify-center">
                            <label className="flex flex-col items-center tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-white">
                                <img src={addPhoto} alt="add icon" />
                                <input
                                    className="hidden"
                                    src={addPhoto}
                                    onChange={onChangeImageS3upload}
                                    type="file"
                                    id="input-image"
                                    name="input-Image"
                                    accept="image/*"
                                    capture="camera"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Beer Icon" src={beerIcon} />
                                <label htmlFor="name" className="inline pl-1 text-xs font-bold tracking-tight">Beer Name</label>
                                <input required type="text" name="name" id="name" autoComplete="Beer Name" className="mt-1 focus:solid-indigo-700 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.name}
                                    onChange={onChangeName} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Description Icon" src={beerIcon} />
                                <label htmlFor="description" className="inline pl-1 text-xs font-bold tracking-tight">Description</label>
                                <input type="text" name="description" id="description" autoComplete="description" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.details}
                                    onChange={onChangeDetails} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">

                            <div className="col-span-6">
                                <img className="inline" alt="Type Icon" src={typeIcon} />
                                <label htmlFor="beerType" className="inline pl-1 text-xs font-bold tracking-tight">Beer Type</label>
                                <input type="text" name="beerType" id="beerType" autoComplete="Beer Type" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.beerType}
                                    onChange={onChangeBeerType} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Brewery Icon" src={beerIcon} />
                                <label htmlFor="brewery" className="inline pl-1 text-xs font-bold tracking-tight">Brewery</label>
                                <input type="text" name="brewery" id="brewery" autoComplete="brewery" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.brewery}
                                    onChange={onChangeBrewery} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Strength Icon" src={strengthIcon} />
                                <label htmlFor="alcPer" className="inline pl-1 text-xs font-bold tracking-tight">Alcohol Percentage</label>
                                <input type="text" name="alcPer" id="alcPer" autoComplete="alcPer" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.alcPer}
                                    onChange={onChangeAlcPer} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Country Icon" src={beerIcon} />
                                <label htmlFor="country" className="inline pl-1 text-xs font-bold tracking-tight">Country</label>
                                <input type="text" name="country" id="country" autoComplete="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.country}
                                    onChange={onChangeCountry} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Container Icon" src={beerIcon} />
                                <label htmlFor="container" className="inline pl-1 text-xs font-bold tracking-tight">Container</label>
                                <input type="text" name="container" id="container" autoComplete="container" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.container}
                                    onChange={onChangeContainer} />
                            </div>
                        </div>
                    </div>

                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="col-span-6">
                                <img className="inline" alt="Notes Icon" src={notesIcon} />
                                <label htmlFor="user_comment" className="inline pl-1 text-xs font-bold tracking-tight">Comments</label>
                                <input type="text" name="user_comment" id="user_comment" autoComplete="user_comment" className="mt-1 h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                    value={beer.user_comment}
                                    onChange={onChangeComment} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center h-16 w-full button-background content-center">
                        <button type="submit" className="m-auto h-11 w-4/5 bg-black text-white block shadow-sm sm:text-sm border-black-500 " >
                            Edit Your Beer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )


}

export default EditBeerDetails;