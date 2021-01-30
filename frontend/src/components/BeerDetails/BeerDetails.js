import React, { useEffect, useState } from "react"
import hopsDataService from '../../services/hops.service';

// import notesIcon from '../../static/icons/notes.svg';
import strengthIcon from '../../static/icons/strength.svg';
import typeIcon from '../../static/icons/type.svg';
import beerIcon from '../../static/icons/beer.svg';
import "./BeerDetails.css";
import { useAuth0 } from "@auth0/auth0-react";


function BeerDetails(props) {
    const { getAccessTokenSilently } = useAuth0();
    
    const [currentBeer, setValues] = useState({
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
        getBeer(props.match.params.id)
    });

    const getBeer = (id) => {
        hopsDataService.get(id)
        .then(response => {
            setValues({
                ...currentBeer,
                response})
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
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
                {/* <div className="pt-4 ml-4">
                    <img className="inline" alt="Notes Icon" src={notesIcon} />
                    <h4 className="inline text-sm font-bold pl-1">Notes</h4>
                    <p className="text-base pt-1"></p>
                </div> */}
            </div>     
        </main>
    )


}

export default BeerDetails;