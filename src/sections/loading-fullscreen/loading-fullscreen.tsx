import React from 'react';
import { Rings } from 'react-loader-spinner';

type LoadingFullScreenProps = {
  loading: boolean;
};

function LoadingFullScreen({ loading }: LoadingFullScreenProps) {
  return (
    loading && (
      <div className="z-50 absolute w-screen h-screen flex items-center justify-center bg-primary top-0 left-0">
        Getting things ready... <Rings color="#ddd6fe" height={50} />
      </div>
    )
  );
}

export default LoadingFullScreen;
