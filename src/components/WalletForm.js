import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fecthCurrencies, addExpenses } from '../redux/actions/index';
import getApi from '../services/getApi';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fecthCurrencies());
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.value });
  }

  handleOnClick = async (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses } = this.props;
    console.log(expenses);
    const data = await getApi();
    const newObj = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };
    dispatch(addExpenses(newObj));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="expenseType">
            Valor da despesa:
            <input
              data-testid="value-input"
              id="expenseType"
              type="number"
              onChange={ (event) => this.handleInputChange(event) }
              name="value"
              value={ value }
            />
          </label>
          <br />
          <label htmlFor="description">
            Descricao da despesa:
            <input
              data-testid="description-input"
              id="description"
              type="text"
              onChange={ (event) => this.handleInputChange(event) }
              name="description"
              value={ description }
            />
          </label>
          <br />
          <label htmlFor="exchange">
            Selecione a moeda:
            <select
              data-testid="currency-input"
              id="exchange"
              onChange={ (event) => this.handleInputChange(event) }
              name="currency"
              value={ currency }
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
            Selecione o metodo de pagamento:
            <select
              data-testid="method-input"
              id="paymentMethod"
              onChange={ (event) => this.handleInputChange(event) }
              name="method"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <br />
          <label htmlFor="expenses">
            Selecione a categoria:
            <select
              data-testid="tag-input"
              id="expenses"
              onChange={ (event) => this.handleInputChange(event) }
              name="tag"
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <br />
          <button
            type="submit"
            onClick={ this.handleOnClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
