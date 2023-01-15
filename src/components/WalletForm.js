import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fecthCurrencies, addExpenses, confirmEdit } from '../redux/actions/index';
import getApi from '../services/getApi';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
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

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value });
  };

  handleEditButton = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const getValues = expenses.map((e) => {
      if (idToEdit === e.id) {
        return {
          ...e,
          value,
          description,
          currency,
          method,
          tag,
        };
      }
      return e;
    });
    dispatch(confirmEdit(getValues));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  };

  handleOnClick = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    // console.log(expenses);
    const data = await getApi();
    this.setState((pId) => ({
      ...pId,
      id: pId.id + 1,
    }));
    const newObj = {
      id,
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
    const { currencies, editor } = this.props;
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
              onChange={ this.handleInputChange }
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
              onChange={ this.handleInputChange }
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
              onChange={ this.handleInputChange }
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
              onChange={ this.handleInputChange }
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
              onChange={ this.handleInputChange }
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
          { editor
            ? (
              <button
                type="button"
                onClick={ this.handleEditButton }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.handleOnClick }
              >
                Adicionar despesa
              </button>
            )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
