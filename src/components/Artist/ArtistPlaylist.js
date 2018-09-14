import React from 'react'
import { connect } from 'react-redux'

import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'

import SpotifyPlayer from '../Music/Player'


const ArtistPlaylist = (props) => {
 const artist = props.artist

 if (props.currentArtist) {
  return (
      <div>
        <div className="chune-feed-container">
          <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Playlist for <span>{artist}</span></h2> </Row>
          {props.currentArtist && props.currentArtist.artistId && <Row style={{ paddingLeft: 10, paddingRight: 10 }}> <SpotifyPlayer artistId={props.currentArtist.artistId} /> </Row>}
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <div className="chune-feed-container">
          <Row style={{marginBottom: 0}}><h2 className="chune-feed-title">Playlist for {artist}</h2></Row>
          <Row>
            <Col s={12}>
              <ProgressBar className="chune-progressbar" color="cyan" />
            </Col>
          </Row>
        </div>
      </div>

    )
  }
}

const mapDispatch = dispatch => ({ 
   //  fetchArtist: name => dispatch(fetchArtist(name)),
   //  fetchArticles: name => dispatch(fetchArticles(name)),
	  // addUser: userID => dispatch(addUser(userID)),
	  // fetchRecentEntries: name => dispatch(fetchRecentEntries(name)),
   //  addArtists: artists => dispatch(addArtists(artists))
})
const mapState = store => ({ 
   currentArtist: store.currentArtist,
	 // userID: store.user,
  //  articles: store.articles,
 	//  recentEntries: store.recentEntries,
 	//  artists: store.artists
})

export default connect(mapState, mapDispatch)(ArtistPlaylist)