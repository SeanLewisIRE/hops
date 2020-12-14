import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import BeerList from './components/BeerList/BeerList'
import AddBeer from './components/AddBeer/AddBeer'

function App() {
  return (

      <div className="App">
        <header className="App-header">
        <ul>
          <li>
              <Link to={"/beerList"} className="nav-link">
                Beer List
                </Link>
          </li>
          <li>
              <Link to={"/addBeer"} className="nav-link">
                Add a Beer
                </Link>
          </li>
        </ul>
        </header>

      <div>
        <Switch>
          <Route path="/addBeer">
            <AddBeer />
          </Route>
          <Route path="/addBeer">
            <AddBeer />
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
