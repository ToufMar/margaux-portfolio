import React from 'react';
import { ParallaxComponent } from './components/parallax/ParallaxComponent';
import { Header } from './components/header/Header';
// import { Carousel } from './components/carousel/Carousel';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AppProvider } from './context/appContext';
import { Page } from '../src/components/page/Page';
import {Carousel} from './components/carouselDeux/Carousel';
function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Header />
          <div className="body-container d-flex align-center">
            <Carousel />
            {/* <Switch>
              <Route exact path="/" render={() => <Redirect to="/axa" />} />
              <Route exact path="/axa" component={Page} />
              <Route exact path="/detours" component={Page} />
              <Route exact path="/gonzai" component={Page} />
              <Route exact path="/jack" component={Page} />
              <Route exact path="/netflix" component={Page} />
            </Switch> */}
          </div>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
