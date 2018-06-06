import React from 'react'
import { connect } from 'react-redux'
import Nav from '../Nav'
import { Row, Input, Button, Collection } from 'react-materialize'
import Follow from './Follow'
import Following from './Following'
import { database } from '../../firebase'
import { addArtists } from '../../store/artists'
import { auth } from '../../firebase'
import { Redirect } from 'react-router-dom'
import '../../assets/global.css'
import '../../assets/artists.css'

const Artists = () => {
    if (!auth.currentUser) return <Redirect to="/" />
    return (
    	<div>
	        <div><Nav /></div>
	        <div className="chune-feed-container">
	        	{/*<Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Artists</h2></Row>*/}
	            <Follow />
	            <Following />
	        </div>
        </div>
    )
}


const mapState = store => ({ artists: store.artists })
const mapDispatch = dispatch => ({ addArtists: artists => dispatch(addArtists(artists)) })

export default connect(mapState, mapDispatch)(Artists)