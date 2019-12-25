import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import CustomScreenWithBackButton from '../common/screenWithBackButton/CustomScreenWithBackButton';

const textStyle = { width: '80%', textAlign: 'center', margin: '50px auto 0 auto' };

const SignUp = React.memo(({ goBack }) => {
    let [username, setUsername] = React.useState('');
    let [password, setPassword] = React.useState('');
    let [confirmPassword, setConfirmPassword] = React.useState('');
    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

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
                <TextField
                    name="confirm_password"
                    className="input-container"
                    type="password"
                    label="password"
                    color="secondary"
                    onKeyUp={changeConfirmPassword}
                />

                <CustomButtonWithLoading
                    className="button-container"
                    type="submit"
                    loading={isSubmitting}
                    activeLoading={toggleIsSubmitting}>
                    Sign Up
                </CustomButtonWithLoading>
            </form>
        );
    }, [isSubmitting, toggleIsSubmitting]);

    return (
        <CustomScreenWithBackButton goBack={goBack} title="Create Account">
            <Description />
            <RenderInputs />
        </CustomScreenWithBackButton>
    );
});
export default SignUp;
