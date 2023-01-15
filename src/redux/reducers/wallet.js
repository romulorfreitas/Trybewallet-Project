// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ADD_EXPENSES,
  DELETE_EXPENSES, EDIT_EXPENSES, CONFIRM_EDIT } from '../actions';

const INITIAL_STATE = {
  /* estado inicial */
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  case EDIT_EXPENSES:
    return ({
      ...state,
      editor: true,
      idToEdit: action.id,
    });
  case CONFIRM_EDIT:
    return ({
      ...state,
      expenses: action.id,
      editor: false,
    });
  default:
    return state;
  }
};
export default wallet;
