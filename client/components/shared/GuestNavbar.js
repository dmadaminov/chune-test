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

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    width: 1280,
    margin: '0 auto',
    flexGrow: 1,
    height: 64,
    transition: 'all 0.8s',
  },
  indicator: {
    backgroundColor: "white",
    height: 5,
  },
  logoContainer: {
    height: 74,
    width: 95,
    paddingTop: 22,
    marginLeft: 24,
    align: "center"
  },
  menuList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuListItem: {
    width: 95,
    paddingTop: 29,
    textAlign: "center",
    marginLeft: 32,
  },
  rightMenuList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuLink: {
    width: 89,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.2,
    textAlign: "centers",
    color: "#ffffff",
  },
  rightMenuLink: {
    width: 89,
    height: 16,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.2,
    textAlign: "right",
    color: "#ffffff",
    textTransform: "uppercase",
  },
})

class GuestNavbar extends React.Component {

    render() {

      const { classes } = this.props;

      return (
        <div className={classes.root}>
          <Grid
            container
            alignItems="flex-end"
            alignContent="flex-end"
            direction="row"
            justify="center"
            className={classes.root}
            >
            <Grid item xs={5}>
              <div className={classes.logoContainer}>
                <img src="images/logotype.svg" width={115} height={30} />
              </div>
            </Grid>
            <Grid item xs={5}>
              <ul className={classes.menuList}>
                <li className={classes.menuListItem}>
                  <a className={classes.menuLink} href="/">About Us</a>
                </li>
                <li className={classes.menuListItem}>
                  <a className={classes.menuLink} href="/">Privacy Policy</a>
                </li>
                <li className={classes.menuListItem}>
                  <a className={classes.menuLink} href="/">Terms of Use</a>
                </li>
                <li className={classes.menuListItem}>
                  <a className={classes.menuLink} href="/">FAQ</a>
                </li>
              </ul>
            </Grid>
            <Grid item xs={2}>
              <ul className={classes.rightMenuList}>
                <li className={classes.menuListItem}>
                  <a className={classes.rightMenuLink} href="/signup">Sign Up</a>
                </li>
                <li className={classes.menuListItem}>
                  <a className={classes.rightMenuLink} href="/login">Log In</a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
      );
    }
}

GuestNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuestNavbar);
