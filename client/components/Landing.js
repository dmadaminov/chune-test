import React from 'react'
import { connect } from 'react-redux'
import Auth from './Auth'
import Artists from './Artists/Artists'
import Nav from './Nav'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { fetchRecentEntries, fetchAllRecentEntries} from '../store/recentEntries'
import { Redirect } from 'react-router-dom'
import { database, auth } from '../firebase'
import { addUser } from '../store/user';
import { fetchArticles } from '../store/articles'
import { timestampToDate } from '../helpers/populateArticles'
import { addArtists } from '../store/artists'
import '../assets/global.css'
import '../assets/landing.css'

const Landing = (props) => {
    
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

    // if (!props.artists.length) return <Redirect to="/artists"/>
    // if (!props.recentEntries.length) Promise.all(props.artists.map(artist => props.fetchRecentEntries(artist)))
    if (props.artists.length && !props.recentEntries.length) { 
      props.fetchAllRecentEntries(props.artists)
    }
    if (props.recentEntries.length) {
      // var recentEntriesFormatted = [].concat.apply([], props.recentEntries)
    	var recentEntriesFormatted = props.recentEntries
    	/*recentEntriesFormatted = recentEntriesFormatted ? [].concat.apply([], recentEntriesFormatted) : []
        recentEntriesFormatted.sort((x,y) => {
            return y.date - x.date
        })*/
    return (
    	<div>
              <Row> <Nav /> </Row>
              <div className="chune-feed-container">
              	    <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title"> Recent Entries </h2> </Row>
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
                                        <div className="chune-card-content-inner">
                                        	<span style={{fontSize:'12px', lineHeight: 1.3}}>via {article.source}{formattedDate} -- <a href={"/Artist?n="+encodeURI(article.artist)} style={{textTransform: 'capitalize'}} title={"You see this post because you follow "+article.artist}>{article.artist}</a></span>
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
        	<Row style={{marginBottom: 0}}><h2 className="chune-feed-title">Recent Entries</h2></Row>
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
    addArtists: artists => dispatch(addArtists(artists)),
    fetchArticles: name => dispatch(fetchArticles(name)),
	addUser: userID => dispatch(addUser(userID)),
	fetchAllRecentEntries: artists => dispatch(fetchAllRecentEntries(artists))
})
const mapState = store => ({ 
	userID: store.user,
    articles: store.articles,
 	recentEntries: store.recentEntries,
 	artists: store.artists
})

export default connect(mapState, mapDispatch)(Landing)


