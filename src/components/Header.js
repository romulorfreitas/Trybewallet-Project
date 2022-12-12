import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpense: 0,
      currentChange: 'BRL',
    };
  }

  render() {
    const { totalExpense, currentChange } = this.state;
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <br />
        <p data-testid="total-field">
          { totalExpense }
        </p>
        <br />
        <p data-testid="header-currency-field">
          { currentChange }
        </p>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
