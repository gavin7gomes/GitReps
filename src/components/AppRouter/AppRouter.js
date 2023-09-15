import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes, screenNames } from './routes';
import { useDispatch } from 'react-redux';
import { fetchGithubUserData, resetAuthData } from '../../store/actions/authActions';

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!localStorage.getItem("githubAccessToken")){
      dispatch(resetAuthData());
    }else{
      dispatch(fetchGithubUserData())
    }
  }, [dispatch])
  
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
              {Object.values(screenNames).map((path, index) => (
                <Route
                  exact
                  key={index}
                  path={path}
                  element={routes[path].component}
                />
              ))}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
