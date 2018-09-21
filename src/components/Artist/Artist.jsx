import React from 'react';
// import find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import {
  objectOf, any, func,
  arrayOf
} from 'prop-types';
import { Tweet } from 'react-twitter-widgets';

import { followArtist, unfollowArtist } from '../../store/artists/actions';
// import { fetchCurrentArtist, reloadingArtist, fetchRecentEntriesForCurrentArtist } from '../../store/currentArtist';
// import { appendArtist, removeArtist } from '../../store/followingArtists';
import { Loading } from '../shared/Loading';
import { NoMediaConnect } from '../shared/NoMedia';
import { VideoCardConnect } from '../Videos/Video';
import { ArticleCardConnect } from '../News/Article';
// import { EmptyListConnect } from '../shared/EmptyList';

const styles = () => ({
  root: {
    width: 716,
    margin: '39px auto',
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: '24px auto',
    }
  },
  subMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
    height: 38,
    '@media (max-width: 1023px)': {
      width: 344,
      margin: '18px auto',
    }
  },
  settingsIconButton: {
    width: 38,
    height: 38,
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'black',
    '&:hover': {
      backgroundColor: 'transparent',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&:focus': {
      backgroundColor: 'transparent',
    },
    borderRadius: '50%',
    '@media (max-width: 1023px)': {
      width: 24,
      height: 24,
      fontSize: 24,
      paddingTop: 6,
    }
  },
  menuSelected: {
    backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
    color: 'white',
  },
  menuActionsContainer: {
    display: 'flex',
    width: 223,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 27,
    '@media (max-width: 1023px)': {
      width: 183,
    }
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
    width: 437,
    height: 72,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: '36px',
    letterSpacing: 0.3,
    paddingLeft: 5,
    color: '#000000',
    '@media (max-width: 1023px)': {
      fontSize: 18,
      width: 244,
    }
  },
  followButton: {
    width: 104,
    height: 36,
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#552e89',
    '&:hover': {
      backgroundColor: 'rgba(85, 46, 137, 0.75)',
    },
    '&:focus': {
      backgroundColor: '#552e89',
    },
  },
  unfollowButton: {
    width: 104,
    height: 36,
    backgroundColor: 'rgba(98, 2, 238, 0)',
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'center',
    color: '#6200ee',
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
    overflow: 'hidden',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
  gridList: {
    width: 716,
    borderRadius: 4,
    '@media (max-width: 1023px)': {
      width: 344,
      margin: '0px auto',
    }
  },
  gridRow: {
    listStyle: 'none',
    height: 'auto',
    marginBottom: 24,
    width: '100%'
  },
  container: {
    backgroundColor: '#fafafa',
    width: '100%',
    paddingTop: 24,
  }
});

