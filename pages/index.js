import React from 'react';

import Link from 'next/link';
import axios from 'axios';

const USERNAME = '4498f76b-695d-4832-a187-2a0f81';
const PASSWORD = '*7P%Wo9%hwUl';
const URL =
  'https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=20190718';

class Index extends React.Component {
  state = {
    games: this.props.games
  };

  static async getInitialProps() {
    const res = await axios.get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD
      }
    });

    return {
      games: res.data.dailygameschedule.gameentry.map((game) => [
        game.homeTeam,
        game.awayTeam
      ])
    };
  }

  render() {
    return (
      <>
        <form>
          {this.state.games.map((game, idx) => (
            <div key={idx}>
              <label>{game[0].Name}</label>
              <input name="match" type="radio" value={game[0].Name} />
              <label>{game[1].Name}</label>
              <input name="match" type="radio" value={game[1].Name} />
            </div>
          ))}
          <input type="submit" />
        </form>
      </>
    );
  }
}

export default Index;
