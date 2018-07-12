import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MediaQuery from 'react-responsive';

const styles = theme => ({
  footer: {
    width: '100%',
    height: 193,
    backgroundColor: "#552e89", 
    '@media (max-width: 1023px)': {
      height: 412,
    },
    '& .footerContainer': {
      margin: '0px auto',
      backgroundColor: "#552e89", 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 1238,
      padding: '54px 98px',
      '@media (max-width: 1023px)': {
        width: 375,
        margin: '0px auto',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 412,
        padding: 0,
      },
    },
    '& .leftSection': {
      paddingTop: 21,
      '@media (max-width: 1023px)': {
        margin: '0px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
    },
    '& .rightSection': {
      paddingTop: 21,
      '& .navContainer': {
        '@media (max-width: 1023px)': {
          width: 98,
          margin: '0px auto',
          display: 'flex',
          flexDirection: 'column',
        },
      }
    },
    '& .navLink': {
      width: 90,
      height: 19,
      fontFamily: "Open Sans",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.2,
      textAlign: "right",
      color: "#ffffff",
      marginLeft: 32,
      '@media (max-width: 1023px)': {
        textAlign: 'center',
        marginLeft: 0,
        marginTop: 30,
        width: 98,
      }
    }
  }
})

const Footer = props => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className="footerContainer">
        <div className="leftSection">
          <MediaQuery minWidth={1024}>
            <img src="images/landing/footer-logotype.png" title="Chune Inc Logo" />
          </MediaQuery>
          <MediaQuery maxWidth={1023}>
            <img src="images/landing/mobile/footer-logotype-mobile.png" title="Chune Inc Logo" />
        </MediaQuery>
        </div>
        <div className="rightSection">
          <div className="navContainer">
            <a href="/about" className="navLink">About Us</a>
            <a href="/privacy" className="navLink">Privacy Policy</a>
            <a href="/terms-of-use" className="navLink">Terms of Use</a>
            <a href="/faq" className="navLink">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default withStyles(styles)(Footer);