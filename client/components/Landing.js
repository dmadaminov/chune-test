import React from 'react'
import GuestNavbar from './shared/GuestNavbar'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  heroSectionContainer: {
    backgroundImage: "url(images/background.png)",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh',
    '@media (max-width: 1023px)': {
      width: '100vw',
    },
    '& .heroUnit': {
      width: 900,
      margin: '183px auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& .heading': {
        width: 900,
        height: 96,
        fontFamily: "Open Sans",
        fontSize: 36,
        fontWeight: 800,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.33,
        letterSpacing: 0.1,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 22,
        marginTop: 0,
      },
      '& .subHeading': {
        width: 716,
        height: 52,
        fontFamily: "Open Sans",
        fontSize: 16,
        fontWeight: 600,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: 1.63,
        letterSpacing: 0.1,
        textAlign: "center",
        color: "#ffffff",
        marginBottom: 40,
        marginTop: 0,
      },
    },
  },
  cta: {
    display: 'table-cell',
    verticalAlign: 'middle',
    width: 130,
    height: 52,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px 0 rgba(22, 8, 39, 0.5)",
    fontFamily: "Open Sans",
    fontSize: 16,
    fontWeight: 800,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#9228c8",
    border: "none",
    '&:focus': {
      backgroundColor: "#ffffff"
    }
  },
  ctaPurple: {
    display: 'table-cell',
    verticalAlign: 'middle',
    width: 130,
    height: 52,
    borderRadius: 4,
    backgroundColor: "#9228c8",
    boxShadow: "0 2px 8px 0 rgba(22, 8, 39, 0.5)",
    fontFamily: "Open Sans",
    fontSize: 16,
    fontWeight: 800,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff",
    border: "none",
    '&:focus': {
      backgroundColor: "#9228c8"
    }
  },
  headingStyle1: {
    width: 530,
    height: 48,
    fontFamily: "Open Sans",
    fontSize: 36,
    fontWeight: 800,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.33,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#232323",
    marginTop: 122,
    marginBottom: 20,
  },
  descriptionStyle1: {
    width: 530,
    height: 26,
    fontFamily: "Open Sans",
    fontSize: 18,
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.44,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#515151",
    marginTop: 0,
    marginBottom: 47,
  },
  headingStyle2: {
    width: 530,
    height: 48,
    fontFamily: "Open Sans",
    fontSize: 36,
    fontWeight: 800,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.33,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff",
    marginTop: 122,
    marginBottom: 20,
  },
  descriptionStyle2: {
    width: 530,
    height: 26,
    fontFamily: "Open Sans",
    fontSize: 18,
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.44,
    letterSpacing: 0.1,
    textAlign: "center",
    color: "#ffffff",
    marginTop: 0,
    marginBottom: 47,
  },
  whiteSection: {
    height: 760,
    width: '100%',
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .artistCardsContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 720,
      height: 354,
      marginTop: 0,
      marginBottom: 48,   
      '& .artistCardImage:last-child': {
        width: 439,
        height: 354,
        marginLeft: -60,
      },
    },
    '& .videoCardContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 529,
      height: 423,
      marginTop: 0,
      marginBottom: 142,
    },
    '& .eventsCardContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 813,
      height: 376,
      marginTop: 0,
      marginBottom: 142,
    },
    backgroundColor: "#fafafa",
  },
  purpleSection: {
    backgroundColor: "#9228c8", 
    height: 790,
    width: '100%',
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .articleCardsContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 769,
      height: 454,
      marginTop: 0,
      marginBottom: 46,
    },
    '& .albumCardContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 812,
      height: 350,
      marginTop: 0,
      marginBottom: 46,
    },
  },
  eventsSection: {
    height: 842,
    width: '100%',
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& .eventsCardContainer': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: 813,
      height: 376,
      marginTop: 0,
      marginBottom: 20,
    },
    backgroundColor: "#fafafa",
  },
  footer: {
    width: '100%',
    backgroundColor: "#552e89", 
    '& .footerContainer': {
      margin: '0px auto',
      backgroundColor: "#552e89", 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 1238,
      padding: '54px 98px',
    },
    '& .rightSection': {
      paddingTop: 21,
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
    }
  }
})

const Landing = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <div className={classes.heroSectionContainer}>
        <GuestNavbar />
        <div className="heroUnit">
          <h3 className="heading">
            Follow your favorite artists to receive a personalized music culture news feed
          </h3>
          <p className="subHeading">
            Read the latest news, watch the latest videos, listen to the latest albums, discover when your favorite artist is coming in town.
          </p>
          <div className="ctaContainer">
            <a className={classes.cta}>Chune In</a>
          </div>
        </div>
      </div>
      <div className={classes.whiteSection}>
        <h4 className={classes.headingStyle1}>
          Artists
        </h4>
        <p className={classes.descriptionStyle1}>
          Follow your favorite artists.
        </p>
        <div className="artistCardsContainer">
          <img src="images/landing/artist1.png" title="Dermot Kennedy" />
          <img src="images/landing/artist2.png" title="Rejjie Snow" className="artistCardImage"/>
        </div>
      </div>
      <div className={classes.purpleSection}>
        <h4 className={classes.headingStyle2}>
          Articles
        </h4>
        <p className={classes.descriptionStyle2}>
          Get the latest articles about your favorite artists.
        </p>
        <div className="articleCardsContainer">
          <img src="images/landing/article-cards.png" title="Articles" />
        </div>
      </div>
      <div className={classes.whiteSection}>
        <h4 className={classes.headingStyle1}>
          Videos
        </h4>
        <p className={classes.descriptionStyle1}>
          Get the latest videos about your favorite artists.
        </p>
        <div className="videoCardsContainer">
          <img src="images/landing/video-card.png" title="Videos" />
        </div>
      </div>
      <div className={classes.purpleSection}>
        <h4 className={classes.headingStyle2}>
          Releases
        </h4>
        <p className={classes.descriptionStyle2}>
          Get the latest releases by your favorite artists.
        </p>
        <div className="albumCardContainer">
          <img src="images/landing/album-card.png" title="Album" />
        </div>
      </div>
      <div className={classes.eventsSection}>
        <h4 className={classes.headingStyle1}>
          Events
        </h4>
        <p className={classes.descriptionStyle1}>
          Know when your favorite artists are in town.
        </p>
        <div className="eventsCardContainer">
          <img src="images/landing/event-cards.png" title="Events" />
        </div>
        <div className="ctaContainer">
          <a className={classes.ctaPurple}>Chune In</a>
        </div>
      </div>
      <footer className={classes.footer}>
        <div className="footerContainer">
          <div className="leftSection">
            <img src="images/landing/footer-logotype.png" title="Chune Inc Logo" />
          </div>
          <div className="rightSection">
            <div>
              <a href="/privacy" className="navLink">Privacy Policy</a>
              <a href="/terms-of-use" className="navLink">Terms of Use</a>
              <a href="/faq" className="navLink">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default withStyles(styles)(Landing);
