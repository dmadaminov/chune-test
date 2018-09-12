import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, BrowserRouter, Redirect,
  Switch
} from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import mixpanel from 'mixpanel-browser';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { store } from './store';
import {
  Artists, Artist, HomeConnect, ForYou,
  LandingConnect, TermsOfUse, PrivacyPolicy, FAQ,
  AboutUs, SignUpConnect, SignInConnect, ForgotPassword,
  Events, ArtistEvents, Loading, NavBarConnect,
  GuestNavbarConnect
} from './components';
import { ModalBlockConnect } from './components/blocks/LargeAudioPlayer/modalAudioPlayer';

mixpanel.init('34f4d0ce6ee0830af62b12a7d0e53e1f');

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

function PrivateRoute({ component: Component, token, ...rest }) {
  console.log(token, 'token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        }
        console.log(props, 'props index.jsx');
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }
      }
    />
  );
}

function PublicRoute({ component: Component, token, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (!token
        ? <Component {...props} />
        : <Redirect to="/home" />)}
    />
  );
}

class App extends React.Component {
  state = {
    loading: false,
  }

  render() {
    const { loading } = this.state;
    const {
      token, modal, playlist,
      track, playMusic
    } = this.props;
    if (loading) {
      return <Loading />;
    }
    const musicPlayer = modal ? (
      <ModalBlockConnect
        playlist={playlist}
        selectedRecordId={track}
        playPause={playMusic}
      />
    ) : null;
    let navbar = false;
    if (token) navbar = true;
    return (
      <BrowserRouter>
        <div>
          {musicPlayer}
          <Route>
            { navbar ? <NavBarConnect /> : <GuestNavbarConnect />}
          </Route>
          <Switch>
            <PublicRoute exact path="/" token={token} component={LandingConnect} />
            <PublicRoute exact path="/signup" token={token} component={SignUpConnect} />
            <PublicRoute exact path="/login" token={token} component={SignInConnect} />
            <PublicRoute exact path="/reset-password" token={token} component={ForgotPassword} />
            <Route exact path="/terms-of-use" token={token} render={props => (<TermsOfUse token={token} {...props} />)} />
            <Route exact path="/privacy" token={token} render={props => (<PrivacyPolicy token={token} {...props} />)} />
            <Route exact path="/faq" token={token} render={props => (<FAQ token={token} {...props} />)} />
            <Route exact path="/about" token={token} render={props => (<AboutUs token={token} {...props} />)} />
            <PrivateRoute exact path="/home" token={token} component={HomeConnect} />
            <PrivateRoute exact path="/for-you" token={token} component={ForYou} />
            <PrivateRoute exact path="/artists" token={token} component={Artists} />
            <PrivateRoute exact path="/artist/:artistName" token={token} component={Artist} />
            <PrivateRoute exact path="/events" token={token} component={Events} />
            <PrivateRoute exact path="/events/:artistName" user={token} component={ArtistEvents} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  token: state.dataAuth.token,
  modal: state.dataMusicPlayer.modal,
  playlist: state.dataMusicPlayer.playlist,
  track: state.dataMusicPlayer.track,
  playMusic: state.dataMusicPlayer.playMusic
});

const ChuneApp = connect(mapStateToProps, null)(App);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <ChuneApp />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
