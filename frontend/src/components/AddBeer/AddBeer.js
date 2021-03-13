import React, {Component} from 'react';
import S3FileUpload from 'react-s3'
import hopsDataService from '../../services/hops.service';
import NavBar from '../NavBar/NavBar'

import addPhoto from '../../static/icons/addPhoto.svg';
import './AddBeer.css';
// import notesIcon from '../../static/icons/notes.svg';
import strengthIcon from '../../static/icons/strength.svg';
import typeIcon from '../../static/icons/type.svg';
import beerIcon from '../../static/icons/beer.svg';

// const creds = require('../../frontCredentials');

// const config = {
//     bucketName: creds.bucketName,
//     dirName: creds.dirName,
//     accessKeyId: creds.accessKey,
//     secretAccessKey: creds.secretKey,
//     region: 'eu-west-1',
// }

const config = {
    bucketName: "hops-bucket",
    dirName: "user-images",
    accessKey: process.env.REACT_APP_S3_ACCESS_KEY,
    secretKey: process.env.REACT_APP_S3_SECRET_KEY,
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
        console.log(e)
        console.log(config)
        // form[0] is the loaction of the image upload field in the form. 
        S3FileUpload.uploadFile(e.target.form[0].files[0], config)
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
            beer_type: this.state.beerType,
            brewery: this.state.brewery,
            alc_per: this.state.alcPer,
            country_origin: this.state.country,
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
            <div >
                {this.state.submitted ? (
                    <div>
                        <h4>Beer submitted successfully!</h4>
                        
                        <button  onClick={this.newBeer}>
                            Add
                        </button>
                    </div>
                ) : (

                    <div className="page">
                        <NavBar />
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form method="POST" onSubmit={this.saveBeer}>

                                <div className="relative">
                                    <img className="beer-image" src={this.state.image_url} alt="Beer Placeholder"></img>
                                    
                                    <div className="absolute top-44 flex w-full items-center justify-center">
                                        <label className="flex flex-col items-center tracking-wide uppercase cursor-pointer hover:bg-blue hover:text-white">
                                                <img src={addPhoto} alt="add icon"/>
                                            <input
                                                className="hidden"
                                                src={addPhoto}
                                                onChange={this.onChangeImageS3upload}
                                                type="file"
                                                id="input-image"
                                                name="input-Image"
                                                accept="image/*"
                                                capture="camera"
                                            />
                                        </label>
                                    </div>
                                </div> 

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="col-span-6">
                                            <img className="inline" alt="Beer Icon" src={beerIcon} />
                                            <label htmlFor="name" className="inline pl-1 text-xs font-bold tracking-tight">Beer Name</label>
                                            <input required type="text" name="name" id="name" autoComplete="Beer Name" className="mt-1 focus:solid-indigo-700 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                            value={this.state.name}
                                            onChange={this.onChangeName} />
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="col-span-6">
                                            <img className="inline" alt="Description Icon" src={beerIcon} />
                                            <label htmlFor="description" className="inline pl-1 text-xs font-bold tracking-tight">Description</label>
                                            <input type="text" name="description" id="description" autoComplete="description" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500"
                                            value={this.state.details}
                                            onChange={this.onChangeDetails} />
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">

                                        <div className="col-span-6">
                                            <img className="inline" alt="Type Icon" src={typeIcon} />
                                            <label htmlFor="beerType" className="inline pl-1 text-xs font-bold tracking-tight">Beer Type</label>
                                            <input type="text" name="beerType" id="beerType" autoComplete="Beer Type" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500" 
                                            value={this.state.beerType}
                                            onChange={this.onChangeBeerType} />
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="col-span-6">
                                            <img className="inline" alt="Brewery Icon" src={beerIcon} />
                                            <label htmlFor="brewery" className="inline pl-1 text-xs font-bold tracking-tight">Brewery</label>
                                            <input type="text" name="brewery" id="brewery" autoComplete="brewery" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500" 
                                            value={this.state.brewery}
                                            onChange={this.onChangeBrewery}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="col-span-6">
                                            <img className="inline" alt="Strength Icon" src={strengthIcon} />
                                            <label htmlFor="alcPer" className="inline pl-1 text-xs font-bold tracking-tight">Alcohol Percentage</label>
                                            <input type="text" name="alcPer" id="alcPer" autoComplete="alcPer" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="col-span-6">
                                            <img className="inline" alt="Country Icon" src={beerIcon} />
                                            <label htmlFor="country" className="inline pl-1 text-xs font-bold tracking-tight">Country</label>
                                            <input type="text" name="country" id="country" autoComplete="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500" 
                                            value={this.state.country}
                                            onChange={this.onChangeCountry}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="col-span-6">
                                            <img className="inline" alt="Container Icon" src={beerIcon} />
                                            <label htmlFor="container" className="inline pl-1 text-xs font-bold tracking-tight">Container</label>
                                            <input type="text" name="container" id="container" autoComplete="container" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-black-500" 
                                            value={this.state.container}
                                            onChange={this.onChangeContainer}/>
                                        </div>
                                    </div>
                                </div>

                                    <div className="flex justify-center h-16 w-full button-background content-center"> 
                                        <button type="submit" className="m-auto h-11 w-4/5 bg-black text-white block shadow-sm sm:text-sm border-black-500 " >
                                        Add Beer
                                        </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    )}
            </div>
        );
    }
}

export default AddBeer;