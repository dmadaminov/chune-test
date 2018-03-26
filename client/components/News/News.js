import React from 'react'
import Nav from '../Nav'
import { Row, Collapsible, CollapsibleItem, Modal, Button } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchArticles } from '../../store/articles'
import { database, auth } from '../../firebase'
import { addArtists } from '../../store/artists'
import { Redirect } from 'react-router-dom'

const News = props => {
    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.articles.length) Promise.all(props.artists.map(artist => props.fetchArticles(artist)))
    return (
        <div>
            <Row> <Nav /> </Row>
            <Row style={{ paddingLeft: 10 }}> <h2> News </h2> </Row>
            <Row style={{ paddingLeft: 10, paddingRight:10 }}>
                <Collapsible>
                    {
                        props.articles.length &&
                        props.artists.map(artist => (
                            <CollapsibleItem key={artist} header={artist}>
                                {
                                    props.articles.map(article => {
                                        if (article.artist === artist) return <p key={article.title}> <a href={article.url} target="_blank"> {article.title} </a> </p>
                                    })
                                }
                            </CollapsibleItem>
                        ))
                    }
                </Collapsible>
            </Row>
        </div>
    )
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