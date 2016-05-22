import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Login extends React.Component {

    handleEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    handlePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    render() {
        const { onRequestLogin } = this.props;

        return (
            <div className="row">
                <div className="five columns"></div>
                <div className="six columns">
                    <h1>Login</h1>
                    <form onSubmit={e => {
                            e.preventDefault();
                            onRequestLogin(this.state.email, this.state.password);
                        }}>
                        <TextField
                            type="email"
                            name="email"
                            hintText="Email"
                            floatingLabelText="Email"
                            onChange={ this.handleEmail.bind(this) }
                            /> <br />
                        <TextField
                            type="password"
                            name="password"
                            hintText="Password"
                            floatingLabelText="Password"
                            onChange={ this.handlePassword.bind(this) }
                            /> <br />
                        <RaisedButton label="Login" type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}
