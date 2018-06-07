import React from 'react'
import { connect } from 'react-redux'
import Auth from '../Auth'
import Artists from '../Artists/Artists'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { fetchRecentEntries } from '../../store/recentEntries'
import { Redirect } from 'react-router-dom'
import { database, auth } from '../../firebase'
import { addUser } from '../../store/user';
import { fetchArticles } from '../../store/articles'
import { timestampToDate } from '../../helpers/populateArticles'
import { addArtists } from '../../store/artists'
import { fetchArtist } from '../../store/currentArtist'
import SpotifyPlayer from '../Music/Player'
import ArtistPlaylist from './ArtistPlaylist'
import ArtistArticles from './ArtistArticles'
import '../../assets/global.css'
import '../../assets/landing.css'

const Artist = (props) => {
  var qParams = props.location.search.split('?')[1].split('&')
  var qParamsFormatted = {}
  for (var i=0; i< qParams.length; i++) {
    qParams[i] = qParams[i].split('=')
    qParamsFormatted[qParams[i][0]] = decodeURI(qParams[i][1])
  }
  var artist = qParamsFormatted.n
  auth.onAuthStateChanged(user => {
      if (user) props.addUser(user.uid)
  })

  if (!props.userID) {
    return ( // Renders SignIn and SignUp if there isn't anyone logged in
        <div>
            <Auth />
        </div>
    )
  } else if(!props.currentArtist) {
    props.fetchArtist(artist)
  } else if (!props.artists.length) {
      const userId = auth.currentUser.uid
      const userRef = database.ref(`users/${userId}/artists`)
      userRef.on('value', snapshot => {
          if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
      })
    } else if (!props.recentEntries.length) {
      if(props.artists.indexOf(artist) >= 0){
        props.fetchRecentEntries(artist)
      } else {
        return (
          <Redirect to="/Artists" />
        )
      }
    } 
      return (
          <div>
            <ArtistPlaylist artist={artist} />
            <ArtistArticles artist={artist} />
          </div>
      )
    
   
}


const mapDispatch = dispatch => ({ 
    fetchArtist: name => dispatch(fetchArtist(name)),
    fetchArticles: name => dispatch(fetchArticles(name)),
	  addUser: userID => dispatch(addUser(userID)),
	  fetchRecentEntries: name => dispatch(fetchRecentEntries(name)),
    addArtists: artists => dispatch(addArtists(artists))
})
const mapState = store => ({ 
   currentArtist: store.currentArtist,
	 userID: store.user,
   articles: store.articles,
 	 recentEntries: store.recentEntries,
 	 artists: store.artists
})

export default connect(mapState, mapDispatch)(Artist)