// Coloque aqui suas actions
export const USER = 'USER';

export const userLogin = (email) => ({
  type: USER,
  payload: email,
});
