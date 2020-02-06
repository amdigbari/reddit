import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';

const VerificationCode = React.memo(({ username, checkVerificationCode, setSnackMessage, registerUser, callback }) => {
    let [code, setCode] = React.useState('');
    let [password, setPassword] = React.useState('');

    let [codeValidate, setCodeValidate] = React.useState(true);
    let [passwordValidate, setPasswordValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeCode = ({ target }) => {
        setCode(target.value);
    };

    const changePassword = ({ target }) => {
        setPassword(target.value);
    };

    const submitForm = event => {
        event.preventDefault();

        checkVerificationCode({ username, verify_code: code.trim(), password: password.trim() })
            .then(res => {
                registerUser({ username, password });
                callback && callback();
            })
            .catch(setSnackMessage)
            .finally(toggleIsSubmitting);
    };

    const submitButtonHandler = event => {
        setCodeValidate(code.length);
        setPasswordValidate(password.length);

        if (code.length && password.length) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <TextField
                name="code"
                className="input-container animation-error"
                type="text"
                label="code"
                color="secondary"
                value={code}
                onChange={changeCode}
                autoFocus
                error={!codeValidate}
                helperText="code can't be empty"
            />

            <TextField
                name="password"
                className="input-container animation-error"
                type="password"
                label="new password"
                color="secondary"
                value={password}
                onChange={changePassword}
                error={!passwordValidate}
                helperText="password can't be empty"
            />

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={submitButtonHandler}>
                Change
            </CustomButtonWithLoading>
        </form>
    );
});

export default VerificationCode;
