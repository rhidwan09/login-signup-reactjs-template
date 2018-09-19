import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
import { FormErrors } from '../../FormErrors';
import './Login.css';

class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
      email:'',
      password:'',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
		console.log(this.state);
		let {email, password} = this.state;
    this.props.login(email, password);
  }

  onChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
    () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    
    return (
      <div className="row small-up-4 medium-up-3 large-up-4">
        <div className="column bodyPart loginmodal-container">
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <input name="email" type="email" placeholder="Email" onChange={this.onChange} />
          <input name="password" type="password" placeholder="Password" onChange={this.onChange} />
          <input type="submit" value="Login" className="button" onClick={this.login}/>
          <div className="login-help">
            <a href="#">Not a member ?</a><a href="/signup"> Sign up Now</a>
          </div><br />
          { isLoginPending && <div>Please Wait..</div> }
          { isLoginSuccess && <div>Welcome...</div> }
          { loginError && <div>{loginError.message}</div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
		loginError: state.loginError
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(login(email, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
