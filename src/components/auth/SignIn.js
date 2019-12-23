import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import CustomScreenWithBackButton from '../common/screenWithBackButton/CustomScreenWithBackButton';

const textStyle = { width: '80%', textAlign: 'center', marginTop: 50 };

const SignIn = React.memo(({ showForgotPasswordPage, goBack }) => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
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

    const RenderInputs = React.useCallback(() => {
        return (
            <form method="POST" action="/" onSubmit={e => e.preventDefault()}>
                <TextField
                    name="username"
                    className="input-container"
                    type="text"
                    label="username"
                    color="secondary"
                    onKeyUp={changeUsername}
                />
                <TextField
                    name="password"
                    className="input-container"
                    type="password"
                    label="password"
                    color="secondary"
                    onKeyUp={changePassword}
                />

                <CustomButtonWithLoading
                    className="button-container"
                    type="submit"
                    loading={isSubmitting}
                    activeLoading={toggleIsSubmitting}>
                    Login
                </CustomButtonWithLoading>
            </form>
        );
    }, [isSubmitting, toggleIsSubmitting]);

    const ForgotPassword = () => {
        return (
            <p className="forgot-password" style={textStyle} onClick={showForgotPasswordPage}>
                Can't SignIn?! Reset Password.
            </p>
        );
    };

    return (
        <CustomScreenWithBackButton goBack={goBack} title="Sign In">
            <Description />
            <RenderInputs />
            <ForgotPassword />
        </CustomScreenWithBackButton>
    );
});
export default SignIn;
