import React, { useContext } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { Context } from '../contextProvider';

const PrivateRoute = ({ children, ...rest }) => {
  const [session] = useContext(Context)
  const navigate = useNavigate()

  if (session.user === null) {
    navigate('/signin')
    return null;
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );
};

export default PrivateRoute;