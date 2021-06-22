import React, { useEffect, useState } from 'react';
// import hopsDataService from '../../services/hops.service';
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import './BeerList.css';
import randomIcon from '../../static/icons/randomIcon.svg'
import addIcon from '../../static/icons/addIcon.svg'
import searchIcon from '../../static/icons/searchIcon.svg'
import SearchModal from '../SearchModal/SearchModal'

const BeerList = () => {

    const { getAccessTokenSilently, user } = useAuth0();
    const [beers, setBeers] = useState([])
    const [commentedBeers, setCommentedBeers] = useState([])
    const [modalOpen, SetModalOpen] = useState(false)

    useEffect(() => {
        getBeers()
    }, []);

    const getBeers = async () => {
        const token = await getAccessTokenSilently();
        const beerUrl = 'http://localhost:8080/api/beers';
        const commentedUrl = 'http://localhost:8080/api/beers/commentedBeers'

        const options = {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
                user: user.sub
            }
        }

        Promise.all([
            fetch(beerUrl, options)
                .then(response => response.json()),
            fetch(commentedUrl, options)
                .then(response => response.json())
        ])
        .then(response => {
            setBeers(response[0])
            setCommentedBeers(response[1])
            // console.log(response[1])
        }).catch(e => {
            console.log(e);
        });
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

    const handleOpen = () => {
        SetModalOpen(true);
    };

    const handleClose = () => {
        SetModalOpen(false);
    }


    return(
        <div className="h-screen">
            <NavBar />
            <div>
                <main className="flex flex-col justify-between">
                    {/* Beer List - Copy as required for others */}
                    <div> 
                        <h1>Beers You've Added</h1>
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

                    <div>
                        <h1>Beers You've Commented On</h1>
                        <div className="flex flex-grow overflow-x-auto">
                            {
                                commentedBeers.map((beer, index) => (
                                    <Link key={beer.beer.id} className="box-shadow w-screen p-1.5" to={`/BeerDetails/${beer.beer.id}`}>
                                        <img className="max-w-none h-44 w-44" alt="Beer" src={beer.beer.image_url} />
                                        <div className="my-3">
                                            <h2 className="text-sm font-bold tracking-tight">{beer.beer.name}</h2>
                                            <h4 className="text-xs font-medium tracking-tight">{beer.beer.brewery} &#183; {beer.beer.beer_type}</h4>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </main>
            </div>
            <div className="flex inset-center">
                <Link to={`/search`}>
                    <img alt="Add Beer Icon" src={addIcon} />
                </Link>
                {/* <Link to={`/search`}> */}
                <img alt="Add Beer Icon" src={searchIcon} onClick={handleOpen}/>
                {/* </Link> */}
                <Link to={`/BeerDetails/${randomBeer()}`}>
                    <img alt="Select Random Beer Icon" src={randomIcon} />
                </Link>
            </div>
            <SearchModal show={modalOpen} handleClose={handleClose}/>
        </div>
        )
}

export default BeerList;