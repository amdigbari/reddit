import React from 'react';
import TextField from '@material-ui/core/TextField';

import './styles.scss';
import { CustomButtonWithLoading } from '../common/CommonComponents';
import { useToggle } from '../common/customHooks';
import CustomScreenWithBackButton from '../common/screenWithBackButton/CustomScreenWithBackButton';

const textStyle = { width: '80%', textAlign: 'center', margin: '50px auto 0 auto' };

const ResetPassword = React.memo(({ goBack }) => {
    let [username, setUsername] = React.useState('');
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

                <CustomButtonWithLoading
                    className="button-container"
                    type="submit"
                    loading={isSubmitting}
                    activeLoading={toggleIsSubmitting}>
                    Send Link
                </CustomButtonWithLoading>
            </form>
        );
    }, [isSubmitting, toggleIsSubmitting]);

    return (
        <CustomScreenWithBackButton goBack={goBack} title="Reset Password">
            <Description />
            <RenderInputs />
        </CustomScreenWithBackButton>
    );
});
export default ResetPassword;
