// loading.js
import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {

  return (
    <div
      style={{
        gap: '20px',
        margin: '20px',
        // height: '100vh',
      }}
    >
      <Skeleton height='15vh' count={1} borderRadius={true} width='19%' inline={true} />
      <Skeleton height='15vh' count={1} borderRadius={true} width='79%' inline={true} style={{  marginLeft: '1%' }}/>
      {/* <Skeleton height='65vh' count={1} width='49%' inline={true} /> */}
      <Skeleton height='65vh' count={1} width='100%' inline={true} style={{ margin: '1% 0',  marginLeft: '0' }} />
      <Skeleton height='10vh' count={1} />
    </div>
  );
};

export default Loading;
