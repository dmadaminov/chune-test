import React from 'react'
import Nav from '../Nav'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchArticles } from '../../store/articles'
import { database, auth } from '../../firebase'
import { addArtists } from '../../store/artists'
import { Redirect } from 'react-router-dom'
import { timestampToDate } from '../../helpers/populateArticles'
import '../../assets/global.css'

const News = props => {
    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.articles.length) Promise.all(props.artists.map(artist => props.fetchArticles(artist)))
    if (props.articles.length) {
      return (
          <div>
          
            <Row> <Nav /> </Row>
            <div className="chune-feed-container">
              <Row style={{marginBottom: 0}}> <h2 className="chune-feed-title">News</h2></Row>
              <Row style={{paddingLeft: '10px', paddingRight: '10px'}}>

                  <Collapsible className="chune-collapsible">
                      {
                          props.artists.map((artist, index) => (
                             
                              <CollapsibleItem key={artist} header={[_.startCase(artist), <i class="material-icons">expand_less</i>]} style={{backgroundColor: "#eeeeee"}}>
                                
                                <Row style={{marginRight: '-10px', marginLeft: '-10px'}}>
                                  {
                                      props.articles.map(article => {
                                          if (article.artist === artist) {
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
                              </CollapsibleItem>
                          ))
                      }
                  </Collapsible>
              </Row>
            </div>
          </div>
      )
    } else {
      return (
        <div>
            <Row> <Nav /> </Row>
            <div className="chune-feed-container">
              <Row style={{marginBottom: 0}}><h2 className="chune-feed-title">News</h2></Row>
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

const mapState = store => ({
    articles: store.articles,
    artists: store.artists,
    userID: store.user
})
const mapDispatch = dispatch => ({
    fetchArticles: name => dispatch(fetchArticles(name)),
    addArtists: artists => dispatch(addArtists(artists))
})

export default connect(mapState, mapDispatch)(News)
