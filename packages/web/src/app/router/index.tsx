import React from 'react';

import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import {
  useNav,
} from '../providers/hooks';

import {
  Dashboard,
} from '../pages';

const Component = () => {
  const location = useLocation();
  const {pathname} = location;

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
    </Routes>
  );
}

export default Component;