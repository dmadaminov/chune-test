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

const styles = theme => {
  return {
    root: {
      width: 716,
      height: 278,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    tableContainer: {
      width: 716,
      backgroundColor: "#ffffff",
      border: 'none',
    },
    table: {
      minWidth: 716,
    },
    active: {
      backgroundColor: 'rgba(255, 14, 102, 0.1)',
      height: 50,
      borderTop: 'solid 1px #eaeaea',
    },
    normal: {
      height: 50,
      borderTop: 'solid 1px #eaeaea',
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
      color: "#000000",
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
      color: "#000000",
    },
    ticketCell: {
      width: 68,
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
    }
  };
};

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
        <TableBody>
          {sortedEvents.map(event => {
            return (
              <TableRow key={event.id} className={isNearByEvent(event, geolocation) ? classes.active : classes.normal}>
                <TableCell className={classes.eventDateCell}>
                  { moment(event.datetime).format("dddd, MMMM Do, YYYY") }
                </TableCell>
                <TableCell className={classes.eventVenueCell}>
                  { truncateWithEllipses(`${event.venue.name}, ${event.venue.city}, ${event.venue.region}, ${event.venue.country}`, 25) }
                </TableCell>
                <TableCell className={classes.ticketCell}>
                  {
                    event.offers && event.offers[0]
                    ? <a href={event.offers[0].url} className={classes.ticketLink} target="_blank">TICKETS</a>
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