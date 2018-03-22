import React from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import { Row, Input, Button, Collection } from 'react-materialize'
import { auth } from '../../firebase'
import { Redirect } from 'react-router-dom'
import ChangePass from './ChangePass'
import Logout from './Logout'

const Account = props => {
    if (!auth.currentUser) return <Redirect to="/" />
    return (
        <div>
            <Nav />
            <Row style={{ paddingLeft: 10 }}> <h2> Account </h2> </Row>
            <Row style={{ paddingLeft: 10}}> <ChangePass /> <Logout />
            </Row>
        </div>
    )
}


const mapState = store => ({ artists: store.artists })
const mapDispatch = dispatch => ({ addArtists: artists => dispatch(addArtists(artists)) })

export default connect(mapState, mapDispatch)(Account)