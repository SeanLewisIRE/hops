import React, { Component } from 'react';
import hopsDataService from '../../services/hops.service';
import { Link } from 'react-router-dom';

import './BeerList.css';
import randomIcon from '../../static/icons/randomIcon.png'
import addIcon from '../../static/icons/addIcon.svg'

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
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {beers} = this.state
        

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

        return(
            <div>
                <main className="flex flex-col justify-between">
                    {/* Beer List - Copy as required for others */}
                    <div> 
                        <h1>The Beer List</h1>
                        <div className="flex flex-grow overflow-x-auto">
                            {
                                console.log(beers)

                            }
                        </div>
                    </div>                        
                </main>

                <div className="flex items-center justify-center sticky">
                    <Link to={`/AddBeer`}>
                        <img alt="Add Beer Icon" src={addIcon} />
                    </Link>
                    <Link to={`/BeerDetails/${randomBeer()}`}>
                        <img alt="Select Random Beer Icon" src={randomIcon} />
                    </Link>
                </div>
            </div>
        )
    }

}

export default BeerList;