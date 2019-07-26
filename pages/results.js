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
    scoreboard: null,
  };

  async componentDidMount() {
    const userPicks = JSON.parse(localStorage.getItem('userPicks'));
    const res = await axios.get(URL, {
      auth: {
        username: USERNAME,
        password: PASSWORD,
      },
    });

    // const { scoreboard } = res;

    this.setState({
      userPicks,
      // scoreboard,
    });
  }

  render() {
    const { teamNames } = this.props;
    return (
      <>
        <section>
          <h2>Results</h2>
          <p className="picks">Your Picks</p>
          <ul>
            {teamNames.map(pick => (
              <li key={pick}>
                <p>{pick}</p>
              </li>
            ))}
          </ul>
        </section>
        <style jsx>
          {`
            h2 {
              font-size: 3rem;
            }

            .picks {
              text-decoration: underline;
              font-weight: bold;
            }

            section {
              margin-top: 50px;
              text-align: center;
              margin: 0 auto;
            }

            ul {
              list-style: none;
              margin: 0 auto;
              padding: 0;
              width: 300px;
            }

            p {
              font-size: 1.5rem;
            }
          `}
        </style>
      </>
    );
  }
}

// const teamsObj = {
//   Diamondbacks: 'ari',
//   Braves: 'atl',
//   Orioles: 'bal',
//   'Red Sox': 'bos',
//   Cubs: 'chc',
//   Reds: 'cin',
//   Indians: 'cle',
//   Rockies: 'col',
//   'White Sox': 'cws',
//   Tigers: 'det',
//   Astros: 'hou',
//   Royals: 'kc',
//   Angels: 'laa',
//   Dodgers: 'lad',
//   Marlins: 'mia',
//   Brewers: 'mil',
//   Twins: 'min',
//   Mets: 'nym',
//   Yankees: 'nyy',
//   Athletics: 'oak',
//   Phillies: 'phi',
//   Pirates: 'pit',
//   Padres: 'sd',
//   Mariners: 'sea',
//   Giants: 'sf',
//   Cardinals: 'stl',
//   Rays: 'tb',
//   Rangers: 'tex',
//   'Blue Jays': 'tor',
//   Nationals: 'was',
// };

export default Results;
