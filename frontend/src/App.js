import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import BeerList from './components/BeerList/BeerList'
import AddBeer from './components/AddBeer/AddBeer'
import BeerDetails from './components/BeerDetails/BeerDetails';

function App() {
  return (

      <div className="App">
        <header className="App-header">
        <ul>
          <li>
              <Link to={"/BeerList"}>
                Beer List
                </Link>
          </li>
          <li>
              <Link to={"/AddBeer"}>
                Add a Beer
                </Link>
          </li>
        </ul>
        </header>

      <div>
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
      </div>

  );
}

export default App;
