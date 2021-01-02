import React, {Component} from 'react';
import S3FileUpload from 'react-s3'
import hopsDataService from '../../services/hops.service';

import './AddBeer.css';

const creds = require('../../frontCredentials');

const config = {
    bucketName: creds.bucketName,
    dirName: creds.dirName,
    accessKeyId: creds.accessKey,
    secretAccessKey: creds.secretKey,
    region: 'eu-west-1',
}

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
        this.onChangeImageS3upload = this.onChangeImageS3upload.bind(this);
        this.saveBeer = this.saveBeer.bind(this);
        this.newBeer = this.newBeer.bind(this);
        
        this.state = {
            id: null,
            name: "",
            details: "",
            beerType: "",
            brewery: "",
            alcPer: "",
            country: "",
            container: "",
            image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/no_image_can.jpg",

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

    onChangeImageS3upload(e) {
        this.setState({
            image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/beer_loading.gif"
        })
        S3FileUpload.uploadFile(e.target.form[7].files[0], config)
            .then((upload) => {
                console.log(upload.location)
                this.setState({
                    image_url: upload.location,
                })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    saveBeer(e) {
        e.preventDefault();

        let data = {
            name: this.state.name,
            details: this.state.details,
            beerType: this.state.beerType,
            brewery: this.state.brewery,
            alcPer: this.state.alcPer,
            country: this.state.country,
            container: this.state.container,
            image_url: this.state.image_url
        };

        const postPromise = new Promise((resolve, reject) => {
           hopsDataService.create(data)
           resolve()
        })
        postPromise.then(() => {            
            this.setState({
                submitted: true
            });
        })
        .catch((err) => {
            console.log(err)
        })
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
            image_url: "https://hops-bucket.s3-eu-west-1.amazonaws.com/static_images/no_image_can.jpg",

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
                    
                    <form onSubmit={this.saveBeer}>
                        <div className="form-group">
                            <label htmlFor="name">Beer Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                
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
                                
                                value={this.state.container}
                                onChange={this.onChangeContainer}
                                name="container"
                            />
                        </div>

                        <div>
                            <img className="beerImage" src={this.state.image_url} alt="Beer Placeholder"></img>
                            <label htmlFor="image">Image</label>
                            <input
                                onChange={this.onChangeImageS3upload}
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                accept="image/*" 
                                capture="camera"
                                // required
                            />
                        </div>

                        <button 
                        type="submit"
                        >
                            Submit
                        </button>
                    </form>
                    )}
            </div>
        );
    }
}

export default AddBeer;