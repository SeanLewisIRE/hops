import React, {Component} from 'react';
import hopsDataService from '../../services/hops.service';

class AddBeer extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDetails = this.onChangeDetails.bind(this);
        this.onChangeBeerType = this.onChangeBeerType.bind(this);
        this.onChangeBrewery = this.onChangeBrewery.bind(this);
        this.onChangeAlcPer = this.onChangeAlcPer.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeContainer = this.onChangeContainer.bind(this);

        this.state = {
            id: null,
            name: "",
            details: "",
            beerType: "",
            brewery: "",
            alcPer: "",
            country: "",
            container: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    
    onChangeDetails(e) {
        this.setState({
            details: e.target.value
        });
    }

    onChangeBeerType(e) {
        this.setState({
            beerType: e.target.value
        });
    }

    onChangeBrewery(e) {
        this.setState({
            brewery: e.target.value
        });
    }

    onChangeAlcPer(e) {
        this.setState({
            alcPer: e.target.value
        });
    }

    onChangeCountry(e) {
        this.setState({
            country: e.target.value
        });
    }

    onChangeContainer(e) {
        this.setState({
            container: e.target.value
        });
    }

    saveBeer() {
        let data = {
            name: this.state.name,
            details: this.state.details,
            beerType: this.state.beerType,
            brewery: this.state.brewery,
            alcPer: this.state.alcPer,
            country: this.state.country,
            container: this.state.container
        };

        hopsDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    details: response.data.details,
                    beerType: response.data.beerType,
                    brewery: response.data.brewery,
                    alcPer: response.data.alcPer,
                    country: response.data.country,
                    container: response.data.container,

                    submitted: true
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            });
    }

    newBeer() {
        this.setState({
            id: null,
            name: "",
            details: "",
            beerType: "",
            brewery: "",
            alcPer: "",
            country: "",
            container: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Beer submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newBeer}>
                            Add
            </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Beer Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    name="name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Details</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="details"
                                    required
                                    value={this.state.details}
                                    onChange={this.onChangeDetails}
                                    name="details"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Beer Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="beerType"
                                    required
                                    value={this.state.beerType}
                                    onChange={this.onChangeBeerType}
                                    name="beerType"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Brewery</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="brewery"
                                    required
                                    value={this.state.brewery}
                                    onChange={this.onChangeBrewery}
                                    name="brewery"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Alcohol Percentage</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="alcPer"
                                    required
                                    value={this.state.alcPer}
                                    onChange={this.onChangeAlcPer}
                                    name="alcPer"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="country"
                                    required
                                    value={this.state.country}
                                    onChange={this.onChangeCountry}
                                    name="country"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Container</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="container"
                                    required
                                    value={this.state.container}
                                    onChange={this.onChangeContainer}
                                    name="container"
                                />
                            </div>

                            <button onClick={this.saveTutorial} className="btn btn-success">
                                Submit
            </button>
                        </div>
                    )}
            </div>
        );
    }
}

export default AddBeer;