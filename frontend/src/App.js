// Styles
import './App.css';
import { Route, Switch } from 'react-router-dom';
//Components
import BeerList from './components/BeerList/BeerList'
import AddBeer from './components/AddBeer/AddBeer'
import BeerDetails from './components/BeerDetails/BeerDetails';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SearchBeer from './components/SearchBeer/SearchBeer';
import Loading from './components/Loading/Loading';
// import AddComment from './components/AddComment/AddComment';
import EditBeer from './components/EditBeer/EditBeer';
//Auth
import ProtectedRoute from "./auth/ProtectedRoute";
import { useAuth0 } from "@auth0/auth0-react";


const App = () => {
  
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }


  return (
      
      <div className="App">

        <Switch>

        <Route exact path={["/"]}>
          <LoginPage />
        </Route> 



        </Switch> 
          
      </div>

  );
}

export default App;
