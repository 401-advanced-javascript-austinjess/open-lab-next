import React from 'react';

class Results extends React.Component {
  state = {
    userPicks: [],
  };

  componentDidMount() {
    const userPicks = JSON.parse(localStorage.getItem('userPicks'));
    console.log(userPicks);
    this.setState({
      userPicks,
    });
  }

  render() {
    return (
      <>
        <h1>Results</h1>
        <p>Your Picks</p>
        <ul>
          {Object.values(this.state.userPicks).map(pick => (
            <li key={pick}>{pick}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default Results;
