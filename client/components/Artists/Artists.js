import React from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import Navbar from '../Navbar'
import { Row, Input, Button, Collection } from 'react-materialize'
import Follow from './Follow'
import Following from './Following'
import { database } from '../../firebase'
import { addArtists } from '../../store/artists'
import { auth } from '../../firebase'
import { Redirect } from 'react-router-dom'

const Artists = () => {
    if (!auth.currentUser) return <Redirect to="/" />
    return (
        <div>
            <Navbar value={0}/>
            <Row style={{ paddingLeft: 10 }}> <h2> Artists </h2> </Row>
            <Follow />
            <Following />
        </div>
    )
}


const mapState = store => ({ artists: store.artists })
const mapDispatch = dispatch => ({ addArtists: artists => dispatch(addArtists(artists)) })

export default connect(mapState, mapDispatch)(Artists)
