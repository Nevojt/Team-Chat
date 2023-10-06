import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import validationSchema from '../ValidationSchema/validationSchema';
import axios from 'axios';
import qs from 'qs';
// import './LoginForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import AuthContext from './AuthContext';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    // Инициализируем состояние (state) компонента
    this.state = {
      username: '',
      password: '',
      showPassword: false,
     };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };
     
  handleInputChange = (event) => {
    // Обработчик изменения значений полей
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

handleOnSubmit = async (values) => {
  
  try {
    const data = qs.stringify({
      username: this.state.username,
      password: this.state.password,
    });
 
    const options = {
      method: 'POST',
      url: 'http://35.228.45.65:8800/login',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    const response = await axios(options);

    if (response.status === 200) {
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);

      // Возвращаем данные пользователя в случае успеха
      alert('You have successfully logged in!');
    } else {
      // Обработка ошибки аутентификации
      alert('Incorrect login or password');
    }
  } catch (error) {
    // Обработка сетевой ошибки
    console.log(error.message);
    alert('A network error has occurred. Please try again later.');
  }

  // Возвращаем null в случае ошибки
  return null;
}


      render() {
        return (
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            // onSubmit={this.handleOnSubmit}
          >
            <Form>
              <div>
                <label htmlFor="username">Email:</label>
                <Field type="text" id="username" name="username" onChange={this.handleInputChange}
              value={this.state.username}   />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <Field
                  type={this.state.showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"  
                  onChange={this.handleInputChange} 
                  value={this.state.password}
                />
                <span
                  onClick={this.togglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  <FontAwesomeIcon
                    icon={this.state.showPassword ? faEye : faEyeSlash}
                  />
                </span>
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" onClick={this.handleOnSubmit}>Log in</button>
            </Form>
          </Formik>
        );
      }
    }
    
    LoginForm.contextType = AuthContext;
    
    export default LoginForm;