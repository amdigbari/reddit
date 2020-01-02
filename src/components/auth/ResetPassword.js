import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import CustomScreenWithBackButton from '../common/screenWithBackButton/CustomScreenWithBackButton';

const textStyle = { width: '80%', textAlign: 'center', margin: '50px auto 0 auto' };

const RenderInputs = ({ username: { username, error: usernameError, change: changeUsername }, isSubmitting, submitForm, handleSubmit }) => {
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

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Send Link
            </CustomButtonWithLoading>
        </form>
    );
};

const ResetPassword = React.memo(({ goBack }) => {
    let [username, setUsername] = React.useState('');

    let [usernameValidate, setUsernameValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeUsername = ({ target }) => {
        setUsername(target.value.trim());
    };

    const Description = () => {
        return (
            <p style={textStyle}>
                No problem!. Just type in your username and we will send the reset link to your account email. If you didn't set an email
                for your account you should reset your password by reporting this the support
            </p>
        );
    };

    const submitForm = event => {
        event.preventDefault();
        console.log('Submit');
    };

    const submitButtonHandler = event => {
        setUsernameValidate(username.length);

        if (username.length) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <CustomScreenWithBackButton goBack={goBack} title="Reset Password">
            <Description />
            <RenderInputs
                username={{ username, error: !usernameValidate, change: changeUsername }}
                isSubmitting={isSubmitting}
                handleSubmit={submitButtonHandler}
                submitForm={submitForm}
            />
        </CustomScreenWithBackButton>
    );
});
export default ResetPassword;
