import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    height: 64,
    transition: 'all 0.8s',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
  topBarContainer: {
    height: 64,
    width: 1238,
    margin: '0 auto',
  },
  indicator: {
    backgroundColor: "white",
    height: 5,
  },
  logoContainer: {
    height: 64,
    width: 95,
    paddingTop: 22,
    align: "center"
  },
  menuList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    "& .menuListItem": {
      paddingTop: 29,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: "center",
      marginLeft: 32,
    },
    "& .menuLink": {
      height: 16,
      fontFamily: "Open Sans",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.2,
      textAlign: "center",
      color: "#ffffff",
    },
  },
  menuListColor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    "& .menuListItem": {
      paddingTop: 29,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: "center",
      marginLeft: 32,
    },
    "& .menuListItem.active": {
      borderTop: '5px solid #9228c8',
      paddingTop: 22,
      height: 47,
      '& .menuLink': {
        fontWeight: 'bold',
      },
    },
    "& .menuLink": {
      height: 16,
      fontFamily: "Open Sans",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.2,
      textAlign: "center",
      color: "#232323",
    },
  },
  rightMenuList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    "& .menuListItem": {
      width: 99,
      paddingTop: 29,
      textAlign: "center",
      marginLeft: 32,
    },
    "& .rightMenuLink": {
      width: 89,
      height: 16,
      fontFamily: "Open Sans",
      fontSize: 14,
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 1.3,
      textAlign: "right",
      color: "#ffffff",
      textTransform: "uppercase",
    },
  },
  rightMenuListColor: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',    
    "& .menuListItem": {
      width: 99,
      paddingTop: 29,
      textAlign: "center",
      marginLeft: 32,
      "& .rightMenuLink": {
        width: 89,
        height: 16,
        fontFamily: "Open Sans",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: 1.3,
        textAlign: "right",
        color: "#232323",
        textTransform: "uppercase",
      },
    },  
  },
  mobileTopbarContainer: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 19px',
  }, 
  mobileTopbarContainerColor: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 19px',
    backgroundColor: '#792aae',
  }, 
  menuButton: {
    width: 24,
    height: 24,
    '&:focus': {
      backgroundColor: 'transparent',
    }
  },
  menuButtonClose: {
    width: 24,
    height: 24,
    color: 'black',
    '&:focus': {
      backgroundColor: 'transparent',
    }
  },
  mobileToolbarLeftSection: {
    paddingTop: 15,
    paddingBottom: 6,
  },
  mobileToolbarRightSection: {
    paddingTop: 3,
    color: 'white',
  },
  drawerContainer: {
    width: '100vw',
    height: '100%',
    backgroundColor: 'white',
    color: '#0f0f0f',
  },
  listItem: {
    width: 200,
    margin: '22px auto',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  listItemLink: {
    width: 200,
    fontFamily: "Ruboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#0f0f0f",
  },
  listItemLinkPrimary: {
    width: 200,
    fontFamily: "Ruboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#9228c8",
    textTransform: 'uppercase',
  }
})

class GuestNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    }
  }

  toggleDrawer = (open) => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  render() {

    const { classes, alternateColor, activePage } = this.props;

    return (
      <div className={classes.root}>
        <MediaQuery maxDeviceWidth={1023}>
          <div className={alternateColor ? classes.mobileTopbarContainerColor : classes.mobileTopbarContainer}>
              <div className={classes.mobileToolbarLeftSection}>
                <Link to="/">
                  <img src="images/mobile-logo.svg" width={27} height={30} />
                </Link>
              </div>
              <div className={classes.mobileToolbarRightSection}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
                  <div className={classes.drawerContainer}>
                    <div className={classes.mobileTopbarContainer}>
                      <div className={classes.mobileToolbarLeftSection}>
                        <img src="images/mobile-logo-color.svg" width={27} height={30} />
                      </div>
                      <div className={classes.mobileToolbarRightSection}>
                        <IconButton className={classes.menuButtonClose} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(false)}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    </div>
                    <List component="section" className={classes.drawerMenu}>
                      <ListItem button disableRipple className={classes.listItem} >
                        <Link className={classes.listItemLink} to="/about">About Us</Link>
                      </ListItem>
                      <ListItem button disableRipple className={classes.listItem} >
                        <Link className={classes.listItemLink} to="/privacy">Privacy Policy</Link>
                      </ListItem>
                      <ListItem button disableRipple className={classes.listItem} >
                        <Link className={classes.listItemLink} to="/terms-of-use">Terms of Use</Link>
                      </ListItem>
                      <ListItem button disableRipple className={classes.listItem} >
                        <Link className={classes.listItemLink} to="/faq">FAQ</Link>
                      </ListItem>
                      <ListItem button disableRipple className={classes.listItem} >
                        <Link className={classes.listItemLinkPrimary} to="/signup">Sign Up</Link>
                      </ListItem>
                      <ListItem button disableRipple className={classes.listItem} >
                        <Link className={classes.listItemLinkPrimary} to="/login">Log In</Link>
                      </ListItem>
                    </List>
                  </div>
                </Drawer>
              </div>
          </div>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1024}>
          <Grid
            container
            alignItems="flex-end"
            alignContent="flex-end"
            direction="row"
            justify="center"
            className={classes.topBarContainer}
            >
            <Grid item xs={4}>
              <div className={classes.logoContainer}>
                <Link to="/">
                  <img src={ alternateColor ? "images/logotype-color.svg" : "images/logotype.svg"} width={115} height={30} />
                </Link>
              </div>
            </Grid>
            <Grid item xs={6}>
              <ul className={alternateColor ? classes.menuListColor : classes.menuList}>
                <li className={`menuListItem ${activePage == 'about' ? 'active' : ''}`}>
                  <Link className="menuLink" to="/about">About Us</Link>
                </li>
                <li className={`menuListItem ${activePage == 'privacy' ? 'active' : ''}`}>
                  <Link className="menuLink" to="/privacy">Privacy Policy</Link>
                </li>
                <li className={`menuListItem ${activePage == 'terms-of-use' ? 'active' : ''}`}>
                  <Link className="menuLink" to="/terms-of-use">Terms of Use</Link>
                </li>
                <li className={`menuListItem ${activePage == 'faq' ? 'active' : ''}`}>
                  <Link className="menuLink" to="/faq">FAQ</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={2}>
              <ul className={alternateColor ? classes.rightMenuListColor : classes.rightMenuList }>
                <li className="menuListItem">
                  <Link className="rightMenuLink" to="/signup">Sign Up</Link>
                </li>
                <li className="menuListItem">
                  <Link className="rightMenuLink" to="/login">Log In</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
        </MediaQuery>
      </div>
    );
  }
}

GuestNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuestNavbar);
