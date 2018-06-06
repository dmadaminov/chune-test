import React from 'react'
import { Button } from 'react-materialize'
import { auth } from '../../firebase'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../store/user'
import '../../assets/global.css'

const Logout = props => {
    const signOut = () => {
        auth
            .signOut()
            .then(() => props.logOut())
    }
    if (!props.user.length) return <Redirect to="/" />
    return <Button onClick={signOut}> Log Out </Button>
}

const mapDispatch = dispatch => ({ logOut: () => dispatch(logOut()) })
const mapState = store => ({ user: store.user })

export default connect(mapState, mapDispatch)(Logout)