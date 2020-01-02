import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import CustomScreenWithBackButton from '../common/screenWithBackButton/CustomScreenWithBackButton';

const textStyle = { width: '80%', textAlign: 'center', margin: '50px auto 0 auto' };

const RenderInputs = ({
    username: { username, error: usernameError, change: changeUsername },
    password: { password, error: passwordError, change: changePassword },
    isSubmitting,
    submitForm,
    handleSubmit,
}) => {
    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <TextField
                name="username"
                className="input-container animation-error"
                type="text"
                label="username"
                color="secondary"
                value={username}
                onChange={changeUsername}
                error={usernameError}
                autoFocus
                helperText="username can't be empty"
            />
            <TextField
                name="password"
                className="input-container animation-error"
                type="password"
                label="password"
                color="secondary"
                value={password}
                onChange={changePassword}
                error={passwordError}
                helperText="password can't be empty"
            />

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Login
            </CustomButtonWithLoading>
        </form>
    );
};

const SignIn = React.memo(({ showForgotPasswordPage, goBack, registerUser }) => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');

    let [usernameValidate, setUsernameValidate] = React.useState(true);
    let [passwordValidate, setPasswordValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeUsername = ({ target }) => {
        setUsername(target.value.trim());
    };

    const changePassword = ({ target }) => {
        setPassword(target.value.trim());
    };

    const Description = () => {
        return <p style={textStyle}>Type in your username and password you choose for DNews and click Login</p>;
    };

    const ForgotPassword = () => {
        return (
            <p className="forgot-password" style={textStyle} onClick={showForgotPasswordPage}>
                Can't SignIn?! Reset Password.
            </p>
        );
    };

    const submitForm = event => {
        event.preventDefault();
        registerUser();
    };

    const submitButtonHandler = event => {
        setUsernameValidate(username.length);
        setPasswordValidate(password.length);

        if (username.length && password.length) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <CustomScreenWithBackButton goBack={goBack} title="Sign In">
            <Description />
            <RenderInputs
                username={{ username, error: !usernameValidate, change: changeUsername }}
                password={{ password, error: !passwordValidate, change: changePassword }}
                isSubmitting={isSubmitting}
                handleSubmit={submitButtonHandler}
                submitForm={submitForm}
            />
            <ForgotPassword />
        </CustomScreenWithBackButton>
    );
});
export default SignIn;
