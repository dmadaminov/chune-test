import React from 'react';
import { map } from 'lodash';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import './ChuneSupply.css';

class ChuneSupply extends React.Component {
  onPlayPause = (id, play) => {
    this.props.onPlayPauseSupply(id, play);
  };

  render() {
    const { supplies, playingSupply } = this.props;
    return (
      <div className="chuneSupplyWrapper">
        <Paper className="chuneSupplyPaper">
          <h4 className="title">CHUNE SUPPLY</h4>
          <p className="subtitle">Updated every Wednesday, CHUNE SUPPLY is weekly supplying you with weekly fire.</p>

          <div className="tracksList">
            {map(supplies, (supply) => {
              const isPlaying = playingSupply === supply.spotify_id;

              return (
                <Card
                  className="card"
                  onClick={() => this.onPlayPause(supply.id, !isPlaying)}
                  key={supply.spotify_id}
                >
                  <CardMedia
                    className="cover"
                    image={supply.image}
                    title={supply.title}
                  />


                  <div className="details">
                    <CardContent className="content">
                      <Typography
                        variant="headline"
                        className="headline"
                      >
                        {supply.title}
                      </Typography>
                      <Typography
                        className="subheading"
                        variant="subheading"
                        color="textSecondary"
                      >
                        {supply.artist_name}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              );
            })}

          </div>
        </Paper>
      </div>
    );
  }
}

export const ChuneSupplyConnect = ChuneSupply;
