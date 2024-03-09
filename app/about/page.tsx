'use client';
import Link from 'next/link';
import React, { useRef } from 'react';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <h1>About</h1>
      <Link href="/">Go to Home</Link>
    </>
  );
};

export default HomePage;
