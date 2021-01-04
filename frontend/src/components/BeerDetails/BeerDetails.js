import React, { Component } from "react"
import hopsDataService from '../../services/hops.service';
import "./BeerDetails.css"


class BeerDetails extends Component {
    constructor(props) {
        super(props);
        this.getBeer = this.getBeer.bind(this)

        this.state = {
            currentBeer:{
                id: null,
                name: "",
                details: "",
                beer_type: "",
                brewery: "",
                alc_per: "",
                country_origin: "",
                container: "",
                image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/no_image_can.jpg",
            }
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.getBeer(this.props.match.params.id)
    }

    getBeer(id) {
        hopsDataService.get(id)
        .then(response => {
            this.setState({
                currentBeer: response.data
            });
            console.log(response.data)
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const currentBeer = this.state.currentBeer
        return (
            <main>
                <img className="beer-image" src={currentBeer.image_url} alt="Beer" />
                
                <div className="beer-header h-full container px-5">
                    <h1>{currentBeer.name}</h1>
                    <h2>{currentBeer.brewery}</h2>
                </div>

                <div className="container">
                    <h4>Type</h4>
                    <p>{currentBeer.beer_type}</p>
                    <h4>Details</h4>
                    <p>{currentBeer.details}</p>
                    <h4>Strength</h4>
                    <p>{currentBeer.alc_per}%</p>
                    <h4>Country</h4>
                    <p>{currentBeer.country_origin}</p>
                    <h4>Notes</h4>
                    <p></p>
                </div>     
            </main>
        )
    }

}

export default BeerDetails;