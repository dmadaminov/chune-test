import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { objectOf, any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import { filterEventsWithinTwoMonths, anyNearByEventsWithinTwoMonths } from '../../helpers/eventHelpers';
import { getEventsArtist } from '../../store/events/actions';

const styles = () => ({
  root: {
    maxWidth: 343,
    width: 343,
    height: 128,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    boxShadow: 'none'
  },
  media: {
    height: 128,
    width: 128,
  },
  rightContainer: {
    width: 215,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  cardBody: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
    margin: 0,
    height: 80,
  },
  artistName: {
    marginTop: 17,
    marginBottom: 0,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  eventStatusNo: {
    marginBottom: 0,
    marginTop: 4,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.33,
    letterSpacing: 2,
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'uppercase'
  },
  eventStatusYes: {
    marginBottom: 0,
    marginTop: 4,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.33,
    letterSpacing: 2,
    color: 'rgba(255, 18, 112, 0.87)',
    textTransform: 'uppercase'
  },
  detailLink: {
    marginTop: 15,
    marginLeft: 0,
    padding: 0,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'left',
    color: '#6200ee',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  progress: {

  },
});


const EventStatus = (props) => {
  const {
    events, eventsLoading, artist,
    geolocation, classes
  } = props;

  const getEventsForArtist = (events, artist) => {
    const event = events.filter(e => e.artistId === artist.artistId)[0];
    if (event) {
      return event.events;
    }
    return [];
  };

  const eventsForArtist = getEventsForArtist(events, artist);

  if (eventsLoading) {
    return <LinearProgress className={classes.progress} color="primary" size={20} />;
  }
  if (eventsForArtist.length === 0) {
    return (
      <Typography gutterBottom variant="headline" component="h2" className={classes.eventStatusNo}>
        NO EVENTS
      </Typography>
    );
  }
  if (geolocation.latitude) {
    const hasEventSoon = anyNearByEventsWithinTwoMonths(eventsForArtist, geolocation);
    if (hasEventSoon) {
      return (
        <Typography gutterBottom variant="headline" component="h2" className={classes.eventStatusYes}>
          SOON NEAR YOU
        </Typography>
      );
    }
    return (
      <Typography gutterBottom variant="headline" component="h2" className={classes.eventStatusNo}>
        NO EVENTS NEARBY
      </Typography>
    );
  }
  if (filterEventsWithinTwoMonths(events).length === 0) {
    return (
      <Typography gutterBottom variant="headline" component="h2" className={classes.eventStatusNo}>
        NO EVENTS
      </Typography>
    );
  }
  return (
    <Typography gutterBottom variant="headline" component="h2" className={classes.eventStatusNo} />
  );
};

const EventCard = (props) => {
  const {
    classes, artist, getEvents
  } = props;
  const current = new Date();
  const startDate = current.toISOString().substring(0, 10);
  const d = new Date();
  d.setDate(d.getDate() + 90);
  const endDate = d.toISOString().substring(0, 10);
  return (
    <div>
      <Card classes={{ root: classes.root }}>
        <CardMedia
          classes={{ root: classes.media }}
          image={artist.image_url || 'https://via.placeholder.com/254x254'}
          title={artist.name}
        />
        <div className={classes.rightContainer}>
          <CardContent className={classes.cardBody}>
            <Typography gutterBottom variant="headline" component="p" className={classes.artistName}>
              { artist.name }
            </Typography>
            <EventStatus {...props} />
          </CardContent>
          <CardActions className={classes.cardBody}>
            <button type="button" className={classes.detailLink} onClick={() => getEvents(artist.id, startDate, endDate, artist.name)}>SEE EVENTS</button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

const mapActionsToProps = dispatch => bindActionCreators({
  getEvents: getEventsArtist
}, dispatch);

export const EventCardConnect = withStyles(styles)(connect(null, mapActionsToProps)(EventCard));

EventCard.propTypes = {
  classes: objectOf(any).isRequired,
};
