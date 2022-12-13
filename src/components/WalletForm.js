import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fecthCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fecthCurrencies());
  }

  render() {
    const { currencies } = this.props;
    // console.log(currencies);
    return (
      <div>
        <form>
          <label htmlFor="expenseType">
            Tipo da despesa:
            <input
              data-testid="value-input"
              id="expenseType"
              type="text"
            />
          </label>
          <br />
          <label htmlFor="description">
            Descricao da despesa:
            <input
              data-testid="description-input"
              id="description"
              type="text"
            />
          </label>
          <br />
          <label htmlFor="exchange">
            Selecione a moeda:
            <select
              data-testid="currency-input"
              id="exchange"
            >
              {currencies.map((current, index) => (
                <option key={ index }>
                  { current }
                </option>
              ))}
            </select>
          </label>
          <br />
          <label htmlFor="paymentMethod">
            Selecione a moeda:
            <select
              data-testid="method-input"
              id="paymentMethod"
            >
              <option>
                Dinheiro
              </option>
              <option>
                Cartão de crédito
              </option>
              <option>
                Cartão de débito
              </option>
            </select>
          </label>
          <br />
          <label htmlFor="expenses">
            Selecione a categoria:
            <select
              data-testid="tag-input"
              id="expenses"
            >
              <option>
                Alimentação
              </option>
              <option>
                Lazer
              </option>
              <option>
                Trabalho
              </option>
              <option>
                Transporte
              </option>
              <option>
                Saúde
              </option>
            </select>
          </label>
          <br />
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
