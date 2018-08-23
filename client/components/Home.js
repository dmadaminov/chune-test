import React from 'react'
import { map } from 'lodash';
import moment from 'moment';

// MUI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Custom components
import Navbar from './Navbar';
import { BasicArticleCard } from './blocks';
import VideoCard from './Videos/Video';

// Custom style
import mainStyles from './Home.css';

export default class Home extends React.Component {
  render() {

    const mainArticle = {
      id: 10,
      image: 'https://www.billboard.com/files/styles/article_main_image/public/media/shakira-june-2018-billboard-1548.jpg',
      title: 'Smino Brings Out T-Pain For Epic "Chopped N Skrewed" Performance In Atlanta',
      resourceName: 'hotnewhiphop',
    };

    const articles = [
      {
        id: 1,
        image: "https://www.billboard.com/files/styles/1024x577/public/media/Gerard-Pique-of-FC-Barcelona-and-Shakira-2015-billboard-1548.jpg",
        title: "Shakira Supports Gerard Pique's Retirement With Beautiful Message on Instagram",
        resourceName: 'Billboard',
      },
      {
        id: 2,
        image: 'https://www.billboard.com/files/styles/1024x577/public/media/carlos-vives-shakira-La-Bicicleta-2016-billboard-1548.jpg',
        title: 'The 10 Best Latin Summer Songs Ever',
        resourceName: 'Billboard',
      },
      {
        id: 3,
        image: 'https://www.billboard.com/files/styles/1024x577/public/media/Shakira-Maluma-Clandestino-screenshot-2018-billboard-1548.jpg',
        title: "Shakira and Maluma's 'Clandestino' Hits Hot Latin Songs Chart's Top 10",
        resourceName: 'Billboard',
      }
    ];

    const items = [
      {
        ID: 1,
        date: moment(),
        source: 'YouTube',
        title: 'Test 1',
        artists: [
          'Dermot Kennedy',
          'Dermot Kennedy 2',
        ],
        image: 'https://www.billboard.com/files/media/Dermot-Kennedy-2018-cr-Jack-Mckain-billboard-1548.jpg',
        url: 'https://www.youtube.com/watch?v=hB2sUXd3eVg',
        isVideo: true,
      },
      {
        ID: 2,
        date: moment(),
        source: 'SomeSongMedia',
        title: 'Test 2',
        artists: [
          'Dermot Kennedy',
          'Dermot Kennedy 2',
        ],
        image: 'https://www.billboard.com/files/media/Dermot-Kennedy-2018-cr-Jack-Mckain-billboard-1548.jpg',
        url: 'https://www.youtube.com/watch?v=rK6aMP-c8Gs',
        isVideo: true,
      }
    ]

    return (
      <div>
        <Navbar value={0} />

        <div className='homePageWrapper'>
          <div className='mainArticle'>
            <BasicArticleCard
              image={mainArticle.image}
              title={mainArticle.title}
              resourceName={mainArticle.resourceName}
            />
          </div>

          <div className='otherMainArticles'>
            {map(articles, (article) => (
              <BasicArticleCard
                key={article.id}
                image={article.image}
                title={article.title}
                resourceName={article.resourceName}
              />
            ))}
          </div>

          <div className='otherMainArticlesMobile'>

            {map(articles, (article) => (
              <Card className='root' key={article.id}>
                <CardMedia
                  className='media'
                  image={article.image}
                  title={article.title}
                />
                <div className='rightContainer'>
                  <CardContent className='cardBody'>
                    <Typography
                      className='articleSource'
                      gutterBottom
                      variant='headline'
                      component='p'
                    >
                      via {article.resourceName}
                    </Typography>

                    <Typography
                      className='headline'
                      gutterBottom
                      variant='headline'
                      component='h2'
                    >
                      {article.title}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            ))}

          </div>

          <div className='gridWrapper'>
            <Grid container spacing={24}>
              <Grid item xs={12} md={8} lg={8}>
                {map(items, (item) =>(
                  <VideoCard
                    id={item.ID}
                    rootClassName='homePagePlayerWrapper'
                    videoControlerClass='homePagePlayer'
                    video={item}
                    autoplay={false}
                  />
                ))}
              </Grid>
              <Grid item xs={12} md={4} lg={4} className='rightGridListWrapper'>
                <Paper className='rightGridList'>
                  TOP TRACKS CHART
                </Paper>
              </Grid>
            </Grid>
          </div>

        </div>

      </div>
    )
  }
}