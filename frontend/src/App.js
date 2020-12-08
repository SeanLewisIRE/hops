import './App.css';
import { Router, Route, Switch, Link } from 'react-router-dom';

import BeerList from './components/BeerList/BeerList'
import AddBeer from './components/AddBeer/AddBeer'

function App() {
  return (
    <Router>
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
      </div>

      <div>
        <Switch>
          <Route path="/beerList">
            <BeerList />
          </Route>
          <Route path="/addBeer">
            <AddBeer />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
