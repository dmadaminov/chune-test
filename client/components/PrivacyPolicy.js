import React from 'react'
import GuestNavbar from './shared/GuestNavbar'
import Footer from './shared/Footer'
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar'

const styles = theme => ({
  contentContainer: {
    width: 716,
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

const PrivacyPolicy = props => {
  const { classes, user } = props;
  const navBar = !!(user && user.emailVerified) ? <Navbar value={false} /> : <GuestNavbar alternateColor={true} activePage="privacy"/>

  return (
    <React.Fragment>
      {navBar}
      <div className={classes.contentContainer}>
        <h3>Chune Privacy Policy</h3>
        <p className="para1">
          Respect for your privacy is coded into our DNA. Since we started WhatsApp, we’ve built our Services with a set of strong privacy principles in mind. In our updated Terms and Privacy Policy you’ll find:        </p>      
        <br/>
        <ul>
          <li>
            <strong>Information that is easier to understand.</strong> Our updated Terms and Privacy Policy are easier to understand and reflect new features such as WhatsApp Calling and WhatsApp for web and desktop.
          </li>
          <li>
            <strong>We joined Facebook in 2014.</strong> WhatsApp is now part of the Facebook family of companies. Our Privacy Policy explains how we work together to improve our services and offerings, like fighting spam across apps, making product suggestions, and showing relevant offers and ads on Facebook. Nothing you share on WhatsApp, including your messages, photos, and account information, will be shared onto Facebook or any of our other family of apps for others to see, and nothing you post on those apps will be shared on WhatsApp for others to see.
          </li>
          <li>
            <strong>Your messages are yours, and we can’t read thstrong.</strong> We’ve built privacy, end-to-end encryption, and other security features into WhatsApp. We don’t store your messages once they’ve been delivered. When they are end-to-end encrypted, we and third parties can’t read thstrong.
          </li>
          <li>
            <strong>No third-party banner ads.</strong> We still do not allow third-party banner ads on WhatsApp.
          </li>
          <li>
            <strong>New ways to use WhatsApp.</strong> We will explore ways for you and businesses to communicate with each other using WhatsApp, such as through order, transaction, and appointment information, delivery and shipping notifications, product and service updates, and marketing. For example, you may receive flight status information for upcoming travel, a receipt for something you purchased, or a notification when a delivery will be made. Messages you may receive containing marketing could include an offer for something that might interest you. We do not want you to have a spammy experience; as with all of your messages, you can manage these communications, and we will honor the choices you make.
          </li>
          <li>
            <strong>The choices you have.</strong> If you are an existing user, you can choose not to have your WhatsApp account information shared with Facebook to improve your Facebook ads and products experiences. Existing users who accept our updated Terms and Privacy Policy will have an additional 30 days to make this choice by going to Settings &gt; Account.
          </li>
        </ul>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(PrivacyPolicy);
