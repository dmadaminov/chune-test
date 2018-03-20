import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import Artists from './components/Artists/Artists'
import Videos from './components/Videos/Videos'
import News from './components/News/News'
import Landing from './components/Landing'

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/artists' component={Artists} />
          <Route exact path ='/videos' component={Videos} />
          <Route exact path = '/news' component ={News} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
)
