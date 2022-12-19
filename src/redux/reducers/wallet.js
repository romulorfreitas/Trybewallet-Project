// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ADD_EXPENSES, DELETE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  /* estado inicial */
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return ({
      ...state,
      currencies: Object.keys(action.payload),
    });
  case ADD_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
    });
  case DELETE_EXPENSES:
    return ({
      ...state,
      expenses: action.id,
    });
  default:
    return state;
  }
};
export default wallet;
