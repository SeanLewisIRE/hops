import React, { Component } from 'react';
import hopsDataService from '../../services/hops.service';

class BeerList extends Component {
    constructor(props) {
        super(props);
        this.getBeers = this.getBeers.bind(this);

        this.state = {
            beers: []
        }
    }

    componentDidMount() {
        this.getBeers();
    }

    getBeers() {
        hopsDataService.getAll()
            .then(response => {
                this.setState({
                    beers: response.data
                });
                console.log(response)
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {beers} = this.state
        console.log("hi")
        console.log(beers)
        return(
            <h4>Beer List</h4>
        //    {beers.map((beer, index) => (
        //             {beer.name}
        //     ))
        // }
        )
    }

}

export default BeerList;