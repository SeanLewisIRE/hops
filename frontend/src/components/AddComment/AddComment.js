import React, { useEffect, useState } from "react"
// import hopsDataService from '../../services/hops.service';
import NavBar from '../NavBar/NavBar'

import notesIcon from '../../static/icons/notes.svg';
import strengthIcon from '../../static/icons/strength.svg';
import typeIcon from '../../static/icons/type.svg';
import beerIcon from '../../static/icons/beer.svg';
import "./AddComment.css";

import { useAuth0 } from "@auth0/auth0-react";
import httpValue from '../../http-common'



function AddComment(props) {

    const { getAccessTokenSilently, user } = useAuth0();

    const [currentBeer, setCurrentBeer] = useState({
        id: null,
        name: "",
        details: "",
        beer_type: "",
        brewery: "",
        alc_per: "",
        country_origin: "",
        container: "",
        image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/no_image_can.jpg",
    })

    useEffect(() => {
        const getBeer = async (id) => {
            const token = await getAccessTokenSilently();
            const url = `${httpValue}/beers/${id}`;
            const options = {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `Bearer ${token}`,
                }
            }
            fetch(url, options)
                .then(response => {
                    response.json()
                        .then(response => {
                            const { id, name, details, beer_type, brewery, alc_per, country_origin, container, image_url } = response
                            setCurrentBeer({
                                "id": id,
                                "name": name,
                                "details": details,
                                "beer_type": beer_type,
                                "brewery": brewery,
                                "alc_per": alc_per,
                                "country_origin": country_origin,
                                "container": container,
                                "image_url": image_url
                            })
                        })
                        .catch(e => {
                            console.log(e);
                        });
                })
        }
        getBeer(props.match.params.id)
    }, [props.match.params.id]);

    const [comment, setComment] = useState({
        user_comment: ""
    })    

    const onChangeComment = (e) => {
        setComment({
            user_comment: e.target.value
        });
    }

    const saveUserComment = async (e) => {

        const token = await getAccessTokenSilently();
        const url = `${httpValue}/beers/addcomment`;

        let data = {
            beer_id: currentBeer.id,
            user_id: user.sub,
            comment: comment.user_comment
        };

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
                user: user.sub
            },
            body: JSON.stringify(data)
        }

        fetch(url, options)
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="page">

            <NavBar />

            <main>
                <img className="beer-image" src={currentBeer.image_url} alt="Beer" />

                <div className="beer-header h-full container px-5">
                    <h1 className="text-xl pt-4 pb-2 font-black">{currentBeer.name}</h1>
                    <h2 className="text-base pb-4">{currentBeer.brewery}</h2>
                </div>

                <div className="container">
                    <div className="pt-4 ml-4">
                        <img className="inline" alt="Type Icon" src={typeIcon} />
                        <h4 className="inline text-sm font-bold pl-1">Type</h4>
                        <p className="text-base pt-1">{currentBeer.beer_type}</p>
                    </div>
                    <div className="pt-4 ml-4">
                        <img className="inline" alt="Details Icon" src={beerIcon} />
                        <h4 className="inline text-sm font-bold pl-1">Details</h4>
                        <p className="text-base pt-1">{currentBeer.details}</p>
                    </div>
                    <div className="pt-4 ml-4">
                        <img className="inline" alt="Strength Icon" src={strengthIcon} />
                        <h4 className="inline text-sm font-bold pl-1">Strength</h4>
                        <p className="text-base pt-1">{currentBeer.alc_per}%</p>
                    </div>
                    <div className="pt-4 ml-4">
                        <img className="inline" alt="Country Icon" src={beerIcon} />
                        <h4 className="inline text-sm font-bold pl-1">Country</h4>
                        <p className="text-base pt-1">{currentBeer.country_origin}</p>
                    </div>

                    <form onSubmit={saveUserComment}>

                        <div className="shadow overflow-hidden sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="col-span-6">
                                    <img className="inline" alt="Notes Icon" src={notesIcon} />
                                    <label htmlFor="user_comment" className="inline pl-1 text-xs font-bold tracking-tight">Comments</label>
                                    <input type="text" name="user_comment" id="user_comment" autoComplete="user_comment" className="mt-1 h-16 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                        value={comment.user_comment}
                                        onChange={onChangeComment} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center h-16 w-full button-background content-center">
                            <button type="submit" className="m-auto h-11 w-4/5 bg-black text-white block shadow-sm sm:text-sm border-black-500 " >
                                Penny for your thoughts
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )


}

export default AddComment;