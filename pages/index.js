import React from 'react';
import Link from 'next/link';

// import GameForm from './gameForm';

const Index = () => {
  return (
    <>
      <h1>MLB Picker</h1>
      <Link href="/gameForm">
        <a>Make Your Picks</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </>
  );
};

export default Index;
