import React from 'react'
import includes from 'lodash/includes'
import { connect } from 'react-redux'
import { database, auth } from '../../firebase'
import { Redirect } from 'react-router-dom'
import Navbar from '../Navbar'
import { fetchRecentEntries } from '../../store/recentEntries'
import { addUser } from '../../store/user';
import { fetchArticles } from '../../store/articles'
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
  }
});

class Artist extends React.Component {

  constructor(props) {
    super(props);
    this.currentArtist = this.getArtistNameFromQueryString();
    this.state = {
      filter: "all",
    };
  }

  getArtistNameFromQueryString = () => {
    var qParams = window.location.search.split('?')[1].split('&')
    var qParamsFormatted = {}
    for (var i=0; i< qParams.length; i++) {
      qParams[i] = qParams[i].split('=')
      qParamsFormatted[qParams[i][0]] = decodeURI(qParams[i][1])
    }
    var artist = qParamsFormatted.n;
    return artist;
  }

  artistAlreadyFollowed = () => {
    return includes(this.props.artists, this.currentArtist);
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
    ref.child(this.currentArtist).remove()
    this.props.deleteArtist(this.currentArtist);
  }

  followArtist = () => {
    database.ref(`users/${this.props.userId}/artists`).update({[this.currentArtist]: true});
    addArtists({...this.props.artists.concat(), [this.currentArtist]: true});
  }


  componentDidMount() {
    const props = this.props;
    if(props.recentEntries.length <= 0) {
      props.fetchRecentEntries(this.currentArtist);
    }
  }

  componentDidUpdate(prevProps) {
    const props =  this.props;

    console.log("Component did update with", props, this.currentArtist);

    if(props.recentEntries.length <= 0) {
      props.fetchRecentEntries(this.currentArtist);
    }
  }

  render() {
    const props = this.props;
    const { classes } = props;

    let content = null;
    if (props.recentEntries.length > 0) {

      let recentEntries = props.recentEntries;

      if(this.state.filter !== 'all') {
        recentEntries = this.filterEntries(recentEntries, this.state.filter);
      }

      content =  <CardList items={recentEntries} filter={this.props.filter}/>;
    } else {
      content = <Loading />;
    }
    return (
      <div>
        <Navbar value={1}/>
        <div className={classes.root}>
          <div className={classes.subMenuContainer}>
            <div className={classes.recommendedArtistHeading}>{this.currentArtist}</div>
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
                <option value="events">Events</option>
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
  fetchArticles: name => dispatch(fetchArticles(name)),
  addUser: userID => dispatch(addUser(userID)),
  fetchRecentEntries: name => dispatch(fetchRecentEntries(name)),
  addArtists: artists => dispatch(addArtists(artists)),
  deleteArtist: artist => dispatch(deleteArtist(artist))
})
const mapState = store => ({ 
  userId: store.user,
  articles: store.articles,
  recentEntries: store.recentEntries,
  artists: store.artists
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Artist));