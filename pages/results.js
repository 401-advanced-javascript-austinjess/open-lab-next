import React from 'react';
import axios from 'axios';
import moment from 'moment';

const date = moment().format('YYYYMMDD');
const URL = `https://api.mysportsfeeds.com/v1.0/pull/mlb/2019-regular/scoreboard.json?fordate=${date}`;
const USERNAME = '4498f76b-695d-4832-a187-2a0f81';
const PASSWORD = '*7P%Wo9%hwUl';

class Results extends React.Component {
  state = {
    userPicks: [],
  };

  async componentDidMount() {
    const userPicks = JSON.parse(localStorage.getItem('userPicks'));
    const res = await axios.get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });
    // const gameScores = res.data.scoreboard.gameScore;
    // const teamNames = gameScores.map((match) => {});

    this.setState({
      userPicks,
    });
  }

  // static async getInitialProps() {
  //   const res = await axios.get(URL, {
  //     auth: {
  //       username: USERNAME,
  //       password: PASSWORD,
  //     },
  //   });

  //   return {
  //     scoreboard: res.data,
  //     teamsById: res.data.scoreboard.gameScore.map((match) => {
  //       return match.game.homeTeam.ID;
  //     }),
  //   };
  // }

  render() {
    // console.log('SCOREBOARD!', this.state.scoreboard);
    return (
      <>
        <section>
          <h2>Results</h2>
          <p>Your Picks</p>
          <ul>
            {Object.values(this.props.teamNames).map(pick => (
              <li key={pick}>{pick}</li>
            ))}
          </ul>
        </section>
        <style jsx>
          {`
            section {
              margin-top: 50px;
              text-align: center;
              margin: 0 auto;
              width: 400px;
            }

            ul {
              list-style: none;
            }
          `}
        </style>
      </>
    );
  }
}

export default Results;
