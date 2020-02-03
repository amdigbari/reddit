import React from 'react';

import './material_style.scss';
import RenderInputs from './Inputs';
import { useToggle } from '../../../common/customHooks';
import CustomScreenWithBackButton from '../../../common/screenWithBackButton/CustomScreenWithBackButton';
import Modal from '../../../common/Modal';

const ChangePasswordModal = React.memo(({ modalVisibility, toggleModalVisibility }) => {
    let [password, setPassword] = React.useState('');
    let [confirmPassword, setConfirmPassword] = React.useState('');
    let [currentPassword, setCurrentPassword] = React.useState('');

    let [passwordValidate, setPasswordValidate] = React.useState(true);
    let [confirmPasswordValidate, setConfirmPasswordValidate] = React.useState(true);
    let [currentPasswordValidate, setCurrentPasswordValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeCurrentPassword = ({ target }) => {
        setCurrentPassword(target.value);
    };
    const changePassword = ({ target }) => {
        setPassword(target.value);
    };
    const changeConfirmPassword = ({ target }) => {
        setConfirmPassword(target.value);
    };

    const submitForm = event => {
        event.preventDefault();

        //TODO: .trim()
        console.log('Submit');
    };

    const submitButtonHandler = event => {
        setCurrentPasswordValidate(currentPassword.trim().length);
        setPasswordValidate(password.trim().length && password.trim() !== currentPassword.trim());
        setConfirmPasswordValidate(confirmPassword.trim() === password.trim());

        if (
            currentPassword.trim().length &&
            password.trim().length &&
            password.trim() !== currentPassword.trim() &&
            confirmPassword.trim() === password.trim()
        ) {
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
                        currentPassword={{ password: currentPassword, change: changeCurrentPassword, error: !currentPasswordValidate }}
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
export default ChangePasswordModal;
