import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChange: 'BRL',
    };
  }

  totalAmount = () => {
    const { expenses } = this.props;
    console.log(expenses);
    return expenses.reduce((acc, curr) => acc
    + curr.value * curr.exchangeRates[curr.currency].ask, 0);
  };

  render() {
    const { currentChange } = this.state;
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <br />
        <p data-testid="total-field">
          { (this.totalAmount().toFixed(2)) }
        </p>
        <br />
        <p data-testid="header-currency-field">
          { currentChange }
        </p>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Header);
