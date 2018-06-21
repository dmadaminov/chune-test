import React from 'react'
import Navbar from '../Navbar'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchArticlesForMultipleArtists } from '../../store/articles'
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
import Waypoint from 'react-waypoint';
import Loading from '../shared/Loading';

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
    borderRadius: 4,
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

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderWaypoint = () => {
    if (!this.props.fetching) {
      return (
        <Waypoint onEnter={this._loadMoreItems} threshold={2.0} />
      );
    } else {
      return <Loading />
    }
  }

  _renderItems = (arrangedEntries) => {
    const {classes} = this.props;

    return arrangedEntries.map(article => {
        return (
            <li key={`${article.url}::${article.ID}`} className={classes.gridRow}>
                <ArticleCard article={article} key={article.ID}/>
            </li>
        )
    })
  }

  _loadMoreItems = () => {
    const props = this.props;
    props.fetchArticlesForMultipleArtists(props.artists.map(artist => artist.name), props.currentPage + 1);
  }

  componentDidMount() {
    const props = this.props;
    if (!props.articles.length) props.fetchArticlesForMultipleArtists(props.artists.map(artist => artist.name), props.currentPage);
  }

  render() {
    const { classes, artists, articles } = this.props;
    if (!artists.length) return <Redirect to="/artists"/>
    if (articles.length) {
        var arrangedEntries = articles ? [].concat.apply([], articles) : []

        return (
            <div>
                <Navbar value={2}/>
                <Paper className={classes.container}>
                    <div className={classes.root}>
                        <ul className={classes.gridList}>
                            {this._renderItems(arrangedEntries)}
                            {this._renderWaypoint()}
                        </ul>
                    </div>
                </Paper>
            </div>
        )
    } else {
        return (
            <div>
                <Row> <Navbar value={2}/> </Row>
                <div className="chune-feed-container">
                    <Row style={{marginBottom: 0}}><h2 className="chune-feed-title">News</h2></Row>
                    <Row>
                        <Col s={12}>
                            <ProgressBar className="chune-progressbar" color="cyan"/>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
  }
}

const mapState = store => ({
  articles: store.articles.articles,
  currentPage: store.articles.currentPage,
  fetching: store.articles.fetching,
  artists: store.followingArtists,
  userID: store.user
})
const mapDispatch = dispatch => ({
    fetchArticlesForMultipleArtists: (names, page) => dispatch(fetchArticlesForMultipleArtists(names, page)),
    addArtists: artists => dispatch(addArtists(artists))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(News))
