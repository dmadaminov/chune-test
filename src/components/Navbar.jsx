import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { matchPath } from 'react-router';
import MediaQuery from 'react-responsive';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { objectOf, any, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { SearchFormConnect } from './SearchForm';
import { SpotifyIcon } from './shared/SocialIcons';
import LogoSVG from '../../assets/images/logotype.svg';
import { logOutUser } from '../store/auth/actions';

const styles = () => ({
  navContainer: {
    height: 74,
    '@media (max-width: 1023px)': {
      height: 56,
    }
  },
  root: {
    flexGrow: 1,
    height: 74,
    backgroundColor: '#552e89',
    backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    '@media (max-width: 1023px)': {
      backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
      height: 56,
    }
  },
  appBar: {
    width: '100%',
    height: 74,
    margin: '0px auto',
    '@media (max-width: 1023px)': {
      width: '100vw',
      backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
      height: 56,
    }
  },
  gridContainer: {
    height: 74,
  },
  indicator: {
    backgroundColor: 'white',
    height: 5,
  },
  logoContainer: {
    height: 74,
    width: 95,
    paddingLeft: 25,
    paddingTop: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    justify: 'center',
  },
  thetab: {
    height: 74,
    minWidth: 120,
    width: 120,
  },
  tabLabel: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    textAlign: 'right',
    textTransform: 'none',
  },
  avatar: {
    width: 32,
    height: 32
  },
  avatarContainer: {
    height: 74,
    display: 'flex',
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginRight: 24,
    cursor: 'pointer',
    background: 'none',
    border: 0,
    color: 'white',
    outline: 'none',
    '@media (max-width: 1023px)': {
      marginRight: 0,
      marginLeft: 30,
    }
  },
  settingsMenu: {
    borderRadius: 4,
  },
  settingsIconButton: {
    width: 38,
    height: 38,
    fontSize: 24,
    backgroundColor: 'transparent',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
    },
    borderRadius: '50%',
    '@media (max-width: 1023px)': {
      width: 24,
      height: 24,
      fontSize: 24,
    }
  },
  mobileToolbar: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0px 16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mobileTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: '#ffffff',
  },
  mobileToolbarLeftSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '35%',
    alignItems: 'center',
  },
  mobileToolbarRightSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '35%',
    alignItems: 'center',
  },
  drawerContainer: {
    width: 200,
    height: '100%',
    backgroundImage: 'rgba(255, 255, 255, 0.16)',
  },
  navLink: {
    color: '#552e89',
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    '&:hover': {
      backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
    }
  },
  navLinkActive: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    '&:hover': {
      backgroundColor: 'white',
    }
  },
  listItem: {
    color: '#552e89',
    backgroundColor: 'white',
    fontSize: 17,
    '&:hover': {
      backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
    }
  },
  activeListItem: {
    color: 'white',
    fontSize: 17,
    backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
    '&:focus': {
      backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
    }
  },
  menuButton: {
    width: 24,
    height: 24,
    '&:focus': {
      backgroundColor: 'transparent',
    }
  }
});

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      searching: false,
      anchorEl: null,
      drawerOpen: false,
    };
  }

  componentWillMount() {
    const { location } = this.props;
    switch (location.pathname) {
      case '/home':
        return this.setState({ value: 0 });
      case '/for-you':
        return this.setState({ value: 1 });
      case '/artists':
        return this.setState({ value: 2 });
      case '/events':
        return this.setState({ value: 3 });
      default:
        return null;
    }
  }

  getTitle = () => {
    const { history } = this.props;
    switch (history.location.pathname) {
      case '/home':
        return 'Home';
      case '/for-you':
        return 'For You';
      case '/artists':
        return 'Artists';
      case '/events':
        return 'Events';
      default:
        return null;
    }
  }

  matchPath = (targetPath) => {
    const match = matchPath(window.location.pathname, {
      path: targetPath,
      exact: true,
      strict: false
    });
    return match;
  }

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  goToRoute = (route) => {
    const { history } = this.props;
    history.push(route);
    this.setState({ anchorEl: null });
  };

  toggleSearch = () => {
    const { searching } = this.state;
    this.setState({ searching: !searching });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { drawerOpen } = this.state;
    const { classes, logOut, profile } = this.props;
    const { value, searching, anchorEl } = this.state;
    const spotify = profile.display_name ? profile.display_name : (
      <a href="/api/v1/users/social/login/spotify">
        Spotify
      </a>
    );
    const searchForm = <SearchFormConnect cancelSearch={this.toggleSearch} />;
    const normalMenu = (
      <div style={{ height: 74 }}>
        <MediaQuery maxDeviceWidth={1023}>
          <AppBar position="fixed" className={classes.root}>
            <Toolbar className={classes.mobileToolbar}>
              <div className={classes.mobileToolbarLeftSection}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.mobileTitle}>
                  {this.getTitle()}
                </Typography>
                <Drawer open={drawerOpen} onClose={this.toggleDrawer(false)}>
                  <div className={classes.drawerContainer}>
                    <List component="section" className={classes.drawerMenu}>
                      <ListItem button className={this.matchPath('/home') ? classes.activeListItem : classes.listItem}>
                        <NavLink exact to="/home" activeClassName={classes.navLinkActive} className={classes.navLink}>
                          Home
                        </NavLink>
                      </ListItem>
                      <ListItem button className={this.matchPath('/for-you') ? classes.activeListItem : classes.listItem}>
                        <NavLink exact to="/for-you" activeClassName={classes.navLinkActive} className={classes.navLink}>
                          For You
                        </NavLink>
                      </ListItem>
                      <ListItem button className={this.matchPath('/artists') ? classes.activeListItem : classes.listItem}>
                        <NavLink exact to="/artists" activeClassName={classes.navLinkActive} className={classes.navLink}>
                          Artists
                        </NavLink>
                      </ListItem>
                      <ListItem button className={this.matchPath('/events') ? classes.activeListItem : classes.listItem}>
                        <NavLink exact to="/events" activeClassName={classes.navLinkActive} className={classes.navLink}>
                          Events
                        </NavLink>
                      </ListItem>
                    </List>
                  </div>
                </Drawer>
              </div>
              <div className={classes.mobileToolbarRightSection}>
                <div className={classes.avatarContainer}>
                  <IconButton
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    classes={{ root: classes.settingsIconButton }}
                  >
                    <SettingsIcon />
                  </IconButton>
                  <Menu
                    className={classes.settingsMenu}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    getContentAnchorEl={null}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={() => this.goToRoute('/privacy')}>
                      Privacy Policy
                    </MenuItem>
                    <MenuItem onClick={() => this.goToRoute('/terms-of-use')}>
                      Terms of Use
                    </MenuItem>
                    <MenuItem onClick={() => this.goToRoute('/faq')}>
                      FAQ
                    </MenuItem>
                    <MenuItem>
                      <SpotifyIcon width="30px" height="30px" />
                      &nbsp;
                      {spotify}
                    </MenuItem>
                    <MenuItem onClick={this.sendPasswordResetEmail}>
                      Reset Password
                    </MenuItem>
                    <MenuItem onClick={() => logOut()}>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
                <button type="button" className={classes.avatarContainer} onClick={this.toggleSearch}>
                  <IconButton classes={{ root: classes.settingsIconButton }}>
                    <SearchIcon />
                  </IconButton>
                </button>
              </div>
            </Toolbar>
          </AppBar>
        </MediaQuery>

        <MediaQuery minDeviceWidth={1024}>
          <AppBar position="fixed" className={classes.root}>
            <div className={classes.appBar}>
              <Grid
                container
                alignItems="flex-end"
                alignContent="flex-end"
                direction="row"
                justify="center"
                className={classes.gridContainer}
              >
                <Grid item xs={1}>
                  <div className={classes.logoContainer}>
                    <Link to="/home">
                      <img src={LogoSVG} width={115} height={30} title="Logo" alt="Logo" />
                    </Link>
                  </div>
                </Grid>

                <Grid item xs={11}>
                  <Grid
                    container
                    justify="space-between"
                  >
                    <Grid item xs={1} />
                    <Grid
                      item
                      xs={9}
                    >
                      <Tabs
                        value={value}
                        onChange={this.handleChange}
                        fullWidth
                        classes={{ root: classes.tabContainer, indicator: classes.indicator }}
                      >
                        <Tab
                          label={(
                            <span className={classes.tabLabel}>
                              Home
                            </span>
                          )}
                          component={Link}
                          to="/home"
                          className={classes.thetab}
                        />
                        <Tab
                          label={(
                            <span className={classes.tabLabel}>
                              For You
                            </span>
                          )}
                          component={Link}
                          to="/for-you"
                          className={classes.thetab}
                        />
                        <Tab
                          label={(
                            <span className={classes.tabLabel}>
                              Artists
                            </span>
                          )}
                          component={Link}
                          to="/artists"
                          className={classes.thetab}
                        />
                        <Tab
                          label={(
                            <span className={classes.tabLabel}>
                              Events
                            </span>
                          )}
                          component={Link}
                          to="/events"
                          className={classes.thetab}
                        />
                      </Tabs>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                    >
                      <div className={classes.avatarContainer}>
                        <IconButton
                          aria-owns={anchorEl ? 'simple-menu' : null}
                          aria-haspopup="true"
                          onClick={this.handleClick}
                          classes={{ root: classes.settingsIconButton }}
                        >
                          <SettingsIcon />
                        </IconButton>
                        <Menu
                          className={classes.settingsMenu}
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={this.handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          getContentAnchorEl={null}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <MenuItem onClick={() => this.goToRoute('/privacy')}>
                            Privacy Policy
                          </MenuItem>
                          <MenuItem onClick={() => this.goToRoute('/terms-of-use')}>
                            Terms of Use
                          </MenuItem>
                          <MenuItem onClick={() => this.goToRoute('/faq')}>
                            FAQ
                          </MenuItem>
                          <MenuItem>
                            <SpotifyIcon width="30px" height="30px" />
                            &nbsp;
                            {spotify}
                          </MenuItem>
                          <MenuItem onClick={this.sendPasswordResetEmail}>
                            Reset Password
                          </MenuItem>
                          <MenuItem onClick={() => logOut()}>
                            Logout
                          </MenuItem>
                        </Menu>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                    >
                      <button type="button" className={classes.avatarContainer} onClick={this.toggleSearch}>
                        <SearchIcon />
                      </button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </AppBar>
        </MediaQuery>
      </div>
    );

    return (
      <div>
        {searching ? searchForm : normalMenu}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  userID: store.user,
  profile: store.dataSpotify.profile
});

const mapActionsToProps = dispatch => bindActionCreators({
  logOut: logOutUser
}, dispatch);

export const NavBarConnect = withStyles(styles)(withRouter(connect(mapStateToProps, mapActionsToProps)(Navbar)));

Navbar.propTypes = {
  classes: objectOf(any).isRequired,
  profile: objectOf(any).isRequired,
  history: objectOf(any).isRequired,
  location: objectOf(any).isRequired,
  logOut: func.isRequired
};
