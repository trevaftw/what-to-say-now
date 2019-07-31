import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//Pages
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
//sign-up survey pages
import signUp_1 from '../SignUp/signUp_1';
import signUp_3 from '../SignUp/signUp_3';
import signUp_4 from '../SignUp/signUp_4';
import signUp_5 from '../SignUp/signUp_5';
//post survey pages
import postSurvey_1 from '../PostSurvey/PostSurvey_1';
import postSurvey_2 from '../PostSurvey/PostSurvey_2';
import postSurvey_3 from "../PostSurvey/PostSurvey_3";


import './App.css';



class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />
          {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
          <Route exact path="/about" component={AboutPage} />
          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
          <ProtectedRoute exact path="/home" component={UserPage} />
          {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
          <ProtectedRoute exact path="/info" component={InfoPage} />
          <Route exact path="/signup1" component={signUp_1} />

          <Route exact path="/signup3" component={signUp_3} />

          <Route exact path="/signup4" component={signUp_4} />

          <Route exact path="/signup5" component={signUp_5} />

          {/* post survey routes */}
          <Route exact path="/postsurvey1" component={postSurvey_1} />
          <Route exact path="/postsurvey2" component={postSurvey_2} />
          <Route exact path="/postsurvey3" component={postSurvey_3} />

          {/* If none of the other routes matched, we will show a 404. */}
          <Route render={() => <h1>404</h1>} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default connect()(App);
