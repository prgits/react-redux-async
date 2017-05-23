import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import {IndexLink} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import {isLoaded as isInfoLoaded, load as loadInfo} from 'redux/modules/info';
import {isLoaded as isAuthLoaded, load as loadAuth, logout} from 'redux/modules/auth';
import {InfoBar} from 'components';
import {push} from 'react-router-redux';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';
// require('../../theme/main.js');

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    require('./header.css');
    const styles = require('./App.scss');
    const logoImage = require('./img/cd-logo.svg');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <header>
          <div id="logo"><img src={logoImage} alt="Homepage" /></div>
          <div id="cd-hamburger-menu"><a className="cd-img-replace" href="#0">Menu</a></div>
          <div id="cd-cart-trigger"><a className="cd-img-replace" href="#0">Cart</a></div>
        </header>
        <Navbar fixedTop id="main-nav">
          <Nav navbar>
            {user && <LinkContainer to="/chat">
              <NavItem eventKey={1}>Chat</NavItem>
            </LinkContainer>}

            <LinkContainer to="/widgets">
              <NavItem eventKey={2}>Widgets</NavItem>
            </LinkContainer>
            <LinkContainer to="/survey">
              <NavItem eventKey={3}>Survey</NavItem>
            </LinkContainer>
            <LinkContainer to="/pagination">
              <NavItem eventKey={4}>Pagination</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={5}>About Us</NavItem>
            </LinkContainer>

            {!user &&
            <LinkContainer to="/login">
              <NavItem eventKey={6}>Login</NavItem>
            </LinkContainer>}
            {user &&
            <LinkContainer to="/logout">
              <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
                Logout
              </NavItem>
            </LinkContainer>}
          </Nav>
          {user &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
          <Nav navbar pullRight>
            <NavItem eventKey={1} target="_blank" title="View on Github"
                     href="https://github.com/erikras/react-redux-universal-hot-example">
              <i className="fa fa-github"/>
            </NavItem>
          </Nav>
        </Navbar>

        <div id="cd-shadow-layer"/>
        <div id="cd-cart">
          <h2>Cart</h2>
          <ul className="cd-cart-items">
            <li>
              <span className="cd-qty">1x</span> Product Name
              <div className="cd-price">$9.99</div>
              <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
            </li>
            <li>
              <span className="cd-qty">2x</span> Product Name
              <div className="cd-price">$19.98</div>
              <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
            </li>
            <li>
              <span className="cd-qty">1x</span> Product Name
              <div className="cd-price">$9.99</div>
              <a href="#0" className="cd-item-remove cd-img-replace">Remove</a>
            </li>
          </ul>
          {/* cd-cart-items */}
          <div className="cd-cart-total">
            <p>Total <span>$39.96</span></p>
          </div>
          {/* cd-cart-total */}
          <a href="#0" className="checkout-btn">Checkout</a>
          <p className="cd-go-to-cart"><a href="#0">Go to cart page</a></p>
        </div>
        {/* cd-cart */}

        <main>
          {this.props.children}
        </main>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a
          href="https://github.com/erikras/react-redux-universal-hot-example/issues"
          target="_blank">on Github</a> or in the <a
          href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a> Discord channel.
        </div>
      </div>
    );
  }
}
