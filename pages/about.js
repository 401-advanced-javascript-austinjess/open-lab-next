import React, { useState } from 'react';
import Link from 'next/link';
// import superagent from 'superagent';
import fetch from 'isomorphic-unfetch';

const USERNAME = '4498f76b-695d-4832-a187-2a0f81';
const PASSWORD = '*7P%Wo9%hwUl';
const URL =
  'https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=20190718';

const AboutUs = (props) => {
  // const [schedule, setSchedule] = useState([]);
  console.log(props.games);
  return (
    <>
      <h1>Hello</h1>

      {/* <ul>
        {props.games.map(game => (
          <li>
            <p>{game}</p>
          </li>
        ))}
      </ul> */}
    </>
  );
};

AboutUs.getInitialProps = async () => {
  // const res = await superagent.get(URL).auth(USERNAME, PASSWORD);
  // const res = await fetch.get(testURL);
  const games = await res.json();

  return {
    games: games.map(game => game),
  };
};

export default AboutUs;
