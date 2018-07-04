import React from 'react'
import GuestNavbar from './shared/GuestNavbar'
import Footer from './shared/Footer'
import Navbar from './Navbar'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  contentContainer: {
    width: 716,
    minHeight: 550,
    margin: '106px auto',
    '@media (max-width: 1023px)': {
      width: 345,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 40,
    },
    '& h3': {
      width: 716,
      fontFamily: "Open Sans",
      fontSize: 36,
      fontWeight: "bold",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.22,
      letterSpacing: "normal",
      color: "#232323",
      marginBottom: 30,
      '@media (max-width: 1023px)': {
        width: 345,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    '& .para1': {
      width: 716,
      opacity: 0.81,
      fontFamily: "Open Sans",
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.5,
      letterSpacing: "normal",
      color: "#515151",
      '@media (max-width: 1023px)': {
        width: 345,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    '& .para2': {
      width: 716,
      opacity: 0.81,
      fontFamily: "Open Sans",
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.5,
      letterSpacing: "normal",
      color: "#707070",
      '@media (max-width: 1023px)': {
        width: 345,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    '& ul': {
      marginLeft: 32,
      '& li': {
        listStyle: 'disc',
        opacity: 0.81,
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.5,
        letterSpacing: "normal",
        color: "#515151",
        '& strong': {
          fontWeight: 'bold',
        }
      }
    }
  }
});

const AboutUs = props => {
  const { classes, user } = props;
  const navBar = !!(user) ? <Navbar value={false} /> : <GuestNavbar alternateColor={true} activePage="about"/>

  return (
    <React.Fragment>
      {navBar}
      <div className={classes.contentContainer}>
        <h3>About Us</h3>
        <p className="para1">
          We are Chune. We love music.
        </p>
        <br/>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(AboutUs);
