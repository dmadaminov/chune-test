import React from 'react';
import { map, findIndex } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TweetEmbed from 'react-tweet-embed';
// MUI components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Custom components - blocks
import {
  BasicArticleCard, TopTracksChartConnect, ChuneSupply,
  BasicSoundPlayer
} from './blocks';
// Custom components - old flaw declared
import VideoCard from './Videos/Video';
import ArticleCard from './News/Article';
import { topTracks } from '../store/musicPlayer/topTracks/topTracks';
import { playMusicPlayer, pauseMusicPlayer } from '../store/musicPlayer/actions';

// Custom style
import './Home.css';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      topTrackPlayId: null,
      playSupplyId: null,
      playlist: [
        {
          id: 1,
          title: 'Frontera/Trigger 10',
          artist: 'Billy Corgan',
          url: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          image: 'https://www.billboard.com/files/media/Dermot-Kennedy-2018-cr-Jack-Mckain-billboard-1548.jpg'
        },
        {
          id: 2,
          title: 'Frontera/Trigger 20',
          artist: 'Billy Corgan',
          url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
          image: 'https://www.billboard.com/files/styles/article_main_image/public/media/shakira-june-2018-billboard-1548.jpg',
        },
        {
          id: 3,
          title: 'Frontera/Trigger 30',
          artist: 'Billy Corgan',
          url: 'http://media.w3.org/2010/05/bunny/movie.mp4?a=2',
          image: "https://www.billboard.com/files/styles/1024x577/public/media/Gerard-Pique-of-FC-Barcelona-and-Shakira-2015-billboard-1548.jpg",
        },
      ],
    };
  }

  handleTopTrackPlay = (id, play) => {
    const playId = play ? id : null;
    if (playId) {
      const { playMusicPlayer } = this.props;
      playMusicPlayer(playId);
    } else {
      const { pauseMusicPlayer } = this.props;
      pauseMusicPlayer(playId);
    }
    this.setState({
      topTrackPlayId: playId,
      playSupplyId: null,
    });
  };

  handleSupplyPlay = (id, play) => {
    this.setState({
      playSupplyId: id,
      topTrackPlayId: null,
    });
  };

  handlePrevSupplyMedia = () => {
    const { playlist, playSupplyId } = this.state;
    const playSupplyIndex = findIndex(playlist, (o) => (o.id === playSupplyId) );
    let prevSupply;
    if (playSupplyIndex === 0) {
      // get last
      prevSupply = playlist[playlist.length - 1];
    } else {
      // get prev
      prevSupply = playlist[playSupplyIndex - 1];
    }

    this.setState({
      playSupplyId: prevSupply.id,
      topTrackPlayId: null,
    });
  };

  handleNextSupplyMedia = () => {
    const { playlist, playSupplyId } = this.state;
    const playSupplyIndex = findIndex(playlist, (o) => (o.id === playSupplyId) );
    let nextSupply;
    if (playSupplyIndex === playlist.length - 1) {
      // get first
      nextSupply = playlist[0];
    } else {
      // get next
      nextSupply = playlist[playSupplyIndex + 1];
    }

    this.setState({
      playSupplyId: nextSupply.id,
      topTrackPlayId: null
    });
  };

  render() {
    const { topTrackPlayId, playSupplyId, playlist } = this.state;

    const mainArticle = {
      id: 10,
      image: 'https://www.billboard.com/files/styles/article_main_image/public/media/shakira-june-2018-billboard-1548.jpg',
      title: 'Smino Brings Out T-Pain For Epic "Chopped N Skrewed" Performance In Atlanta',
      source: 'hotnewhiphop',
    };

    const otherMainArticles = [
      {
        id: 1,
        image: "https://www.billboard.com/files/styles/1024x577/public/media/Gerard-Pique-of-FC-Barcelona-and-Shakira-2015-billboard-1548.jpg",
        title: "Shakira Supports Gerard Pique's Retirement With Beautiful Message on Instagram",
        source: 'Billboard',
      },
      {
        id: 2,
        image: 'https://www.billboard.com/files/styles/1024x577/public/media/carlos-vives-shakira-La-Bicicleta-2016-billboard-1548.jpg',
        title: 'The 10 Best Latin Summer Songs Ever',
        source: 'Billboard',
      },
      {
        id: 3,
        image: 'https://www.billboard.com/files/styles/1024x577/public/media/Shakira-Maluma-Clandestino-screenshot-2018-billboard-1548.jpg',
        title: "Shakira and Maluma's 'Clandestino' Hits Hot Latin Songs Chart's Top 10",
        source: 'Billboard',
      },
    ];

    const otherArticles = [
      {
        id: 1,
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
        id: 2,
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
      },
      {
        id: 3,
        date: moment(),
        image: 'https://www.billboard.com/files/media/Dermot-Kennedy-2018-cr-Jack-Mckain-billboard-1548.jpg',
        title: 'Dermot Kennedy Premieres Chilling "Glory" Video Live in Dublin, Announces North American Tour Dates',
        source: 'Billboard',
      },
      {
        id: 4,
        date: moment(),
        image: 'https://www.billboard.com/files/media/Dermot-Kennedy-2018-cr-Jack-Mckain-billboard-1548.jpg',
        title: "Dermot Kennedy Premieres Chilling 'Glory' Video Live in Dublin, Announces North American Tour Dates",
        source: 'Billboard',
      },
    ];

    const tweets = [
      {
        id: '1031571649429221376',
      },
      {
        id: '1032707634787442688',
      },
    ];

    // let audioPlayerControllerPlaylist;
    // let selectedRecord;

    // For large media player with overlay
    // if (topTrackPlayId) {
    //   audioPlayerControllerPlaylist = topTracks;
    //   selectedRecord = find(topTracks, (o) => (o.id === topTrackPlayId) );
    // } else if (playSupplyId) {
    //   audioPlayerControllerPlaylist = playlist;
    //   selectedRecord = find(playlist, (o) => (o.id === playSupplyId) );
    // }

    // For small media player - BLOCKED WITH null VALUE for now, since large player opening on all media play
    let playSupply;
    if (playSupplyId) {
      // playSupply = find(playlist, (o) => (o.id === playSupplyId) );
    }
    console.log('home');
    return (
      <div>
        
        <div className='homePageWrapper'>
          <div className='mainArticle'>
            <BasicArticleCard
              image={mainArticle.image}
              title={mainArticle.title}
              source={mainArticle.source}
            />
          </div>

          <div className='otherMainArticles'>
              {map(otherMainArticles, (article) => (    
                  <BasicArticleCard
                    key={article.id}
                    image={article.image}
                    title={article.title}
                    source={article.source}
                  />
              ))}
          </div>

          <div className='otherMainArticlesMobile'>
            {map(otherMainArticles, (article) => (
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
                      via {article.source}
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
                {map(otherArticles, (article) => (
                  article.isVideo ? (
                    <VideoCard
                      key={`${article.id}-video`}
                      rootClassName='homePagePlayerWrapper'
                      videoControlerClass='homePagePlayer'
                      video={article}
                      autoplay={false}
                    />
                  ) : (
                    <div key={`${article.id}-article-mobile`}>
                      <ArticleCard
                        key={`${article.id}-article`}
                        rootClassName='homePageOtherArticleWrapper'
                        rootCardClass='homePageOtherArticle'
                        article={article}
                        showReadMore={false}
                      />

                      <div className='otherMainArticlesMobile' key={`${article.id}-mobile`}>
                        <Card className='root'>
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
                                via {article.source}
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
                      </div>
                    </div>
                  )
                ))}

                <div className='embededTwitterWrapper'>
                  {map(tweets, (tweet) => (
                      <TweetEmbed
                        key={tweet.id}
                        id={tweet.id}
                        className='singleTweet'
                        options={{width: 2000}}
                      />
                  ))}
                </div>

              </Grid>
              <Grid item xs={12} md={4} lg={4} className='rightGridListWrapper'>
                <TopTracksChartConnect
                  tracks={topTracks}
                  playing={topTrackPlayId}
                  onPlayPause={this.handleTopTrackPlay}
                />

                <BasicSoundPlayer
                  source={playSupply ? playSupply.url : null}
                  onPrev={this.handlePrevSupplyMedia}
                  onNext={this.handleNextSupplyMedia}
                />

                <ChuneSupply
                  supplies={playlist}
                  playingSupply={playSupplyId}
                  onPlayPauseSupply={this.handleSupplyPlay}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  };
}

const mapActionsToProps = dispatch => bindActionCreators({
  playMusicPlayer,
  pauseMusicPlayer
}, dispatch);

export const HomeConnect = connect(null, mapActionsToProps)(Home);