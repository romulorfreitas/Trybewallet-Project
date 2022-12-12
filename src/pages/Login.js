import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isButtonDisable: true,
    };
  }

  handleInputChange({ target }) {
    this.setState({
      [target.name]: target.value }, () => {
      const { email, password } = this.state;
      const passwordLength = 6;
      const emailRegex = (/[\w]+@[\w]+.com/.test(email));

      if (emailRegex && password.length >= passwordLength) {
        this.setState({ isButtonDisable: false });
      } else {
        this.setState({ isButtonDisable: true });
      }
    });
  }

  handleOnClick = () => {
    const { email } = this.state;
    console.log(email);
    const { history, dispatch } = this.props;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isButtonDisable } = this.state;
    return (
      <div>
        <h3>Login</h3>
        <section className="login-inputs">
          <label htmlFor="email">
            E-mail:
            <br />
            <input
              id="email"
              type="text"
              value={ email }
              name="email"
              onChange={ (event) => this.handleInputChange(event) }
              placeholder="type your e-mail"
              data-testid="email-input"
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <br />
            <input
              id="password"
              type="password"
              value={ password }
              name="password"
              onChange={ (event) => this.handleInputChange(event) }
              placeholder="******"
              data-testid="password-input"
            />
          </label>
          <br />
          <br />
          <button
            type="submit"
            onClick={ this.handleOnClick }
            disabled={ isButtonDisable }
            data-testid="login-button"
          >
            Entrar
          </button>

        </section>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
