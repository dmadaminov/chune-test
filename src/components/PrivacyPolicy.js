import React from 'react';
import Footer from './shared/Footer';
import { withStyles } from '@material-ui/core/styles';

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
 
  return (
    <React.Fragment>
      <div className={classes.contentContainer}>
        <h3>Chune Privacy Policy</h3>
        <p className="para1">
          Protecting your private information is our priority. This Statement of Privacy applies to
          chunemusicfeed.com and Chune Music Corp and governs data collection and usage. For the
          purposes of this Privacy Policy, unless otherwise noted, all references to Chune Music Corp
          include chunemusicfeed.com and Chune. The Chune website is a news and information site. By
          using the Chune website, you consent to the data practices described in this statement.
        </p>
        <br/>
        <ul>
          <li>
            <strong>Collection of your Personal Information - </strong>
            In order to better provide you with products and services offered on our Site, Chune may collect
            personally identifiable information, such as your e-mail address and/or social Media profile (through the social media site's authentication API)

            If you purchase Chune's products and services, we collect billing and credit card information. This
            information is used to complete the purchase transaction.

            We do not collect any personal information about you unless you voluntarily provide it to us.
            However, you may be required to provide certain personal information to us when you elect to use
            certain products or services available on the Site. These may include: (a) registering for an account
            on our Site; (b) entering a sweepstakes or contest sponsored by us or one of our partners; (c)
            signing up for special offers from selected third parties; (d) sending us an email message; (e)
            submitting your credit card or other payment information when ordering and purchasing products
            and services on our Site. To wit, we will use your information for, but not limited to,
            communicating with you in relation to services and/or products you have requested from us. We
            also may gather additional personal or non-personal information in the future.
          </li>
          <li>
            <strong>Use of your Personal Information - </strong>
            Chune collects and uses your personal information to operate its website(s) and deliver the
            services you have requested.
            Chune may also use your personally identifiable information to inform you of other products or
            services available from Chune and its affiliates.
          </li>
          <li>
            <strong>Sharing Information with Third Parties - </strong>
            Chune does not sell, rent or lease its customer lists to third parties.
            Chune may, from time to time, contact you on behalf of external business partners about a
            particular offering that may be of interest to you. In those cases, your unique personally identifiable
            information (e-mail, name, address, telephone number) is transferred to the third party. Chune may
            share data with trusted partners to help perform statistical analysis, send you email or postal mail,
            provide customer support, or arrange for deliveries. All such third parties are prohibited from using
            your personal information except to provide these services to Chune, and they are required to
            maintain the confidentiality of your information.
            Chune may disclose your personal information, without notice, if required to do so by law or in the
            good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply
            with legal process served on Chune or the site; (b) protect and defend the rights or property of
            Chune; and/or (c) act under exigent circumstances to protect the personal safety of users of
            Chune, or the public.
          </li>
          <li>
            <strong>Tracking User Behavior - </strong>
            Chune may keep track of the websites and pages our users visit within Chune, in order to
            determine what Chune services are the most popular. This data is used to deliver customized
            content and advertising within Chune to customers whose behavior indicates that they are
            interested in a particular subject area.
          </li>
          <li>
            <strong>Automatically Collected Information - </strong>
            Information about your computer hardware and software may be automatically collected by
            Chune. This information can include: your IP address, browser type, domain names, access times
            and referring website addresses. This information is used for the operation of the service, to
            maintain quality of the service, and to provide general statistics regarding use of the Chune website.
          </li>
          <li>
          <strong>Links - </strong>
          This website contains links to other sites. Please be aware that we are not responsible for the
          content or privacy practices of such other sites. We encourage our users to be aware when they
          leave our site and to read the privacy statements of any other site that collects personally
          identifiable information.
        </li>
          <li>
            <strong>Children Under Thirteen - </strong>
            Chune does not knowingly collect  personally identifiable information from children under the age of
            thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission
            to use this website.
          </li>
          <li>
            <strong>Opt-Out & Unsubscribe from Third Party Communications - </strong>
            We respect your privacy and give you an opportunity to opt-out of receiving announcements of
            certain information. Users may opt-out of receiving any or all communications from third-party
            partners of Chune by contacting us at billycandela7@gmail.com
          </li>
          <li>
            <strong>E-mail Communications - </strong>
            From time to time, Chune may contact you via email for the purpose of providing announcements,
            promotional offers, alerts, confirmations, surveys, and/or other general communication.
            If you would like to stop receiving marketing or promotional communications via email from
            Chune, you may opt out of such communications by clicking the UNSUBSCRIBE button.
          </li>
          <li>
            <strong>External Data Storage Sites - </strong>
            We may store your data on servers provided by third party hosting vendors with whom we have
            contracted.
          </li>
          <li>
            <strong>Changes to this Statement - </strong>
            Chune reserves the right to change this Privacy Policy from time to time. We will notify you about
            significant changes in the way we treat personal information by sending a notice to the primary
            email address specified in your account, by placing a prominent notice on our site, and/or by
            updating any privacy information on this page. Your continued use of the Site and/or Services
            available through this Site after such modifications will constitute your: (a) acknowledgment of the
            modified Privacy Policy; and (b) agreement to abide and be bound by that Policy.
          </li>
          <li>
            <strong>Contact Information - </strong>
            Chune welcomes your questions or comments regarding this Statement of Privacy. If you believe
            that Chune has not adhered to this Statement, please contact Chune at:
              Chune Music Corp
              840 S Alhambra Cir
              Coral Gables, Florida 33146
              or billycandela7@gmail.com or (305) 951-9113
          </li>
          <li>Effective as of July 05, 2018</li>
        </ul>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(PrivacyPolicy);
