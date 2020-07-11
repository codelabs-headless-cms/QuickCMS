class Login extends React.Component {

    render() {
        return (
    <div className="container">
    <div className="loginForm">
        <form className="shadow">
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" />
            <small id="emailHelp" class="form-text text-muted">Don't have an account? <a href="signup.html"> Sign up here.</a></small>
          </div>
          
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
        </div>
    </div>
        );
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('login_container')
);
