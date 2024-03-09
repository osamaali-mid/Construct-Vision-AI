'use client';
import React, { useRef } from 'react';
import Webcam from 'react-webcam';

type Props = {};

const HomePage = (props: Props) => {
  const webCamRef = useRef<Webcam>(null);

  return (
    <>
      <h1>HomePage</h1>
      <Webcam />
    </>
  );
};

export default HomePage;
