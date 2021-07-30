import React, {useState} from 'react';
// import S3FileUpload from 'react-s3'
// import hopsDataService from '../../services/hops.service';
import NavBar from '../NavBar/NavBar'

import addPhoto from '../../static/icons/addPhoto.svg';
import './AddBeer.css';
import notesIcon from '../../static/icons/notes.svg';
import strengthIcon from '../../static/icons/strength.svg';
import typeIcon from '../../static/icons/type.svg';
import beerIcon from '../../static/icons/beer.svg';
import { useAuth0 } from "@auth0/auth0-react";
import httpValue from '../../http-common'


function AddBeer(props){

    const { getAccessTokenSilently, user } = useAuth0();

    const [beer, setBeer] = useState({
        id: null,
        name: "",
        details: "",
        beerType: "",
        brewery: "",
        alcPer: "",
        country: "",
        container: "",
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

    const onChangeImageS3upload = async (e) => {

        const token = await getAccessTokenSilently();
        const url = `${httpValue}/beers/createPreUrl`;
        
        const fileName = e.target.form[0].files[0]['name'];

        let data = {
            // name: `${fileName}-User:${user.sub}`
            name: fileName
        };

        const preSignedOptions = {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
                user: user.sub
            },
            body: JSON.stringify(data)
        }

        const file = e.target.form[0].files[0];

        const POSToptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/*',
                'Access-Control-Allow-Origin': '*'
            },
            body: file
        }

        fetch(url, preSignedOptions)
            .then(response => response.json())
            .then(data => {
                let POSTurl = data.url
                fetch(POSTurl, POSToptions)
                    .then(response => {
                        const regex = /^http(.*)(?=(\?))/g;
                        const s3Url = response.url.match(regex)[0];

                        setBeer({
                            ...beer,
                            image_url: s3Url,
                        })
                    })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const saveBeer = async (e) => {

        const token = await getAccessTokenSilently();
        const url = `${httpValue}/beers`;

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
        
        // const headers = {
        //     "Content-type": "application/json",
        //     "Access-Control-Allow-Origin": "*",
        //     Authorization: `Bearer ${token}`,
        // }

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        }

        fetch(url, options)
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

    const newBeer = () => {
        setBeer({
            ...beer, 
            id: null,
            name: "",
            details: "",
            beerType: "",
            brewery: "",
            alcPer: "",
            country: "",
            container: "",
            user_comment: "",
            image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/no_image_can.jpg",
            submitted: false
        })
    }
        return (
            <div >
                {beer.submitted ? (
                    <div>
                        <h4>Beer submitted successfully!</h4>
                        {/* If they liked it: May you always find a cold one. If not: May you always see it languish in the bargain bin */}
                        <button  onClick={newBeer}>
                            Add
                        </button>
                    </div>
                ) : (

                    <div className="page">
                        <NavBar />
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form onSubmit={saveBeer}>

                                <div className="relative">
                                    <img className="beer-image" src={beer.image_url} alt="Beer Placeholder"></img>
                                    
                                    <div className="absolute top-44 flex w-full items-center justify-center">
                                        <label className="flex flex-col items-center tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-white">
                                                <img src={addPhoto} alt="add icon"/>
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
                                            onChange={onChangeBrewery}/>
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
                                            onChange={onChangeCountry}/>
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
                                            onChange={onChangeContainer}/>
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
                                    Add Beer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
            </div>
        );
}

export default AddBeer;