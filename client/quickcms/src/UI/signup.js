class SignUp extends React.Component {

  render() {
    return (
      <div className="container">
        <h4 className="app_name">QuickCMS</h4>
          <form>
          <h3 className="signup_heading">Sign Up</h3>
          <div className="form-group">
              <label className="form-label" for="name">Your Name</label>
              <input type="text" class="form-control" placeholder="My project name" />
            </div>
            
            <div className="form-group">
              <label className="form-label" for="email">Your Email Address</label>
              <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="myname@email.com"/>
            </div>
            
            <div class="form-group">
              <label className="form-label" for="InputPassword1">Enter Your Password</label>
              <input type="password" class="form-control" id="InputPassword1" placeholder="Secret password"/>
            </div>
            
            <div class="form-group">
              <label className="form-label" for="InputPassword2">Confirm Your Password</label>
              <input type="password" class="form-control" id="InputPassword2" placeholder="Secret password"/>
              <small id="emailHelp" class="form-text text-muted">Already have an account? <a href="login.html"> login here.</a></small>
            </div>
            
            <button type="submit" class="btn btn-dark">Sign up</button>
          </form>
    </div>
    );
  }
}

ReactDOM.render(
  <SignUp />,
  document.getElementById('signup_container')
);
