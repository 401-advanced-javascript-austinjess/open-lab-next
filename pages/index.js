import React from 'react';
import Link from 'next/link';

const Index = () => {
  return (
    <>
      <main>
        <h1>MLB Daily Pick&#39;Em</h1>
        <Link href="/gameForm">
          <a>MAKE YOUR PICKS</a>
        </Link>
      </main>
      <style jsx>
        {`
          main {
            text-align: center;
            margin-top: 20%;
          }

          body {
            text-align: center;
          }

          h1 {
            text-decoration: underline;
            margin-bottom: 20px;
          }

          a {
            border: 1px solid black;
            border-radius: 5px;
            padding: 10px 20px;
            text-decoration: none;
            color: white;
            background-color: black;
            box-sizing: border-box;
            display: block;
            width: 240px;
            margin: 60px auto;
          }

          a:hover {
            color: black;
            background-color: white;
          }
        `}
      </style>
    </>
  );
};

export default Index;
