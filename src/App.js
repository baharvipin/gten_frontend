import React, { Component, Suspense, lazy } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

// --------Lazy loading--------
const Authentication = lazy(() => import('./authentication'));
// const MainLayout = lazy(() => import('./main'));

class App extends Component {
  componentDidMount() {
    console.log('componentDidMounted');
  }

  //  --------------- Rendering ----------------

  renderSpinner() {
    return <Spinner animation="border" variant="primary" />;
  }
  renderAuthentication() {
    // Need to render different signup page for hiring partners
    return <Authentication />;
  }

  // renderMainLayout() {
  //   return <MainLayout userRole={this.props.authUserRole} />;
  // }

  renderApp() {
    if (!this.props.isAuthenticated) {
      return this.renderAuthentication();
    }

    // return this.renderMainLayout();
  }

  render() {
    return (
      <div>
        <Suspense fallback={this.renderSpinner()}>{this.renderApp()}</Suspense>
      </div>
    );
  }
}

export default App;
