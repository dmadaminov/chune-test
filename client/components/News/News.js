import React from 'react'
import _ from 'lodash'
import { Row, Collapsible, CollapsibleItem, Modal, Button, ProgressBar, Col, Card, CardTitle } from 'react-materialize'
import { connect } from 'react-redux'
import { fetchArticlesForMultipleArtists, clearArticles } from '../../store/articles'
import { database, auth } from '../../firebase'
import { addArtists } from '../../store/artists'
import { Redirect } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Paper from '@material-ui/core/Paper';
import GridListTile from '@material-ui/core/GridListTile';

import { timestampToDate } from '../../helpers/populateArticles'
import ArticleCard from './Article'
import Waypoint from 'react-waypoint';
import Loading from '../shared/Loading';
import EmptyList from '../shared/EmptyList';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#fafafa",
    '@media (max-width: 1023px)': {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  container: {
    backgroundColor: "#fafafa",
    width: '100%',
    paddingTop: 24,
    '@media (max-width: 1023px)': {
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
    }
  },
  gridList: {
    width: 716,
    borderRadius: 4,
    '@media (max-width: 1023px)': {
      width: '100%',
    }
  },
  subheader: {
    width: '100%',
  },
  gridRow: {
    height: "auto",
    marginBottom: 24,
    width: '100%'
  },
  noarticles: {
    width: 716,
    height: 300,
    margin: '178px auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class News extends React.Component {

  constructor(props) {
    super(props);
  }

  _renderWaypoint = () => {
    if (!this.props.fetching && !this.props.endOfList) {
      return (
        <Waypoint onEnter={this._loadMoreItems} threshold={2.0} />
      );
    } else {
      return this.props.endOfList ? null : <Loading />;
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
    console.log("Component mounting");
    props.clearArticles();
    props.fetchArticlesForMultipleArtists(props.artists.map(artist => artist.name), props.currentPage);
  }

  render() {
    const { classes, artists, articles, initialLoading } = this.props;
    if (!artists.length) return <Redirect to="/artists"/>
    if (!initialLoading) {
      if(articles.length) {
        var arrangedEntries = articles ? [].concat.apply([], articles) : []

        return (
            <div>
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
            <EmptyList 
              messageOne={"Sorry, no recent articles about your artists."}
              messageTwo={"Search to find and follow another artists."} />
          </div>
        )
      }
        
    } else {
        return (
            <div>
              <Loading />
            </div>
        )
    }
  }
}

const mapState = store => ({
  articles: store.articles.articles,
  currentPage: store.articles.currentPage,
  fetching: store.articles.fetching,
  endOfList: store.articles.endOfList,
  artists: store.followingArtists.artists,
  initialLoading: store.articles.initialLoading,
  userID: store.user.uid,
})
const mapDispatch = dispatch => ({
    fetchArticlesForMultipleArtists: (names, page) => dispatch(fetchArticlesForMultipleArtists(names, page)),
    addArtists: artists => dispatch(addArtists(artists)),
    clearArticles: () => dispatch(clearArticles()),
})

export default withStyles(styles)(withRouter(connect(mapState, mapDispatch)(News)));
