// Styles
import './App.css';
import NavBar from './components/NavBar/NavBar'
import { Route, Switch } from 'react-router-dom';
//Components
import BeerList from './components/BeerList/BeerList'
import AddBeer from './components/AddBeer/AddBeer'
import BeerDetails from './components/BeerDetails/BeerDetails';

function App() {
  return (

      <div className="App">
        <NavBar/>

        <Switch>
          <Route path="/AddBeer">
            <AddBeer />
          </Route>
          <Route path="/BeerDetails/:id" component={BeerDetails}>

          </Route>
          <Route path="/">
            <BeerList />
          </Route>
        </Switch>

      </div>

  );
}

export default App;
