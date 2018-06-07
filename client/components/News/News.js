import React from 'react'
import Navbar from '../Navbar'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchArticles } from '../../store/articles'
import { database, auth } from '../../firebase'
import { addArtists } from '../../store/artists'
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';

import { timestampToDate } from '../../helpers/populateArticles'
import ArticleCard from './Article'
import '../../assets/global.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#fafafa",
  },
  gridList: {
    width: 716,
  },
  subheader: {
    width: '100%',
  },
  gridRow: {
    height: "auto",
    marginBottom: 24,
    width: '100%'
  },
  container: {
    backgroundColor: "#fafafa",
    width: '100%',
    paddingTop: 24,
  }
});

const News = props => {
    const { classes } = props;
    if (!props.artists.length) return <Redirect to="/artists"/>
    if (!props.articles.length) Promise.all(props.artists.map(artist => props.fetchArticles(artist)))
    if (props.articles.length) {
      var arrangedEntries = props.articles ? [].concat.apply([], props.articles) : []

      arrangedEntries.sort((x,y) => {
          return y.date - x.date
      })
      return (
          <div>
            <Navbar value={2} />
            <Paper className={classes.container}>
              <div className={classes.root}>
                <GridList cellHeight={254} className={classes.gridList} cols={1}>
                  {
                    arrangedEntries.map(article => {
                      return (
                        <GridListTile key={article.ID} cols={1} className={classes.gridRow}>
                          <ArticleCard article={article} key={article.ID}/>
                        </GridListTile>
                      )
                    })
                  }
                </GridList>
              </div>
            </Paper></div>
      )
    } else {
      return (
        <div>
          <Row> <Navbar value={2} /> </Row>
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

export default withStyles(styles)(connect(mapState, mapDispatch)(News))
