import React from 'react';
import TextField from '@material-ui/core/TextField';

import './material_style.scss';
import { CustomButtonWithLoading } from '../../../common/CommonComponents';

const RenderInputs = ({
    password: { password, change: changePassword, error: passwordError },
    confirmPassword: { password: confirmPassword, change: changeConfirmPassword, error: confirmPasswordError },
    isSubmitting,
    submitForm,
    handleSubmit,
}) => {
    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <TextField
                name="password"
                className="input-container animation-error"
                type="password"
                label="new password *"
                color="secondary"
                value={password}
                onChange={changePassword}
                error={passwordError}
                autoFocus
                helperText="new password can't be empty and can't be the same as the current password."
            />
            <TextField
                name="confirm_password"
                className="input-container animation-error"
                type="password"
                label="confirm new password *"
                color="secondary"
                value={confirmPassword}
                onChange={changeConfirmPassword}
                error={confirmPasswordError}
                helperText="confirm password must be the same as the new password."
            />

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Save
            </CustomButtonWithLoading>
        </form>
    );
};
export default RenderInputs;
