import React from 'react';

let Login = ({
    onRequestLogin
}) => {
    let username = '',
        password = '';

    return (
        <div className="row">
            <div className="col-sm-offset-2 col-sm-4">
                <h1>Login</h1>
                <form onSubmit={e => {
                        e.preventDefault();
                        onRequestLogin(username.value, password.value);
                    }} className="form-horizontal">
                    <div className="form-group">
                        <label for="email" className="col-sm-4 control-label">Email</label>
                        <div className="col-sm-8">
                            <input
                                type="email"
                                class="form-control"
                                id="email" name="email"
                                placeholder="email"
                                ref={node => username = node}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password" className="col-sm-4 control-label">Password</label>
                        <div className="col-sm-8">
                            <input
                                type="password"
                                class="form-control"
                                id="password" name="password"
                                placeholder="Password"
                                ref={node => password = node}
                            />
                        </div>
                    </div>
                    <button className="btn btn-success pull-right" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
