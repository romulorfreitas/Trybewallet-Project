// Coloque aqui suas actions
export const USER = 'USER';
export const REQUEST_API_INFO = 'REQUEST_API_INFO';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

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

export const fecthCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await response.json();
  // console.log(result);
  delete result.USDT;
  dispatch(getCurrencies(result));
};