class Artist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all',
      anchorEl: null,
    };
  }

  // componentDidMount() {
  //   const props = this.props;
  //   props.reloadingArtist();
  //   props.fetchCurrentArtist(this.props.match.params.artistName);
  //   props.fetchRecentEntriesForCurrentArtist(this.props.match.params.artistName);
  // }

  // componentDidUpdate(prevProps) {
  //   const props = this.props;
  //   const prevArtist = prevProps.match.params.artistName;
  //   const currentArtist = props.match.params.artistName;
  //   if (prevArtist !== currentArtist) {
  //     props.reloadingArtist();
  //     props.fetchCurrentArtist(this.props.match.params.artistName);
  //     props.fetchRecentEntriesForCurrentArtist(this.props.match.params.artistName);
  //   }
  // }

  // handleFilterMenuClick = (event) => {
  //   this.setState({ anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ anchorEl: null });
  // };

  handleFilterMenu = (filter) => {
    this.setState({
      filter,
      anchorEl: null,
    });
  }

  // artistAlreadyFollowed = () => find(this.props.artists, (artist) => {
  //   const normalizeName = name => name.toLowerCase().replace('-', " ");
  //   return normalizeName(artist.name) === normalizeName(this.props.match.params.artistName);
  // })

  handleChange = ({ target }) => {
    this.setState({ filter: target.value });
  }

  // filterEntries = (entries, filter) => {
  //   if (filter === 'articles') {
  //     return entries.filter(entry => !entry.isVideo);
  //   }
  //   if (filter === 'videos') {
  //     return entries.filter(entry => entry.isVideo);
  //   }
  //   if (filter === 'events') {
  //     return [];
  //   }
  // }

  // unfollowArtist = () => {
  //   this.props.removeArtist(this.props.artist, this.props.userId);
  // }

  follow = () => {
    const { artist, followToArtist } = this.props;
    followToArtist(artist.name);
  }

  unfollow = () => {
    const { artist, unfollowToArtist } = this.props;
    unfollowToArtist(artist.name);
  }

  // loadMoreItems = () => {
  //   const props = this.props;
  //   props.fetchRecentEntriesForCurrentArtist(this.props.match.params.artistName, props.currentPage + 1);
  // }


  renderWaypoint = () => <Waypoint onEnter={this.loadMoreItems} threshold={2.0} />

  renderItems = (content) => {
    const { classes } = this.props;
    return (
      <div className={classes.cardlists}>
        <ul className={classes.gridList}>
          {
            content.map((item) => {
              switch (item.type) {
                case 'video':
                  return (
                    <li className={classes.gridRow} key={item.id}>
                      <VideoCardConnect video={item} autoplay={false} />
                    </li>);
                case 'tweet': {
                  const str = item.embed_url.split('/');
                  return (
                    <li className={classes.gridRow} key={item.id}>
                      <div className="tweet">
                        <Tweet tweetId={str[str.length - 1]} options={{ width: 500 }} />
                      </div>
                    </li>);
                }
                case 'article':
                  return (
                    <li className={classes.gridRow} key={item.id}>
                      <ArticleCardConnect article={item} />
                    </li>);
                default:
                  return null;
              }
            })
          }
          { this.renderWaypoint() }
        </ul>
      </div>
    );
  }

  render() {
    const {
      classes, content, artists, artist
    } = this.props;
    const { filter, value, anchorEl } = this.state;
    if (artist.name === undefined) return <Loading />;
    let followButton = false;
    artists.forEach((e) => {
      if (e.name === artist.name) followButton = true;
    });
    // if (artistNotFound) {
    //   return (
    //     <div>
    //       <EmptyListConnect
    //         messageOne={`Sorry, we can't find the artist "${props.match.params.artistName}" in our database.`}
    //         messageTwo="Try using the search bar to follow another artist. Or go to artists page to follow artists related to your favorite ones."
    //       />
    //     </div>
    //   );
    // }

    // if (initialLoading) {
    //   return (
    //     <div>
    //       <Loading />
    //     </div>
    //   );
    // }
    let contentArtist = null;
    if (content.length > 0) {
      contentArtist = this.renderItems(content);
    } else {
      contentArtist = <NoMediaConnect />;
    }
    return (
      <div>
        <div className={classes.root}>
          <div className={classes.subMenuContainer}>
            <div className={classes.recommendedArtistHeading}>
              {this.props.match.params.artistName}
            </div>
            <div className={classes.menuActionsContainer}>
              <MediaQuery minWidth={1024}>
                <Select
                  value={value}
                  onChange={this.handleChange}
                  native
                  name="value"
                  className={classes.mediaSelect}
                  inputProps={{ className: classes.sInput }}
                  disableUnderline
                >
                  <option value="all">All Media</option>
                  <option value="articles">Articles</option>
                  <option value="videos">Videos</option>
                  <option value="twitter">Twitter</option>
                </Select>
              </MediaQuery>
              <MediaQuery maxWidth={1023}>
                <IconButton
                  aria-owns={anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  // onClick={this.handleFilterMenuClick}
                  classes={{ root: classes.settingsIconButton }}
                >
                  <FilterListIcon />
                </IconButton>
                <Menu
                  className={classes.settingsMenu}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  // onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  getContentAnchorEl={null}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem
                    classes={{ selected: classes.menuSelected }}
                    onClick={() => this.handleFilterMenu('all')}
                    selected={filter === 'all'}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    classes={{ selected: classes.menuSelected }}
                    onClick={() => this.handleFilterMenu('articles')}
                    selected={filter === 'articles'}
                  >
                    Articles
                  </MenuItem>
                  <MenuItem
                    classes={{ selected: classes.menuSelected }}
                    onClick={() => this.handleFilterMenu('videos')}
                    selected={filter === 'videos'}
                  >
                    Videos
                  </MenuItem>
                  <MenuItem
                    classes={{ selected: classes.menuSelected }}
                    onClick={() => this.handleFilterMenu('twitter')}
                    selected={filter === 'twitter'}
                  >
                    Twitter
                  </MenuItem>
                </Menu>
              </MediaQuery>
              {
                followButton
                  ? <Button className={classes.unfollowButton} onClick={this.unfollow}>UNFOLLOW</Button>
                  : <Button className={classes.followButton} onClick={this.follow}>FOLLOW</Button>

              }
            </div>
          </div>
          {contentArtist}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  artist: store.dataArtists.artist,
  content: store.dataArtists.content,
  artists: store.dataArtists.artists
});

const mapActionsToProps = dispatch => bindActionCreators({
  followToArtist: followArtist,
  unfollowToArtist: unfollowArtist
}, dispatch);

export const ArtistConnect = withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(Artist)));

Artist.propTypes = {
  artist: objectOf(any).isRequired,
  content: arrayOf(any).isRequired,
  classes: objectOf(any).isRequired,
  followToArtist: func.isRequired
};

// const mapDispatch = dispatch => ({
//   addArtists: artists => dispatch(addArtists(artists)),
//   appendArtist: (artist, userId) => dispatch(appendArtist(artist, userId)),
//   removeArtist: (artist, userId) => dispatch(removeArtist(artist, userId)),
//   fetchCurrentArtist: name => dispatch(fetchCurrentArtist(name)),
//   reloadingArtist: () => dispatch(reloadingArtist()),
//   fetchRecentEntriesForCurrentArtist: (name, page) => dispatch(fetchRecentEntriesForCurrentArtist(name, page)),
// });
// const mapState = store => ({
//   artist: store.currentArtist.artist,
//   recentEntries: store.currentArtist.recentEntries,
//   currentPage: store.currentArtist.currentPage,
//   fetching: store.currentArtist.fetching,
//   endOfList: store.currentArtist.endOfList,
//   initialLoading: store.currentArtist.initialLoading,
//   artistNotFound: store.currentArtist.artistNotFound,
//   artists: store.followingArtists.artists,
//   userId: store.user.uid,
// });
