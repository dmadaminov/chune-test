import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import { timestampToDate } from '../../helpers/populateArticles';

const styles = () => ({
  root: {
    maxWidth: 643,
    width: 643,
    height: 254,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    border: 'solid 1px rgba(0, 0, 0, 0.12)',
    margin: '0 auto',
    '@media (max-width: 1023px)': {
      width: 344,
      height: 384,
      flexDirection: 'column',
      margin: '0 auto',
    }
  },
  media: {
    height: 254,
    width: 254,
    '@media (max-width: 1023px)': {
      width: 344,
      height: 194,
    }
  },
  dialogMedia: {
    height: 254,
    width: '100%',
    '@media (max-width: 1023px)': {
      width: '100%',
      height: 194,
    }
  },
  modalCardBody: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },
  rightContainer: {
    width: 413,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (max-width: 1023px)': {
      width: 312,
      height: 190,
    }
  },
  cardBody: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 24,
    paddingRight: 24,
    margin: 0,
  },
  articleSource: {
    marginTop: 16,
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
  articleDate: {
    marginTop: 16,
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
  artistName: {
    fontSize: 12,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.33,
    letterSpacing: 2,
    color: '#6200ee',
    textTransform: 'capitalize'
  },
  headline: {
    marginTop: 5,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  articleBody: {
    marginTop: 22,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.43,
    letterSpacing: 0.3,
    color: 'rgba(0, 0, 0, 0.6)',
    '@media (max-width: 1023px)': {
      marginTop: 0,
    }
  },
  articleLink: {
    height: 16,
    marginTop: 70,
    marginBottom: 18,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#6200ee',
    cursor: 'pointer',
    '@media (max-width: 1023px)': {
      marginTop: 30,
    }
  }
});

const ArticleCard = ({
  classes, article, rootClassName,
  rootCardClass
}) => {
  const formattedDate = article.published_on ? timestampToDate(article.published_on) : '';

  return (
    <div className={rootClassName}>
      <Card
        classes={{ root: classes.root }}
        className={rootCardClass}
      >
        <MediaQuery minWidth={1024}>
          <CardMedia
            classes={{ root: classes.media }}
            image={`https://chune-api.herokuapp.com/static/imgs/full/${article.image}` || 'https://placeholder.com/254x254'}
            title={article.title}
          />
        </MediaQuery>
        <MediaQuery maxWidth={1023}>
          <CardMedia
            classes={{ root: classes.media }}
            image={`https://chune-api.herokuapp.com/static/imgs/small/${article.image}` || 'https://placeholder.com/344x194'}
            title={article.title}
          />
        </MediaQuery>
        <div className={classes.rightContainer}>
          <CardContent className={classes.cardBody}>
            <Typography gutterBottom variant="headline" component="p" className={classes.articleSource}>
              { `via ${article.source_name} · `}
              <span className={classes.articleDate}>
                { `${formattedDate}`}
              </span>
              <MediaQuery minWidth={1024}> · </MediaQuery>
              <MediaQuery maxWidth={1023}><br /></MediaQuery>
              <span>
                <Link to={`/Artist/${encodeURI(article.artist_name)}`} className={classes.artistName}>
                  { article.artist_name }
                </Link>
              </span>
            </Typography>
            <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
              { article.title }
            </Typography>
            <Typography component="p" className={classes.articleBody} />
          </CardContent>
          <CardActions className={classes.cardBody}>
            <Typography component="a" href={article.url} target="_blank" className={classes.articleLink}>
              Read More
            </Typography>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export const ArticleCardConnect = withStyles(styles)(ArticleCard);
