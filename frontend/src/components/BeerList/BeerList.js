import React, { Component } from 'react';
import hopsDataService from '../../services/hops.service';
import { Link } from 'react-router-dom';

import './BeerList.css';

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
        return(
            
            <div>
                <h1>The Beer List</h1>
                <div className="h-72 flex overflow-x-auto">
                    {
                        beers.map((beer, index) => (
                            <Link className="w-screen h-72 p-1" to={`/BeerDetails/${beer.id}`}>
                                <img className="box-shadow max-w-none h-44 w-44" alt="Beer" src={beer.image_url}/>
                                    <h2 className="text-sm">{beer.name}</h2>
                                    <h4 className="text-xs">{beer.brewery} &#183; {beer.beer_type}</h4>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    }

}

export default BeerList;