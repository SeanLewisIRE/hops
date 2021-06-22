import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import searchIcon from '../../static/icons/search-icon.svg';
import closeIcon from '../../static/icons/close.png'

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
    
        <div className={`${display} absolute top-6 w-4/5 h-4/5 left-0 right-0 mx-auto rounded-md`}>
            <div className="h-full bg-white overflow-scroll">
                
                <div className="flex h-10 bg-white justify-around">
                    <img src={searchIcon} />
                    <input
                        className=""
                        type="text"
                        value={searchValue}
                        onChange={e => { setSearchValue(e.target.value); search() }}
                        placeholder="Search by Name"
                    />
                    <img src={closeIcon} onClick={props.handleClose}/>
                </div>

                <div className="opacity-90">
                    {/* Below link needs to link to page where only comment is editable */}
                    {
                        searchResult.map((beer, index) => (
                            <Link key={beer.id} className="box-shadow w-screen p-1.5" to={`/BeerDetails/${beer.id}`}>
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
    )
}

export default SearchModal;