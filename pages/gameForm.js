import React from 'react';

import Link from 'next/link';
import axios from 'axios';

// import '../styles/base.scss';

const USERNAME = '4498f76b-695d-4832-a187-2a0f81';
const PASSWORD = '*7P%Wo9%hwUl';
const URL =
  'https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=20190718';

class GameForm extends React.Component {
  state = {
    games: this.props.games,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  static async getInitialProps() {
    const res = await axios.get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    return {
      games: res.data.dailygameschedule.gameentry.map(game => [
        game.homeTeam,
        game.awayTeam,
      ]),
    };
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <section className="game-inputs">
            {this.state.games.map((game, idx) => (
              <div className="matchup" key={idx}>
                <div className="team">
                  <div className="team-info">
                    <img
                      src={`static/team-logos/${game[0].Abbreviation.toLowerCase()}.png`}
                    />
                    <label>{game[0].Name}</label>
                  </div>
                  <input
                    name={`match${game[0].ID}`}
                    type="radio"
                    value={game[0].Name}
                  />
                </div>
                <div className="team">
                  <div className="team-info">
                    <img
                      src={`static/team-logos/${game[1].Abbreviation.toLowerCase()}.png`}
                    />
                    <label>{game[1].Name}</label>
                  </div>
                  <input
                    name={`match${game[0].ID}`}
                    type="radio"
                    value={game[1].Name}
                  />
                </div>
              </div>
            ))}
          </section>
          <input type="submit" />
        </form>
        <style jsx>
          {`
          form {
            width: 600px;
            margin: 0 auto;
            overflow: hidden;
            text-align: center;
          }

          section {
            display: flex;
            flex-flow: wrap;
            justify-content: space-evenly;
          }

          .matchup {
            margin: 60px 20px;
          }

          .team {
            display flex;
            align-items: center;
            width: 100%;
          }

          .team-info {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          input[type="radio"] {
            float: right;
            clear: both;
          }

          input[type="submit"] {
            margin: 0 auto;
          }

          img {
            width: 40px;
            margin: 10px 0;
            display: block;
          }
        `}
        </style>
      </>
    );
  }
}

export default GameForm;
