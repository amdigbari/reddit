import React from 'react';
import { connect } from 'react-redux';

import './material_style.scss';
import RenderInputs from './Inputs';
import { useToggle } from '../../../common/customHooks';
import CustomScreenWithBackButton from '../../../common/screenWithBackButton/CustomScreenWithBackButton';
import Modal from '../../../common/Modal';
import { changePassword as changePasswordServer } from 'actions/AuthActions';
import ScreenWithError from 'components/common/screenWithError';
import { encode } from 'base-64';

const ChangePasswordModal = React.memo(({ modalVisibility, toggleModalVisibility, changePasswordServer, setSnackMessage, loginUser }) => {
    let [password, setPassword] = React.useState('');
    let [confirmPassword, setConfirmPassword] = React.useState('');

    let [passwordValidate, setPasswordValidate] = React.useState(true);
    let [confirmPasswordValidate, setConfirmPasswordValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changePassword = ({ target }) => {
        setPassword(target.value);
    };
    const changeConfirmPassword = ({ target }) => {
        setConfirmPassword(target.value);
    };

    const submitForm = event => {
        event.preventDefault();

        changePasswordServer({ password1: password, password2: confirmPassword })
            .then(() => {
                localStorage.setItem('token', encode(`${loginUser.username}:${password}`));
                toggleModalVisibility();
                setSnackMessage(200);
            })
            .catch(setSnackMessage)
            .finally(toggleIsSubmitting);
    };

    const submitButtonHandler = event => {
        setPasswordValidate(password.trim().length);
        setConfirmPasswordValidate(confirmPassword.trim() === password.trim());

        if (password.trim().length && confirmPassword.trim() === password.trim()) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} className="change-password-modal-container">
            <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Change Password">
                <div className="change-password-modal-container">
                    <RenderInputs
                        password={{ password, change: changePassword, error: !passwordValidate }}
                        confirmPassword={{ password: confirmPassword, change: changeConfirmPassword, error: !confirmPasswordValidate }}
                        isSubmitting={isSubmitting}
                        handleSubmit={submitButtonHandler}
                        submitForm={submitForm}
                    />
                </div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});

const mapStateToProps = state => {
    return { loginUser: state.loginUser };
};
const mapDispatchToProps = {
    changePasswordServer,
};
export default connect(mapStateToProps, mapDispatchToProps)(ScreenWithError(ChangePasswordModal));
