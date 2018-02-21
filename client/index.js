import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './components/Index'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Index} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
