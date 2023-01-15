// Coloque aqui suas actions
export const USER = 'USER';
export const REQUEST_API_INFO = 'REQUEST_API_INFO';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const CONFIRM_EDIT = 'CONFIRM_EDIT';

export const userLogin = (email) => ({
  type: USER,
  payload: email,
});

export const requestApiInfo = () => ({
  type: REQUEST_API_INFO,
});

export const getCurrencies = (payload) => ({
  type: GET_CURRENCIES,
  payload,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const deleteExpenses = (id) => ({
  type: DELETE_EXPENSES,
  id,
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  id,
});

export const confirmEdit = (id) => ({
  type: CONFIRM_EDIT,
  id,
});

export const fecthCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  // console.log(result);
  delete result.USDT;
  dispatch(getCurrencies(result));
};
