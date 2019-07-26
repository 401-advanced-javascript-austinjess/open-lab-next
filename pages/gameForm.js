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
                    <section className="selector">
                      <input
                        name={`match${id}`}
                        id={homeTeam.ID}
                        data-game-id={id}
                        data-team-name={homeTeam.Name}
                        type="radio"
                        value={homeTeam.ID}
                        checked={this.state.userPicks[id] === homeTeam.ID}
                        onChange={this.handleInput}
                      />
                      <label htmlFor={homeTeam.ID}>
                        <em className="loc">Home</em>

                        <img
                          src={`static/team-logos/${homeTeam.Abbreviation.toLowerCase()}.png`}
                        />
                        {homeTeam.Name}
                      </label>
                    </section>

                    <hr />
                    <section className="selector">
                      <input
                        name={`match${id}`}
                        id={awayTeam.ID}
                        data-game-id={id}
                        data-team-name={awayTeam.Name}
                        type="radio"
                        value={awayTeam.ID}
                        checked={this.state.userPicks[id] === awayTeam.ID}
                        onChange={this.handleInput}
                      />
                      <label htmlFor={awayTeam.ID}>
                        <em className="loc">Away</em>
                        <img
                          src={`static/team-logos/${awayTeam.Abbreviation.toLowerCase()}.png`}
                        />
                        {awayTeam.Name}
                      </label>
                    </section>
                  </div>
                ))}
              </section>
            </form>
          </>
        )}
        {this.state.isSubmitted && <Results teamNames={this.state.teamNames} />}
        <style jsx>
          {`
            input[type='radio']:checked + label {
              background-color: #9dffa3;
            }

            input[type='radio'] {
              position: absolute;
              opacity: 0;
            }

            label {
              cursor: pointer;
            }

            .loc {
              margin-bottom: 10px;
              font-size: 0.8rem;
            }

            .selector {
              width: 100px;
              margin: 0;
            }

            h2,
            h4 {
              text-align: center;
              text-decoration: underline;
              font-size: 2rem;
            }

            h4 {
              margin-bottom: 10px;
            }

            form {
              width: 1200px;
              margin: 0 auto;
              text-align: center;
              box-sizing: border-box;
            }

            section {
              margin-bottom: 40px;
            }

            .matchup {
              display: inline-block;
              margin: 20px;
              background: #e7e7e7;
              padding: 20px 30px;
              border-radius: 5px;
            }

            input[type='submit'] {
              margin: 40px auto;
              font-size: 1.3rem;
              padding: 15px 20px;
              border: none;
              color: white;
              background-color: #3edb61;
              border-radius: 3px;
              cursor: pointer;
              border: 1px solid #3edb61;
              font-weight: bold;
              letter-spacing: 1.2;
            }

            input[type='submit']:hover {
              color: #3edb61;
              background-color: white;
              border: 1px solid #3edb61;
            }

            img {
              width: 40px;
              margin: 10px auto;
              display: block;
            }
          `}
        </style>
      </>
    );
  }
}

export default GameForm;
