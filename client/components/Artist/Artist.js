import React from 'react'
import { connect } from 'react-redux'
import Auth from '../Auth'
import Artists from '../Artists/Artists'
import Nav from '../Nav'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { fetchRecentEntries } from '../../store/recentEntries'
import { Redirect } from 'react-router-dom'
import { database, auth } from '../../firebase'
import { addUser } from '../../store/user';
import { fetchArticles } from '../../store/articles'
import { timestampToDate } from '../../helpers/populateArticles'
import { addArtists } from '../../store/artists'
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

    if (!props.userID) return ( // Renders SignIn and SignUp if there isn't anyone logged in
        <div>
            <Auth />
        </div>
    )

    if (!props.artists.length) {
	    const userId = auth.currentUser.uid
	    const userRef = database.ref(`users/${userId}/artists`)
	    userRef.on('value', snapshot => {
	        if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
	    })
    }
    if (!props.recentEntries.length) {
      if(props.artists.length) {
        if(props.artists.indexOf(artist) >= 0){
          props.fetchRecentEntries(artist)
        } else {
          return (
            <Redirect to="/Artists" />
          )
        }
      }
    }
    if (props.recentEntries.length) {
    	var recentEntriesFormatted = [].concat.apply([], props.recentEntries)
    	recentEntriesFormatted = recentEntriesFormatted ? [].concat.apply([], recentEntriesFormatted) : []
        recentEntriesFormatted.sort((x,y) => {
            return y.date - x.date
        })
    return (
    	<div>
              <Row> <Nav /> </Row>
              <div className="chune-feed-container">
              	    <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">Entries for <span>{artist}</span></h2> </Row>
	                <Row>
	              		{
                          recentEntriesFormatted.map(article => {
                              if (article) {
                              	let formattedDate = article.date ? ' -- '+timestampToDate(article.date) : ''

                                return (
                                <Col s={12}>

                                  <Card className='chune-card' key={article.ID}>
                                        <div className="chune-card-image" style={
                                            {  
                                              backgroundImage: 'url("'+article.image+'")'
                                            }
                                          }></div>
                                        <div className="chune-card-content-inner"><span style={{fontSize:'12px', lineHeight: 1.3}}>via {article.source}{formattedDate} -- <a href={"/artists?f="+article.artist} style={{textTransform: 'capitalize'}} title={"You see this post because you follow "+article.artist}>{article.artist}</a></span>
                                        <h4 style={{fontSize: '18px', lineHeight: 1.3, marginTop: '10px', marginBottom: '10px'}}>{article.title}</h4>
                                        <a href={article.url} target="_blank" className="chune-card-link">View Story</a>

                                        </div>
                                  </Card>
                                </Col>
                              )
                            }
                          })
	                   }
	              </Row>
              </div>
          </div>


    )


} else {
  return (
    <div>
        <Row> <Nav /> </Row>
        <div className="chune-feed-container">
        	<Row style={{marginBottom: 0}}><h2 className="chune-feed-title">Entries for {artist}</h2></Row>
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
    fetchArticles: name => dispatch(fetchArticles(name)),
	addUser: userID => dispatch(addUser(userID)),
	fetchRecentEntries: name => dispatch(fetchRecentEntries(name)),
    addArtists: artists => dispatch(addArtists(artists))
})
const mapState = store => ({ 
	userID: store.user,
    articles: store.articles,
 	recentEntries: store.recentEntries,
 	artists: store.artists
})

export default connect(mapState, mapDispatch)(Artist)


