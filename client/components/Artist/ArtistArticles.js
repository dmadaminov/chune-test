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
import { fetchArtist } from '../../store/currentArtist'
import SpotifyPlayer from '../Music/Player'
import '../../assets/global.css'
import '../../assets/landing.css'


const ArtistArticles = (props) => { 
		
 	const artist = props.artist

    if (props.recentEntries && props.recentEntries.length) {
      var recentEntriesFormatted = [].concat.apply([], props.recentEntries)
      recentEntriesFormatted = recentEntriesFormatted ? [].concat.apply([], recentEntriesFormatted) : []
        recentEntriesFormatted.sort((x,y) => {
            return y.date - x.date
        })
    return (
      <div>
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
    // fetchArtist: name => dispatch(fetchArtist(name)),
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
export default connect(mapState, mapDispatch)(ArtistArticles)