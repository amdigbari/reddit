import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import CustomScreenWithBackButton from '../common/screenWithBackButton/CustomScreenWithBackButton';
import EditProfileModal from '../profile/editProfile';

const textStyle = { width: '80%', textAlign: 'center', margin: '50px auto 0 auto' };

const RenderInputs = ({
    username: { username, error: usernameError, change: changeUsername },
    password: { password, error: passwordError, change: changePassword },
    confirmPassword: { confirmPassword, error: confirmPasswordError, change: changeConfirmPassword },
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
                autoFocus
                error={usernameError}
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
            <TextField
                name="confirm_password"
                className="input-container animation-error"
                type="password"
                label="password"
                color="secondary"
                value={confirmPassword}
                onChange={changeConfirmPassword}
                error={confirmPasswordError}
                helperText="password and confirm password are not equal"
            />

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Sign Up
            </CustomButtonWithLoading>
        </form>
    );
};

const SignUp = React.memo(({ goBack, registerUser }) => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [confirmPassword, setConfirmPassword] = React.useState('');

    let [usernameValidate, setUsernameValidate] = React.useState(true);
    let [passwordValidate, setPasswordValidate] = React.useState(true);
    let [confirmPasswordValidate, setConfirmPasswordValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    let [editProfileModalVisibility, toggleEditProfileModalVisibility] = useToggle(false);

    const changeUsername = ({ target }) => {
        setUsername(target.value.trim());
    };

    const changePassword = ({ target }) => {
        setPassword(target.value.trim());
    };

    const changeConfirmPassword = ({ target }) => {
        setConfirmPassword(target.value.trim());
    };

    const Description = () => {
        return <p style={textStyle}>By creating account you can access to all features in DNews.</p>;
    };

    const submitForm = event => {
        event.preventDefault();
        registerUser();
        // console.log('Submit');
    };

    const submitButtonHandler = event => {
        setUsernameValidate(username.length);
        setPasswordValidate(password.length);
        setConfirmPasswordValidate(confirmPassword === password);

        if (username.length && password.length && password === confirmPassword) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <>
            <CustomScreenWithBackButton goBack={goBack} title="Create Account">
                <Description />
                <RenderInputs
                    username={{ username, error: !usernameValidate, change: changeUsername }}
                    password={{ password, error: !passwordValidate, change: changePassword }}
                    confirmPassword={{ confirmPassword, error: !confirmPasswordValidate, change: changeConfirmPassword }}
                    isSubmitting={isSubmitting}
                    handleSubmit={submitButtonHandler}
                    submitForm={submitForm}
                />
            </CustomScreenWithBackButton>

            <EditProfileModal modalVisibility={editProfileModalVisibility} toggleModalVisibility={toggleEditProfileModalVisibility} />
        </>
    );
});
export default SignUp;
