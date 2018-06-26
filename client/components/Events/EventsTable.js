import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { isNearByEvent, truncateWithEllipses } from '../../helpers/eventHelpers';
import MediaQuery from 'react-responsive';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => {
  return {
    root: {
      width: 716,
      height: 278,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      '@media (max-width: 1023px)': {
        width: '100vw',
      }
    },
    tableContainer: {
      width: 716,
      backgroundColor: "#ffffff",
      border: 'none',
      '@media (max-width: 1023px)': {
        width: '100vw',
      }
    },
    table: {
      minWidth: 716,
      '@media (max-width: 1023px)': {
        width: '100vw',
        minWidth: 345,
      }
    },
    active: {
      backgroundColor: 'rgba(255, 14, 102, 0.1)',
      height: 50,
      borderTop: 'solid 1px #eaeaea',
      '@media (max-width: 1023px)': {
        width: '100vw',
      }
    },
    tbody: {
      '@media (max-width: 1023px)': {
        width: '100vw',
      }
    },
    normal: {
      height: 50,
      borderTop: 'solid 1px #eaeaea',
      '@media (max-width: 1023px)': {
        width: '100vw',
      }
    },
    eventDateCell: {
      width: 263,
      height: 11,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 0.79,
      letterSpacing: 0,
      textAlign: "left",
      borderRadius: 0,
      color: "#000000",
      '@media (max-width: 1023px)': {
        width: 127,
        paddingLeft: 16,
        paddingRight: 2,
      }
    },
    eventVenueCell: {
      width: 263,
      height: 11,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 0.79,
      letterSpacing: 0,
      textAlign: "right",
      borderRadius: 0,
      color: "#000000",
      '@media (max-width: 1023px)': {
        width: 176,
        paddingLeft: 5,
        paddingRight: 0,
        textAlign: "left",
      }
    },
    ticketCell: {
      width: 68,
      borderRadius: 0,
      '@media (max-width: 1023px)': {
        width: 24,
        paddingLeft: 0,
        textAlign: "left",  
        '&:last-child': {
          paddingRight: 16,
        }
      }
    },
    ticketLink: {
      marginTop: 33,
      marginLeft: 0,
      padding: 0,
      height: 11,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 0.79,
      letterSpacing: 1.3,
      textAlign: "right",
      color: "#6200ee",
      textTransform: 'uppercase',
      cursor: "pointer",
      width: 67.2,
      '@media (max-width: 1023px)': {
        width: 24,
        paddingLeft: 6,
        textAlign: "left",
        color: "rgba(0, 0, 0, 0.54)",
      }
    }
  };
};

const renderTicketLink = (classes, event) => {
  return (
    <React.Fragment>
      <MediaQuery minWidth={1024}>
        <a href={event.offers[0].url} className={classes.ticketLink} target="_blank">TICKETS</a>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <a href={event.offers[0].url} className={classes.ticketLink} target="_blank">
          <ShoppingCartIcon />
        </a>
      </MediaQuery>
    </React.Fragment>
  );
}

const EventsTable = (props) => {
  const { classes, events, unfollowHandler, followHandler, geolocation } = props;

  const sortedEvents = events.sort((x, y) => {
    //ascending sorting
    return new  Date(x.datetime) - new Date(y.datetime) 
  })

  console.log("Sorted Events", sortedEvents);

  return (
    <Paper className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody className={classes.tbody}>
          {sortedEvents.map(event => {
            return (
              <TableRow key={event.id} className={isNearByEvent(event, geolocation) ? classes.active : classes.normal}>
                <TableCell className={classes.eventDateCell}>
                  <MediaQuery minWidth={1024}>
                    { moment(event.datetime).format("dddd, MMMM Do, YYYY") }
                  </MediaQuery>
                  <MediaQuery maxWidth={1023}>
                    { moment(event.datetime).format("MMM D, YYYY") }
                  </MediaQuery>
                </TableCell>
                <TableCell className={classes.eventVenueCell}>
                  <MediaQuery minWidth={1024}>
                    { truncateWithEllipses(`${event.venue.name}, ${event.venue.city}, ${event.venue.region}, ${event.venue.country}`, 25) }
                  </MediaQuery>
                  <MediaQuery maxWidth={1023}>
                    { truncateWithEllipses(`${event.venue.name}, ${event.venue.city}`, 25) }
                  </MediaQuery>
                </TableCell>
                <TableCell className={classes.ticketCell}>
                  {
                    event.offers && event.offers[0]
                    ? renderTicketLink(classes, event)
                    : ''
                  }
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

EventsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsTable);