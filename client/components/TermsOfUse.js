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

const TermsOfUse = props => {
  const { classes, user } = props;
  const navBar = !!(user) ? <Navbar value={false} /> : <GuestNavbar alternateColor={true} activePage="terms-of-use"/>

  return (
    <React.Fragment>
      {navBar}
      <div className={classes.contentContainer}>
        <h3>Chune Terms of Service</h3>
        <p className="para1">
          WhatsApp Inc. (“WhatsApp,” “our,” “we,” or “us”) provides messaging, Internet calling, and other services to users around the world. Please read our Terms of Service so you understand what’s up with your use of WhatsApp. You agree to our Terms of Service (“Terms”) by installing, accessing, or using our apps, services, features, software, or website (together, “Services”).
        </p>      
        <br/>
        <p className="para2">
          NO ACCESS TO EMERGENCY SERVICES: There are important differences between WhatsApp and your mobile and fixed-line telephone and SMS services. Our Services do not provide access to emergency services or emergency services providers, including the police, fire departments, or hospitals, or otherwise connect to public safety answering points. You should ensure you can contact your relevant emergency services providers through a mobile, fixed-line telephone, or other service.
        </p>
        <br/>
        <p className="para2">
          IF YOU ARE A WHATSAPP USER LOCATED IN THE UNITED STATES OR CANADA, OUR TERMS CONTAIN A BINDING ARBITRATION PROVISION, WHICH STATES THAT, EXCEPT IF YOU OPT OUT AND EXCEPT FOR CERTAIN TYPES OF DISPUTES, WHATSAPP AND YOU AGREE TO RESOLVE ALL DISPUTES THROUGH BINDING INDIVIDUAL ARBITRATION, WHICH MEANS THAT YOU WAIVE ANY RIGHT TO HAVE THOSE DISPUTES DECIDED BY A JUDGE OR JURY, AND THAT YOU WAIVE YOUR RIGHT TO PARTICIPATE IN CLASS ACTIONS, CLASS ARBITRATIONS, OR REPRESENTATIVE ACTIONS. PLEASE READ THE “SPECIAL ARBITRATION PROVISION FOR UNITED STATES OR CANADA USERS” SECTION BELOW TO LEARN MORE.
        </p>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(TermsOfUse);
