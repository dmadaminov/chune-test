import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import SearchForm from './SearchForm'

import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth } from '../firebase'
import { logOut } from '../store/user'
import MediaQuery from 'react-responsive';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { matchPath } from 'react-router'

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 74,
      backgroundColor: "#552e89",
      transition: 'all 0.8s',
      '@media (max-width: 1023px)': {
        backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
        height: 56,
      }
    },
    indicator: {
      backgroundColor: "white",
      height: 5,
    },
    logoContainer: {
      height: 74,
      width: 95,
      paddingLeft: 25,
      paddingTop: 22,
      align: "center"
    },
    tabContainer: {
      alignItems: 'flex-end',
      alignContent: 'flex-end',
      justify: 'center',
    },
    thetab: {
      height: 74,
      minWidth: 80,
      width: 90,
    },
    tabLabel: {
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: "normal",
      lineHeight: "normal",
      letterSpacing: 0.3,
      textAlign: "right",
      textTransform: 'none',
    },
    avatar: {
      width: 32,
      height: 32
    },
    avatarContainer: {
      height: 74,
      display: "flex",
      alignItems: "center",
      alignContent: "flex-end",
      justifyContent: "flex-end",
      textAlign: "right",
      marginRight: 24,
      cursor: "pointer",
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
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.16)',
        // Reset on touch devices, it doesn't add specificity
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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mobileTitle: {
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.3,
      color: "#ffffff",
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
      color: "#552e89",
      fontSize: 17,
      '&:hover': {
        backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
      }
    },
    navLinkActive: {
      color: "white",
      fontSize: 17,
      '&:hover': {
        backgroundColor: 'white',
      }
    },
    listItem: {
      color: "#552e89",
      backgroundColor: 'white',
      fontSize: 17,
      '&:hover': {
        backgroundImage: 'linear-gradient(262deg, #9c05cd, #552e89)',
      }
    },
    activeListItem: {
      color: "white",
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
        value: props.value,
        searching: false,
        anchorEl: null,
        drawerOpen: false,
      };
    }

    toggleDrawer = (open) => () => {
      this.setState({
        drawerOpen: open,
      });
    };

    handleChange(event, value) {
      this.setState({ value });
    }

    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    toggleSearch = () => {
      this.setState({searching: !this.state.searching});
    }

    sendPasswordResetEmail = () => {
        auth
            .sendPasswordResetEmail(auth.currentUser.email)
            .then(() => {
              this.setState({ anchorEl: null });
              alert('Password reset email has been sent to your email!')
            })
    }

    signOut = () => {
        auth
          .signOut()
          .then(() => {
            this.setState({ anchorEl: null });
            this.props.logOut();
          })
    }

    matchPath = (targetPath) => {
      const match = matchPath(window.location.pathname, {
        path: targetPath,
        exact: true,
        strict: false
      })
      return match;
    }

    getTitle = () => {
      switch(this.props.value) {
        case 0:
          return '';
        case 1:
          return 'Artists';
        case 2:
          return 'Articles';
        case 3:
          return 'Videos';
        case 4:
          return 'Events';
      }

    }
    render() {

      const { classes, title } = this.props;
      const { value, searching, anchorEl } = this.state;

      const searchForm = <SearchForm cancelSearch={ this.toggleSearch } />;

      const normalMenu = (
        <div className={classes.root}>
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
                  <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
                    <div className={classes.drawerContainer}>
                      <List component="section" className={classes.drawerMenu}>
                        <ListItem button className={this.matchPath('/') ? classes.activeListItem : classes.listItem} >
                          <NavLink exact to="/" activeClassName={classes.navLinkActive} className={classes.navLink}>
                            Home
                          </NavLink>
                        </ListItem>
                        <ListItem button className={this.matchPath('/artists') ? classes.activeListItem : classes.listItem} >
                          <NavLink exact to="/artists" activeClassName={classes.navLinkActive} className={classes.navLink}>
                            Artists
                          </NavLink>
                        </ListItem>
                        <ListItem button className={this.matchPath('/news') ? classes.activeListItem : classes.listItem} >
                          <NavLink exact to="/news" activeClassName={classes.navLinkActive} className={classes.navLink}>
                            Articles
                          </NavLink>
                        </ListItem>
                        <ListItem button className={this.matchPath('/videos') ? classes.activeListItem : classes.listItem} >
                          <NavLink exact to="/videos" activeClassName={classes.navLinkActive} className={classes.navLink}>
                            Videos
                          </NavLink>
                        </ListItem>
                        <ListItem button className={this.matchPath('/events') ? classes.activeListItem : classes.listItem} >
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
                      classes={{root: classes.settingsIconButton}}
                    >
                      <SettingsIcon  />
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
                      }} >
                      <MenuItem onClick={this.handleClose}>Privacy Policy</MenuItem>
                      <MenuItem onClick={this.handleClose}>Terms of Use</MenuItem>
                      <MenuItem onClick={this.handleClose}>FAQ</MenuItem>
                      <MenuItem onClick={this.sendPasswordResetEmail}>Reset Password</MenuItem>
                      <MenuItem onClick={this.signOut}>Logout</MenuItem>
                    </Menu>
                  </div>
                  <div className={classes.avatarContainer} onClick={this.toggleSearch.bind(this)}>
                    <IconButton classes={{root: classes.settingsIconButton}}>
                      <SearchIcon ></SearchIcon>
                    </IconButton>
                  </div>
                </div>
              </Toolbar>
            </AppBar>
          </MediaQuery>
          <MediaQuery minDeviceWidth={1024}>
            <AppBar position="fixed" className={classes.root}>
              <Grid
                container
                alignItems="flex-end"
                alignContent="flex-end"
                direction="row"
                justify="center"
                >
                <Grid item xs={5}>
                  <div className={classes.logoContainer}>
                    <img src="images/logotype.svg" width={115} height={30} />
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <Grid
                    container
                    justify="space-between">
                    <Grid item xs={2} />
                    <Grid
                      item
                      xs={8}>
                      <Tabs value={value} onChange={this.handleChange.bind(this)} fullWidth={true} classes={{root: classes.tabContainer, indicator: classes.indicator}}>
                        <Tab
                          label={<span className={classes.tabLabel}>Home</span>}
                          component={Link}
                          to="/"
                          className={classes.thetab} />
                        <Tab
                          label={<span className={classes.tabLabel}>Artists</span>}
                          component={Link}
                          to="/artists"
                          className={classes.thetab} />
                        <Tab
                          label={<span className={classes.tabLabel}>Articles</span>}
                          component={Link}
                          to="/news"
                          className={classes.thetab} />
                        <Tab
                          label={<span className={classes.tabLabel}>Videos</span>}
                          component={Link}
                          to="/videos"
                          className={classes.thetab} />
                        <Tab
                          label={<span className={classes.tabLabel}>Events</span>}
                          component={Link}
                          to="/events"
                          className={classes.thetab} />
                      </Tabs>
                    </Grid>
                    <Grid
                      item
                      xs={1}>
                      <div className={classes.avatarContainer}>
                        <IconButton
                          aria-owns={anchorEl ? 'simple-menu' : null}
                          aria-haspopup="true"
                          onClick={this.handleClick}
                          classes={{root: classes.settingsIconButton}}
                        >
                          <SettingsIcon  />
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
                          }} >
                          <MenuItem onClick={this.handleClose}>Privacy Policy</MenuItem>
                          <MenuItem onClick={this.handleClose}>Terms of Use</MenuItem>
                          <MenuItem onClick={this.handleClose}>FAQ</MenuItem>
                          <MenuItem onClick={this.sendPasswordResetEmail}>Reset Password</MenuItem>
                          <MenuItem onClick={this.signOut}>Logout</MenuItem>
                        </Menu>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={1}>
                      <div className={classes.avatarContainer} onClick={this.toggleSearch.bind(this)}>
                        <SearchIcon ></SearchIcon>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AppBar>
          </MediaQuery>
        </div>

      );

      return searching ? searchForm : normalMenu;
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapState = store => ({ userID: store.user })
const mapDispatch = dispatch => ({
  logOut: () => dispatch(logOut()),
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Navbar));
