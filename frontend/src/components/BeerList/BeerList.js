import React, { Component } from 'react';
import hopsDataService from '../../services/hops.service';
import { Link } from 'react-router-dom';

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
                <h4>Beer List</h4>
                <ul>{
                    beers.map((beer, index) => (
                        <li key={beer.id.toString()}>
                            {beer.name}
                            <Link key={beer.id.toString()} to={`/BeerDetails/${beer.id}`}>
                                    Details
                                </Link>
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }

}

export default BeerList;