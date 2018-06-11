import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import { createMuiTheme } from '@material-ui/core/styles';
import mixpanel from 'mixpanel-browser';
import MixpanelProvider from 'react-mixpanel';

import Artists from './components/Artists/Artists'
import Artist from './components/Artist/Artist'
import Videos from './components/Videos/Videos'
import News from './components/News/News'
import Landing from './components/Landing'
import Music from './components/Music/Music'
import Events from './components/Events/Events'
import Account from './components/Account/Account'

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

ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/artists' component={Artists}/>
                        <Route path='/artist' component={Artist}/>
                        <Route exact path='/videos' component={Videos}/>
                        <Route exact path='/news' component={News}/>
                        <Route exact path='/events' component={Events}/>
                        <Route exact path='/music' component={Music}/>
                        <Route exact path='/account' component={Account}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>,
    document.getElementById('app')
)
