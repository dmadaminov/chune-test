import React from 'react'
import find from 'lodash/find'
import { connect } from 'react-redux'
import { database, auth } from '../../firebase'
import { Redirect } from 'react-router-dom'
import Navbar from '../Navbar'
import { fetchRecentEntriesForCurrentArtist } from '../../store/currentArtist'
import { addUser } from '../../store/user';
import { fetchArticles } from '../../store/articles'
import { fetchCurrentArtist } from '../../store/currentArtist'
import { addArtists, deleteArtist } from '../../store/artists'
import { timestampToDate } from '../../helpers/populateArticles'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select';

import Loading from '../shared/Loading'
import CardList from '../shared/CardList'
import NoMedia from '../shared/NoMedia'

import Paper from '@material-ui/core/Paper';

import VideoCard from '../Videos/Video'
import ArticleCard from '../News/Article'
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: 716,
    margin: '39px auto',
  },
  subMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
    height: 38,
  },
  menuActionsContainer: {
    display: 'flex',
    width: 223,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 27,
  },
  formControl: {
    width: 128,
  },
  sInput: {
    paddingTop: 0,
    height: 36,
    '&:focus': {
      backgroundColor: '#eceff1',
    }
  },
  mediaSelect: {
    height: 36,
  },
  recommendedArtistHeading: {
    width: 244,
    height: 28,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.3,
    color: "#000000",
  },
  followButton: {
    width: 104,
    height: 36,
    backgroundColor: 'rgba(98, 2, 238, 0)',
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#552e89",
    '&:hover': {
      backgroundColor: 'rgba(85, 46, 137, 0.75)',
    },
    '&:focus': {
      backgroundColor: "#552e89",
    },
  },
  unfollowButton: {
    width: 104,
    height: 36,
    backgroundColor: 'rgba(98, 2, 238, 0)',
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: 500,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: "center",
    color: "#6200ee",
    '&:hover': {
      backgroundColor: 'rgba(98, 2, 238, 0)',
    },
    '&:focus': {
      backgroundColor: 'rgba(98, 2, 238, 0)',

    },
  },
  cardlist: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',  },
  gridList: {
    width: 716,
    borderRadius: 4,
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

class Artist extends React.Component {

  constructor(props) {
    super(props);
    // this.props.match.params.artistName = this.getArtistNameFromQueryString();
    this.state = {
      filter: "all",
    };
  }

  artistAlreadyFollowed = () => {
    return find(this.props.artists, (artist) => { return artist.name == this.props.match.params.artistName });
  }

  handleChange = (event, index, value) => {
    this.setState({ filter: event.target.value });
  }

  filterEntries = (entries, filter) => {
    if(filter == 'articles') {
      return entries.filter(entry => !entry.isVideo );
    } else if(filter == 'videos') {
      return entries.filter(entry => entry.isVideo );
    } else if(filter == 'events') {
      return [];
    }
  }

  unfollowArtist = () => {
    const ref = database.ref(`users/${this.props.userId}/artists`)
    ref.child(this.props.match.params.artistName).remove()
    this.props.deleteArtist(this.props.match.params.artistName);
  }

  followArtist = () => {
    database.ref(`users/${this.props.userId}/artists`).update({[this.props.match.params.artistName]: true});
    addArtists({...this.props.artists.concat(), [this.props.match.params.artistName]: true});
  }

  _loadMoreItems = () => {
    const props = this.props;
    props.fetchRecentEntriesForCurrentArtist(this.props.match.params.artistName, props.currentPage + 1);
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

  _renderItems = (recentEntries) => {
    const { classes  } = this.props;
    if(recentEntries.length == 0) {
      return <NoMedia />
    }
    return (
      <div className={classes.cardlists}>
        <ul className={classes.gridList}>
          {
            recentEntries.map(item => {
              return (
                <li className={classes.gridRow} key={`${item.url}::${item.ID}`} >
                  {
                    (item.isVideo)
                    ? <VideoCard video={item} autoplay={false}/>
                    : <ArticleCard article={item} />
                  }
                </li>
              )
            })
          }
          {this._renderWaypoint()}
        </ul>
      </div>
    )
  }

  componentDidMount() {
    const props = this.props;
    props.fetchCurrentArtist(this.props.match.params.artistName);
    props.fetchRecentEntriesForCurrentArtist(this.props.match.params.artistName);
  }

  render() {
    const props = this.props;
    const { classes, initialLoading } = props;

    if(initialLoading) {
      return <Loading />
    }

    let content = null;
    if (props.recentEntries.length > 0) {

      var items = props.recentEntries;
      if(this.state.filter !== 'all') {
        items = this.filterEntries(items, this.state.filter);
      }

      content =  this._renderItems(items);
    } else {
      content = <NoMedia />;
    }
    return (
      <div>
        <Navbar value={1}/>
        <div className={classes.root}>
          <div className={classes.subMenuContainer}>
            <div className={classes.recommendedArtistHeading}>{this.props.match.params.artistName}</div>
            <div className={classes.menuActionsContainer}>
              <Select
                value={this.state.value}
                onChange={this.handleChange}
                native={true}
                name="value"
                className={classes.mediaSelect}
                inputProps={{className: classes.sInput}}
                disableUnderline={true}
              >
                <option value="all">
                  All Media
                </option>
                <option value="articles">Articles</option>
                <option value="videos">Videos</option>
              </Select>
              { 
                this.artistAlreadyFollowed() 
                ? <Button className={classes.unfollowButton} onClick={this.unfollowArtist}>UNFOLLOW</Button>
                : <Button className={classes.followButton} onClick={this.followArtist}>FOLLOW</Button>

              }
            </div>
          </div>
          {content}
        </div>
      </div>
    )  
   }
}

const mapDispatch = dispatch => ({ 
  addArtists: artists => dispatch(addArtists(artists)),
  fetchCurrentArtist: (name) => dispatch(fetchCurrentArtist(name)),
  fetchRecentEntriesForCurrentArtist: (name, page) => dispatch(fetchRecentEntriesForCurrentArtist(name, page)),
})
const mapState = store => ({ 
  recentEntries: store.currentArtist.recentEntries,
  currentPage: store.currentArtist.currentPage,
  fetching: store.currentArtist.fetching,
  endOfList: store.currentArtist.endOfList,
  initialLoading: store.currentArtist.initialLoading,
  artists: store.followingArtists,
  userId: store.user,
})

export default withStyles(styles)(withRouter(connect(mapState, mapDispatch)(Artist)));