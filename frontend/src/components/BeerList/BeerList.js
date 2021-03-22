import React, { useEffect, useState } from 'react';
// import hopsDataService from '../../services/hops.service';
import NavBar from '../NavBar/NavBar'

import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './BeerList.css';
import randomIcon from '../../static/icons/randomIcon.svg'
import addIcon from '../../static/icons/addIcon.svg'


const BeerList = () => {

    const { getAccessTokenSilently } = useAuth0();
    const [beers, setBeers] = useState([])

    
    useEffect(() => {
        getBeers()
    }, []);

    const getBeers = async () => {
        const token = await getAccessTokenSilently();
        const url = 'http://localhost:8080/api/beers';
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
                    .then((data) => {
                        setBeers(data);
                }
            )
        .catch(e => {
            console.log(e);
        });
        })
    }    

    const randomBeer = () => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        const beerIds = []
        beers.forEach(beer => beerIds.push(beer.id))
        const numberofBeers = beerIds.length
        const randomNumber = getRandomInt(numberofBeers)

        return beerIds[randomNumber]
    }


    return(
        <div>
            <NavBar />
            <div>
                <main className="flex flex-col justify-between">
                    {/* Beer List - Copy as required for others */}
                    <div> 
                        <h1>The Beer List</h1>
                        <div className="flex flex-grow overflow-x-auto">
                            {
                                beers.map((beer, index) => (
                                    <Link key={beer.id} className="box-shadow w-screen p-1.5" to={`/BeerDetails/${beer.id}`}>
                                        <img className="max-w-none h-44 w-44" alt="Beer" src={beer.image_url}/>
                                        <div className="my-3">
                                        <h2 className="text-sm font-bold tracking-tight">{beer.name}</h2>
                                        <h4 className="text-xs font-medium tracking-tight">{beer.brewery} &#183; {beer.beer_type}</h4>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>                        
                </main>

                <div className="flex items-center justify-center sticky">
                    <Link to={`/AddBeer`}>
                        <img alt="Add Beer Icon" src={addIcon} />
                    </Link>
                    <Link to={`/BeerDetails/${randomBeer()}`}>
                        <img alt="Select Random Beer Icon" src={randomIcon} />
                    </Link>
                </div>
            </div>
        </div>
        )
}

export default BeerList;