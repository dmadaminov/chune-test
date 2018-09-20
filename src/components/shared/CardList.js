import React from 'react'

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import VideoCard from '../Videos/Video'
import ArticleCard from '../News/Article'

import NoMedia from './NoMedia'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',  },
  gridList: {
    width: 716,
    borderRadius: 4,
  },
  gridRow: {
    height: "auto",
    marginBottom: 24,
    width: '100%'
  },
  container: {
    backgroundColor: "#fafafa",
    width: '100%',
    paddingTop: 24,
  }
});

const CardList = (props) => {
  const { items, classes, filter } = props;
  if(items.length == 0) {
    return <NoMedia />
  }
  return (
    <div className={classes.root}>
      <ul className={classes.gridList}>
        {
          items.map(item => {
            return (
              <li className={classes.gridRow} key={`${item.url}::${item.ID}`} >
                {
                  (item.isVideo)
                  ? <VideoCard video={item} autoplay={false}/>
                  : <ArticleCard article={item} />
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default withStyles(styles)(CardList);