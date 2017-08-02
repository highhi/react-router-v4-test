import React from 'react';
import { BrowserRouter, Route, Link, withRouter, Redirect } from 'react-router-dom';
import News from './News';
import Comments from './Comments';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollTo = withRouter(ScrollToTop);

const App = () => (
  <BrowserRouter>
    <ScrollTo>
      <div>
        <Route exact path="/news/:page" component={News} />
        <Route exact path="/item/:id" component={Comments} />
      </div>
    </ScrollTo>
  </BrowserRouter>
);

export default App;
