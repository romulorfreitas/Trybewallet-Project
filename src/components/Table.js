import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDeleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteExp = expenses.filter((e) => e.id !== id);
    dispatch(deleteExpenses(deleteExp));
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            {expenses.map((element) => (
              <tr key={ element.id }>
                <td>{ element.description }</td>
                <td>{ element.tag }</td>
                <td>{ element.method }</td>
                <td>{ Number(element.value).toFixed(2) }</td>
                <td>{ element.exchangeRates[element.currency].name }</td>
                <td>
                  { Number(element.exchangeRates[element.currency].ask)
                    .toFixed(2) }
                </td>
                <td>
                  { Number(element.value * element.exchangeRates[element.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteExpense(element.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(Table);
