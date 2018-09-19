import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/reducer';
import { FormErrors } from '../../FormErrors';
import './SignUp.css';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state ={
      fullname:'',
      email:'',
      password:'',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.register = this.register.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  register(e){
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
		console.log(this.state);
		let {fullname, email, password} = this.state;
    this.props.register(fullname, email, password);
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
    let {fullname, email, password} = this.state;
    let {isRegisterPending, isRegisterSuccess, RegisterError} = this.props;

    return (
      <div className="row small-up-4 medium-up-3 large-up-4">
        <div className="column bodyPart registermodal-container">
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
            <input type="text" name="fullname" placeholder="Fullname" onChange={this.onChange}/>
            <input type="email" name="email" placeholder="Email" onChange={this.onChange}/>
            <input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
            <input type="submit" value="Register" className="button" onClick={this.register}/>
          <div className="login-help">
            <a href="#">Already registred! </a><a href="/login"> Login Me</a>
          </div>
          { isRegisterPending && <div>Please Wait..</div> }
          { isRegisterSuccess && <div>Success...</div> }
          { RegisterError && <div>{RegisterError.message}</div> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isRegisterPending: state.isRegisterPending,
		isRegisterSuccess: state.isRegisterSuccess,
		RegisterError: state.RegisterError
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		register: (fullname, email, password) => dispatch(register(fullname, email, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
