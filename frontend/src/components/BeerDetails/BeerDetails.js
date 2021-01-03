import React, { Component } from "react"
import hopsDataService from '../../services/hops.service';

class BeerDetails extends Component {
    constructor(props) {
        super(props);
        this.getBeer = this.getBeer.bind(this)

        this.state = {
            currentBeer:{
                id: null,
                name: "",
                details: "",
                beerType: "",
                brewery: "",
                alcPer: "",
                country: "",
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
            <div>
            <h1>Beer Details</h1>
            <h1>{currentBeer.name}</h1>
            </div>
        )
    }

}

export default BeerDetails;