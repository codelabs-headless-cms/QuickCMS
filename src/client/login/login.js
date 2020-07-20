import React from 'react';
import './login.css';
import '../app.css';

class Login extends React.Component {

  render() {
    return (
      <div className="container">
        <h4 className="login app_name">QuickCMS</h4>
        <form className="login-form">
          <h3 className="heading">Log in</h3>
            <div className="form-group">
              <label for="InputEmail">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="myname@email.com"/>
            </div>
            
            <div class="form-group">
              <label for="InputPassword">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Secret password"/>
              <small id="emailHelp" class="form-text text-muted">Don't have an account? <a href="/signup"> Sign up here.</a></small>
            </div>
            
            <button type="submit" class="btn btn-dark">Login</button>
        </form>

    </div>
    );t
  }
}

export default Login;
