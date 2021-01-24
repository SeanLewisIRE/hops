// Styles
import './App.css';
import NavBar from './components/NavBar/NavBar'
import { Route, Switch } from 'react-router-dom';
//Components
import BeerList from './components/BeerList/BeerList'
import AddBeer from './components/AddBeer/AddBeer'
import BeerDetails from './components/BeerDetails/BeerDetails';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage'

function App() {
  return (

      <div className="App">
        <Switch>
          
          <Route path="/beerlist">
            <NavBar />
            <BeerList />
          </Route>

          <Route path="/addbeer">
            <NavBar />
            <AddBeer />
          </Route>

          <Route 
            path="/beerdetails/:id" 
            render={(props) => 
              <div>
              <NavBar/>
              <BeerDetails {...props}/>
              </div>
            }
          />

        <Route path="/profile">
          <NavBar />
          <ProfilePage />
        </Route>

          <Route path={["/", "/login"]}>
            <LoginPage />
          </Route>
        </Switch>

      </div>

  );
}

export default App;
