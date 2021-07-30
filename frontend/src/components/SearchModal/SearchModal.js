import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import closeIcon from '../../static/icons/close.png'

import './SearchModal.css'

const SearchModal = (props) => {
    const display = props.show ? "flex" : "hidden"

    const { getAccessTokenSilently } = useAuth0();
    const [searchResult, setSeatchResult] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const search = async () => {
        const token = await getAccessTokenSilently();
        const url = `http://localhost:8080/api/beers/search/${searchValue}`;
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
                        setSeatchResult(data);
                    }
                    )
                    .catch(e => {
                        console.log(e);
                    });
            })
    }

    return (
        <div className={`${display} absolute top-0 h-screen w-screen bg-gray-500 bg-opacity-70`}>
            <div className="w-4/5 h-4/5 m-auto ">
                <div className="h-full bg-white overflow-scroll rounded-md">
                
                <div className="flex h-10 mt-4 justify-around">
                    <input
                        className="searchInput"
                        type="text"
                        value={searchValue}
                        onChange={e => { setSearchValue(e.target.value); search() }}
                        placeholder="Search by Name"
                    />
                    <img src={closeIcon} onClick={props.handleClose}/>
                </div>

                    <div className="flex flex-col items-center">
                    {/* Below link needs to link to page where only comment is editable */}
                    {
                        searchResult.map((beer, index) => (
                            <Link key={beer.id} className="box-shadow p-1.5" to={`/BeerDetails/${beer.id}`}>
                                <img className="max-w-none h-44 w-44" alt="Beer" src={beer.image_url} />
                                <div className="my-3">
                                    <h2 className="text-sm font-bold tracking-tight">{beer.name}</h2>
                                    <h4 className="text-xs font-medium tracking-tight">{beer.brewery} &#183; {beer.beer_type}</h4>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default SearchModal;