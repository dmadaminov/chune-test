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
          Need an easy way to stay up to date with all your favorite artists? Say less. We got you.
        </p>
        <br/>
        <p className="para1">
        We love music and we know you do too. We built this site because we know that it’s not easy to
          stay up to date with everything that your favorite artists are doing. With Chune, you get a
          personalized feed that allows you to easily get all the latest content about your favorite artists:
          new releases, interviews, and articles.
        </p>
        <br/>
        <p className="para1">
          This is our beta website. We are looking for feedback from you so we can improve our site upon release.
          So, in the feedback section of our site, please tell us what you like, what you don’t like, and any
          suggestions about how we can upgrade Chune to give you the best experience possible. We’d really appreciate it.
        </p>
        <br/>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(AboutUs);
