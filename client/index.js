import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import { createMuiTheme } from '@material-ui/core/styles';
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from 'react-mixpanel';

import Artists from './components/Artists/Artists'
import Artist from './components/Artist/Artist'
import Videos from './components/Videos/Videos'
import News from './components/News/News'
import Landing from './components/Landing'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import Music from './components/Music/Music'
import Events from './components/Events/Events'
import ArtistEvents from './components/Events/ArtistEvents'
import Account from './components/Account/Account'
import Loading from './components/shared/Loading'
import { auth, database } from './firebase'
import { connect } from 'react-redux'
import { addUser } from './store/user'
import { addArtists } from './store/artists'

mixpanel.init("34f4d0ce6ee0830af62b12a7d0e53e1f");

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#552e89',
      },
    },
    status: {
      danger: 'orange',
    },
});

function PrivateRoute ({component: Component, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => user
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => !user
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  )
}

class App extends Component {
  state = {
    loading: true,
  }
  componentDidMount () {
    const props = this.props;
    this.removeListener = auth.onAuthStateChanged((user) => {
      console.log("Auth state changed!", user);
      if (user) { 
        props.addUser(user.uid);
        const userId = user.uid
        const userRef = database.ref(`users/${userId}/artists`)
        userRef.on('value', snapshot => {
          if(snapshot.val()) {
            if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
          }
        })
      }
      this.setState({
        loading: false,
      });
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    if(this.state.loading) {
      return <Loading />
    }

    return (
      <BrowserRouter>
        <Switch>
            <PrivateRoute exact path='/' user={this.props.user} component={Landing}/>
            <PrivateRoute exact path='/artists' user={this.props.user} component={Artists}/>
            <PrivateRoute path='/artist' user={this.props.user} component={Artist}/>
            <PrivateRoute exact path='/videos' user={this.props.user} component={Videos}/>
            <PrivateRoute exact path='/news' user={this.props.user} component={News}/>
            <PrivateRoute exact path='/events/:artistName' user={this.props.user} component={ArtistEvents}/>
            <PrivateRoute exact path='/events' user={this.props.user} component={Events}/>
            <PrivateRoute exact path='/music' user={this.props.user} component={Music}/>
            <PrivateRoute exact path='/account'user={this.props.user} component={Account}/>
            <PublicRoute exact path='/signup' user={this.props.user} component={SignUp}/>
            <PublicRoute exact path='/login' user={this.props.user} component={SignIn}/>
            <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapState = state => ({
  ...state
});

const mapDispatch = dispatch => ({ 
    addUser: userId => dispatch(addUser(userId)),
    addArtists: artists => dispatch(addArtists(artists)),
})

const ChuneApp = connect(mapState, mapDispatch)(App);


ReactDOM.render(
  <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ChuneApp />
      </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
