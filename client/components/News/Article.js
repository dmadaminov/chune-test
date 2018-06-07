import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { timestampToDate } from '../../helpers/populateArticles'


const styles = theme => {
  return {
    root: {
      maxWidth: 716,
      width: 716,
      height: 254,
      display: "flex",
      flexDirection: "row",
      borderRadius: 4,
      backgroundColor: "#ffffff",
      border: "solid 1px rgba(0, 0, 0, 0.12)",
    },
    media: {
      height: 254,
      width: 254,
    },
    rightContainer: {
      width: 413,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cardBody: {
      width: "100%",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 24,
      paddingRight: 24,
      margin: 0,
    },
    articleSource: {
      marginTop: 16,
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'uppercase'
    },
    articleDate: {
      marginTop: 16,
      fontFamily: "NotoSansRunic",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'uppercase'
    },
    artistName: {
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "#6200ee",
      textTransform: 'capitalize'
    },
    headline: {
      marginTop: 5,
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.87)",
    },
    articleBody: {
      marginTop: 22,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.43,
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.6)",
    },
    articleLink: {
      height: 16,
      marginTop: 70,
      marginBottom: 18,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.14,
      letterSpacing: 1.3,
      textAlign: "center",
      textTransform: "uppercase",
      color: "#6200ee",
    }
  };
};

const ArticleCard = (props) => {
  const { classes, article } = props;
  let formattedDate = article.date ? timestampToDate(article.date) : '';

  return (
    <div>
      <Card classes={ {root: classes.root} }>
        <CardMedia
          classes={ {root: classes.media} }
          image={ article.image || "https://placeholder.com/254x254" }
          title="Contemplative Reptile"
          />
          <div className={classes.rightContainer}>
            <CardContent className={classes.cardBody}>
              <Typography gutterBottom variant="headline" component="p" className={classes.articleSource}>
                { `via ${ article.source } . `}
                <span className={classes.articleDate}>
                  { `${ formattedDate } . `}
                </span>
                <span>
                  <a href={"/Artist?n="+encodeURI(article.artist)} className={classes.artistName}>
                    { article.artist }
                  </a>
                </span>
              </Typography>
              <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
                { article.title }
              </Typography>
              <Typography component="p" className={ classes.articleBody }>

              </Typography>
            </CardContent>
            <CardActions className={ classes.cardBody }>
              <Typography component="a" href={ article.url } className={ classes.articleLink }>
                Read More
              </Typography>
            </CardActions>
          </div>
      </Card>
    </div>
  );
}

ArticleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleCard);