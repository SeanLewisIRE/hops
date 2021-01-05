import React, {Component} from 'react';
import S3FileUpload from 'react-s3'
import hopsDataService from '../../services/hops.service';

import addPhoto from '../../static/icons/addPhoto.svg';
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
        console.log(e)
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

                    
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        <form method="POST" onSubmit={this.saveBeer}>

                            <div>
                                <img className="beer-image" src={this.state.image_url} alt="Beer Placeholder"></img>
                                
                                <label for="beerImage">
                                    <img alt="Add beer" src={addPhoto} />

                                    <input
                                        className="hidden"
                                        src={addPhoto}
                                        onChange={this.onChangeImageS3upload}
                                        type="file"
                                        id="image"
                                        name="beerImage"
                                        accept="image/*"
                                        capture="camera"
                                    // required
                                    />
                                </label>

                            </div>
                            

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">
                                   
                                    <div class="col-span-6">
                                        <label for="name" class="block text-sm font-medium text-gray-700">Beer Name</label>
                                        <input type="text" name="name" id="name" autocomplete="Beer Name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={this.state.name}
                                        onChange={this.onChangeName} />
                                    </div>
                                </div>
                            </div>

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">

                                    <div class="col-span-6">
                                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                                        <input type="text" name="description" id="description" autocomplete="description" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        value={this.state.details}
                                        onChange={this.onChangeDetails} />
                                    </div>
                                </div>
                            </div>

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">

                                    <div class="col-span-6">
                                        <label for="beerType" class="block text-sm font-medium text-gray-700">Beer Type</label>
                                        <input type="text" name="beerType" id="beerType" autocomplete="Beer Type" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        value={this.state.beerType}
                                        onChange={this.onChangeBeerType} />
                                    </div>
                                </div>
                            </div>

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">

                                    <div class="col-span-6">
                                        <label for="brewery" class="block text-sm font-medium text-gray-700">Brewery</label>
                                        <input type="text" name="brewery" id="brewery" autocomplete="brewery" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        value={this.state.brewery}
                                        onChange={this.onChangeBrewery}/>
                                    </div>
                                </div>
                            </div>

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">

                                    <div class="col-span-6">
                                        <label for="alcPer" class="block text-sm font-medium text-gray-700">Alcohol Percentage</label>
                                            <input type="text" name="alcPer" id="alcPer" autocomplete="alcPer" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                </div>
                            </div>

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">

                                    <div class="col-span-6">
                                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                        <input type="text" name="country" id="country" autocomplete="country" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        value={this.state.country}
                                        onChange={this.onChangeCountry}/>
                                    </div>
                                </div>
                            </div>

                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">

                                    <div class="col-span-6">
                                        <label for="container" class="block text-sm font-medium text-gray-700">Container</label>
                                        <input type="text" name="container" id="container" autocomplete="container" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                        value={this.state.container}
                                        onChange={this.onChangeContainer}/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="mt-1 bg-black text-white block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" >
                                Add Beer
                            </button>
                        </form>
                    </div>
                    )}
            </div>
        );
    }
}

export default AddBeer;