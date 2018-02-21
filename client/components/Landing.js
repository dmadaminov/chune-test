import React from 'react'
import { connect } from 'react-redux'

import Auth from './Auth'
import Home from './Home'

const Landing = (props) => {
    if (!props.userID) return <Auth /> // Renders SignIn and SignUp if there isn't anyone logged in
    return <Home /> // Renders Home otherwise
}

const mapState = store => ({ userID: store.user })

export default connect(mapState, null)(Landing)