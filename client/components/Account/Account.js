import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../Navbar'
import { Row, Input, Button, Collection } from 'react-materialize'
import { auth } from '../../firebase'
import { Redirect } from 'react-router-dom'
import ChangePass from './ChangePass'
import Logout from './Logout'
import '../../assets/global.css'

const Account = props => {
    if (!auth.currentUser) return <Redirect to="/" />
    return (
        <div>
          <Navbar value={false} />
	        <div className="chune-feed-container">
	            <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Account</h2></Row>
	            <div style={{paddingLeft: '10px', paddingRight: '10px'}}><ChangePass /> <Logout /></div>
	        </div>
        </div>
    )
}


const mapState = store => ({ artists: store.artists })
const mapDispatch = dispatch => ({ addArtists: artists => dispatch(addArtists(artists)) })

export default connect(mapState, mapDispatch)(Account)