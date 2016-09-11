import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props);

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount() {
        const { checkSession } = this.props;
        checkSession();
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    render() {
        const { fetchAccessIfNeeded } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="five columns" />
                    <div className="six columns">
                        <h1>Login</h1>
                        <form
                          onSubmit={e => {
                              e.preventDefault();
                              fetchAccessIfNeeded(this.state.email, this.state.password);
                          }}
                        >
                            <TextField
                              type="email"
                              name="email"
                              hintText="Email"
                              floatingLabelText="Email"
                              onChange={this.handleEmail}
                            />
                            <br />
                            <TextField
                              type="password"
                              name="password"
                              hintText="Password"
                              floatingLabelText="Password"
                              onChange={this.handlePassword}
                            />
                            <br />
                            <RaisedButton label="Login" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
