import React from 'react';
import moment from 'moment';
import { objectOf, any, arrayOf } from 'prop-types';
import MediaQuery from 'react-responsive';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { isNearByEvent } from '../../helpers/eventHelpers';

const styles = () => ({
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
    backgroundColor: '#ffffff',
    border: 'none',
    boxShadow: 'none',
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
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 0.79,
    letterSpacing: 0,
    textAlign: 'left',
    borderRadius: 0,
    color: '#000000',
    '@media (max-width: 1023px)': {
      width: 127,
      paddingLeft: 16,
      paddingRight: 2,
    }
  },
  eventVenueCell: {
    width: 263,
    height: 22,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.25,
    letterSpacing: 0,
    textAlign: 'right',
    borderRadius: 0,
    color: '#000000',
    '@media (max-width: 1023px)': {
      width: 176,
      paddingLeft: 5,
      paddingRight: 0,
      textAlign: 'left',
    }
  },
  ticketCell: {
    width: 68,
    borderRadius: 0,
    '@media (max-width: 1023px)': {
      width: 24,
      paddingLeft: 0,
      textAlign: 'left',
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
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 0.79,
    letterSpacing: 1.3,
    textAlign: 'right',
    color: '#6200ee',
    textTransform: 'uppercase',
    cursor: 'pointer',
    width: 67.2,
    '@media (max-width: 1023px)': {
      width: 24,
      paddingLeft: 6,
      textAlign: 'left',
      color: 'rgba(0, 0, 0, 0.54)',
    }
  }
});

const renderTicketLink = (classes, event) => (
  <React.Fragment>
    <MediaQuery minWidth={1024}>
      <a href={event.offers[0].url} className={classes.ticketLink} rel="noopener noreferrer" target="_blank">TICKETS</a>
    </MediaQuery>
    <MediaQuery maxWidth={1023}>
      <a href={event.offers[0].url} className={classes.ticketLink} rel="noopener noreferrer" target="_blank">
        <ShoppingCartIcon />
      </a>
    </MediaQuery>
  </React.Fragment>
);

const EventsTable = (props) => {
  const { classes, events, geolocation } = props;

  const formatEventVenue = (venue) => {
    let venueStr = `${venue.name}, ${venue.city}`;
    if (venue.region) {
      venueStr = venueStr.concat(`, ${venue.region}`);
    }
    if (venue.country) {
      venueStr = venueStr.concat(`, ${venue.country}.`);
    }
    return venueStr;
  };
  return (
    <Paper className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableBody className={classes.tbody}>
          {events.map(event => (
            <TableRow key={event.id} className={isNearByEvent(event.venue, geolocation) ? classes.active : classes.normal}>
              <TableCell className={classes.eventDateCell}>
                <MediaQuery minWidth={1024}>
                  { moment(event.datetime).format('dddd, MMMM Do, YYYY') }
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  { moment(event.datetime).format('MMM D, YYYY') }
                </MediaQuery>
              </TableCell>
              <TableCell className={classes.eventVenueCell}>
                <MediaQuery minWidth={1024}>
                  {formatEventVenue(event.venue)}
                </MediaQuery>
                <MediaQuery maxWidth={1023}>
                  {formatEventVenue(event.venue)}
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
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

EventsTable.propTypes = {
  classes: objectOf(any).isRequired,
  events: arrayOf(any).isRequired,
  geolocation: objectOf(any).isRequired
};

export const EventsTableConnect = withStyles(styles)(EventsTable);
