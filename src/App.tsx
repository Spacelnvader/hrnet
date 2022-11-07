import React, { useEffect } from 'react';
import Header from './layout/Header';

import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import RoutesApp from './routes/Routes.app';
import Footer from './layout/Footer';
import Slider from './layout/Slider';
import { useAppDispatch } from './store/main.store';
import { listEmployeesActions } from './store/listEmployees.store';

const App: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(listEmployeesActions.initStore({}))
  }, [dispatch])

  return (
    <div className="react-app">
      <Router basename={process.env.PUBLIC_URL}>
        <Header />        
        <main>
          <Slider />
          <div className='main-content'>
          <Routes>
            { RoutesApp.routeList.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} /> 
            ))}
          </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
