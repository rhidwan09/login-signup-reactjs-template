import Promise from 'es6-promise';

/*CONST LOGIN*/
const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

/*CONST REGISTER*/
const REGISTER_PENDING = 'REGISTER_PENDING';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';

/*Function Login*/
function setLoginPending(isLoginPending){
	return {
		type: LOGIN_PENDING,
		isLoginPending
	};
}

function setLoginSuccess(isLoginSuccess){
	return {
		type: LOGIN_SUCCESS,
		isLoginSuccess
	};
}

function setLoginError(loginError){
	return {
		type: LOGIN_ERROR,
		loginError
	};
}

/*Function Register*/
function setRegisterPending(isRegisterPending){
	return {
		type: REGISTER_PENDING,
		isRegisterPending
	};
}

function setRegisterSuccess(isRegisterSuccess){
	return {
		type: REGISTER_SUCCESS,
		isRegisterSuccess
	};
}

function setRegisterError(RegisterError){
	return {
		type: REGISTER_ERROR,
		RegisterError
	};
}

/*Function Export Login*/
export function login(email, password){
	return dispatch => {
		dispatch(setLoginPending(true));
		dispatch(setLoginSuccess(false));
		dispatch(setLoginError(null));

		sendLoginRequest(email, password)
		.then(success => {
			dispatch(setLoginPending(false));
			dispatch(setLoginSuccess(true));
		})
		.catch(err => {
			dispatch(setLoginPending(false));
			dispatch(setLoginError(err));
		});
	};
}

/*Function Export Register*/
export function register(fullname, email, password){
	return dispatch => {
		dispatch(setRegisterPending(true));
		dispatch(setRegisterSuccess(false));
		dispatch(setRegisterError(null));

		sendRegisterRequest(fullname, email, password)
		.then(success => {
			dispatch(setRegisterPending(false));
			dispatch(setRegisterSuccess(true));
		})
		.catch(err => {
			dispatch(setRegisterPending(false));
			dispatch(setRegisterError(err));
		});
	};
}

export default function reducer(state = {
	isLoginPending: false,
	isLoginSuccess: false,
	loginError: null,
	isRegisterPending: false,
	isRegisterSuccess: false,
	RegisterError: null
}, action) {

	switch (action.type){
		case LOGIN_SUCCESS:
		return {
			...state,
			isLoginSuccess: action.isLoginSuccess
		};

		case LOGIN_PENDING:
		return {
			...state,
			isLoginPending: action.isLoginPending
		};

		case LOGIN_ERROR:
		return {
			...state,
			loginError: action.loginError

		};

		case REGISTER_SUCCESS:
		return {
			...state,
			isRegisterSuccess: action.isRegisterSuccess
		};

		case REGISTER_PENDING:
		return {
			...state,
			isRegisterPending: action.isRegisterPending
		};

		case REGISTER_ERROR:
		return {
			...state,
			RegisterError: action.RegisterError

		};

		default:
		return state;
	}
}

function sendRegisterRequest(fullname, email, password){
	return new Promise((resolve, reject) => {
		setTimeout(() =>{
			if (fullname === 'rhidwan' && email === 'admin@example.com' && password === 'admin12345'){
				return resolve(true);
			} else {
				return reject(new Error('Field is Required'));
			}
		}, 1000);
	});
}

function sendLoginRequest(email, password){
	return new Promise((resolve, reject) => {
		setTimeout(() =>{
			if (email === 'admin@example.com' && password === 'admin'){
				return resolve(true);
			} else {
				return reject(new Error('Invalid Email or Password'));
			}
		}, 1000);
	});
}