import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route, Redirect, Switch,
  withRouter
} from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import mixpanel from 'mixpanel-browser';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';

import { store, persistor, history } from './store';
import {
  ArtistsConnect, ArtistConnect, HomeConnect, ForYouConnect,
  LandingConnect, TermsOfUse, PrivacyPolicy, FAQ,
  SignUpConnect, SignInConnect, ForgotPassword,
  Events, ArtistEvents, Loading, NavBarConnect,
  GuestNavbarConnect
} from './components';
import { ModalBlockConnect } from './components/blocks/LargeAudioPlayer/modalAudioPlayer';
import { topTracks } from './store/musicPlayer/topTracks/topTracks';

import './styles/reset.css';
import './styles/global.css';
import './styles/artists.css';

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
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        }
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
        playlist={topTracks}
        selectedRecordId={track}
        playPause={playMusic}
      />
    ) : null;
    let navbar = false;
    if (token) navbar = true;
    return (
      <div>
        {musicPlayer}
        { navbar ? <NavBarConnect /> : <GuestNavbarConnect />}
        <Switch>
          <PublicRoute exact path="/" token={token} component={LandingConnect} />
          <PublicRoute exact path="/signup" token={token} component={SignUpConnect} />
          <PublicRoute exact path="/login" token={token} component={SignInConnect} />
          <PublicRoute exact path="/reset-password" token={token} component={ForgotPassword} />
          <Route exact path="/terms-of-use" token={token} render={props => (<TermsOfUse token={token} {...props} />)} />
          <Route exact path="/privacy" token={token} render={props => (<PrivacyPolicy token={token} {...props} />)} />
          <Route exact path="/faq" token={token} render={props => (<FAQ token={token} {...props} />)} />
          <PrivateRoute exact path="/home" token={token} component={HomeConnect} />
          <PrivateRoute exact path="/for-you" token={token} component={ForYouConnect} />
          <PrivateRoute exact path="/artists" token={token} component={ArtistsConnect} />
          <PrivateRoute exact path="/artist/:artistName" token={token} component={ArtistConnect} />
          <PrivateRoute exact path="/events" token={token} component={Events} />
          <PrivateRoute exact path="/event/:artistName" user={token} component={ArtistEvents} />
          <Redirect to="/" />
        </Switch>
      </div>
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

const ChuneApp = withRouter(connect(mapStateToProps, null)(App));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ChuneApp />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
