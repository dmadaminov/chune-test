import React from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import Artists from './Artists/Artists'
import Nav from './Nav'
import { Redirect } from 'react-router-dom'
import { auth } from '../firebase'
import { addUser } from '../store/user';

const Landing = (props) => {
    
    auth.onAuthStateChanged(user => {
        if (user) props.addUser(user.uid)
    })

    if (!props.userID) return ( // Renders SignIn and SignUp if there isn't anyone logged in
        <div>
            <Auth />
        </div>
    )
    return <Redirect to="/artists"/> // Renders Home otherwise
}

const mapDispatch = dispatch => ({ addUser: userID => dispatch(addUser(userID)) })
const mapState = store => ({ userID: store.user })

export default connect(mapState, mapDispatch)(Landing)