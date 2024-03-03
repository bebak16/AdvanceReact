import React from 'react';
import {BarLoader, BeatLoader, BounceLoader, CircleLoader, ClipLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className="loading">
      <h1>loading<BeatLoader color = 'green' /></h1>
    </div>
  );
};

export default Loading;
