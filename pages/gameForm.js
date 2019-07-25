import React from 'react';

import Link from 'next/link';
import axios from 'axios';
import moment from 'moment';
import Results from './results';

const date = moment().format('YYYYMMDD');

const USERNAME = '4498f76b-695d-4832-a187-2a0f81';
const PASSWORD = '*7P%Wo9%hwUl';
const URL = `https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=${date}`;

class GameForm extends React.Component {
  state = {
    games: this.props.games,
    userPicks: [],
    isSubmitted: false,
    teamNames: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userPicks', JSON.stringify(this.state.userPicks));
    this.setState({ isSubmitted: true });
  };

  handleInput = (e) => {
    const {
      value: team,
      dataset: { gameId, teamName },
    } = e.target;

    this.setState((state) => {
      return {
        userPicks: {
          ...state.userPicks,
          [gameId]: team,
        },
        teamNames: [...state.teamNames, teamName],
      };
    });
  };

  static async getInitialProps() {
    const res = await axios.get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    return {
      games: res.data.dailygameschedule.gameentry,
    };
  }

  render() {
    return (
      <>
        {!this.state.isSubmitted && (
          <>
            <h4>Pick Your Winners</h4>
            <form onSubmit={this.handleSubmit}>
              <input value="SUBMIT PICKS" type="submit" />
              <section className="game-inputs">
                {this.state.games.map(({ id, homeTeam, awayTeam }, idx) => (
                  <div className="matchup" key={idx}>
                    <div className="team">
                      <div className="team-info">
                        <img
                          src={`static/team-logos/${homeTeam.Abbreviation.toLowerCase()}.png`}
                        />
                        <label>{homeTeam.Name}</label>
                      </div>
                      <input
                        name={`match${id}`}
                        data-game-id={id}
                        data-team-name={homeTeam.Name}
                        type="radio"
                        value={homeTeam.ID}
                        checked={this.state.userPicks[id] === homeTeam.ID}
                        onChange={this.handleInput}
                      />
                    </div>
                    <div className="team">
                      <div className="team-info">
                        <img
                          src={`static/team-logos/${awayTeam.Abbreviation.toLowerCase()}.png`}
                        />
                        <label>{awayTeam.Name}</label>
                      </div>
                      <input
                        name={`match${id}`}
                        data-game-id={id}
                        data-team-name={awayTeam.Name}
                        type="radio"
                        value={awayTeam.ID}
                        checked={this.state.userPicks[id] === awayTeam.ID}
                        onChange={this.handleInput}
                      />
                    </div>
                  </div>
                ))}
              </section>
            </form>
          </>
        )}
        {this.state.isSubmitted && <Results teamNames={this.state.teamNames} />}
        <style jsx>
          {`
          h2, h4 {
            text-align: center;
            text-decoration: underline;
            font-size: 2rem;
          }

          form {
            width: 1000px;
            margin: 0 auto;
            text-align: center;
          }

          section {
            margin-bottom: 40px;
          }

          .matchup {
            display: inline-block;
            margin: 20px;
            background: #E7E7E7;
            padding: 20px 30px;
            border-radius: 5px;
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
            width: 90px;
          }

          input[type="radio"] {
            float: right;
            clear: both;
          }

          input[type="submit"] {
            margin: 20px auto;
            font-size: 1.3rem;
            padding: 15px 20px;
            border: none;
            color: white;
            background-color: #3EDB61;
            border-radius: 3px;
            cursor: pointer;
          }

          label {
            font-size: 1.2rem;
          }

          img {
            width: 40px;
            margin: 10px 0;
            display: block;
          }

          .picked {
            color: #3EDB61;
          }
        `}
        </style>
      </>
    );
  }
}

export default GameForm;
