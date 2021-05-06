import { React, useState } from 'react';
import NavBar from '../NavBar/NavBar'
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const SearchBeer = (props) => {
    const { getAccessTokenSilently } = useAuth0();


    const [searchResult, setSeatchResult] = useState([]);
    const [searchValue, setSearchValue] = useState(" ");

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
        <div>
            <NavBar />
            <input
                className="input"
                type="text"
                value={searchValue}
                onChange={e => {setSearchValue(e.target.value); search()} }
                placeholder="Search"
            />

            {/* Below link needs to link to page where only comment is editable */}
            {
                searchResult.map((beer, index) => (
                    <Link key={beer.id} className="box-shadow w-screen p-1.5" to={`/AddComment/${beer.id}`}>
                        <img className="max-w-none h-44 w-44" alt="Beer" src={beer.image_url} />
                        <div className="my-3">
                            <h2 className="text-sm font-bold tracking-tight">{beer.name}</h2>
                            <h4 className="text-xs font-medium tracking-tight">{beer.brewery} &#183; {beer.beer_type}</h4>
                        </div>
                    </Link>
                ))
            }
            <div className="flex justify-center h-16 w-full button-background content-center">
                <Link className="box-shadow w-screen p-1.5" to={`/AddBeer`}>
                <button type="submit" className="m-auto h-11 w-4/5 bg-black text-white block shadow-sm sm:text-sm border-black-500 " >
                    Add Beer
                </button>
                </Link>
            </div>
        </div>
    )
}

export default SearchBeer;