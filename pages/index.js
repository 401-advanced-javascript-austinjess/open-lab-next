import React from 'react';

import Link from 'next/link';
import axios from 'axios';
let dog = 'hello';

const USERNAME = '4498f76b-695d-4832-a187-2a0f81';
const PASSWORD = '*7P%Wo9%hwUl';
const URL =
  'https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=20190718';

class Index extends React.Component {
  state = {
    homeTeams: this.props.home
  };

  static async getInitialProps() {
    const res = await axios.get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD
      }
    });

    return {
      data: JSON.stringify(res.data.dailygameschedule.gameentry),
      away: res.data.dailygameschedule.gameentry.map((game) =>
        JSON.stringify(game.awayTeam)
      ),
      home: res.data.dailygameschedule.gameentry.map((game) => game.homeTeam)
    };
  }

  render() {
    console.log({ homeTeams: this.state.homeTeams });
    return (
      <>
        <pre>{this.props.data}</pre>

        <ul>
          {this.state.homeTeams.map((game, idx) => (
            <li key={idx}>
              <p>{game.City}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Index;
