import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { useToggle } from '../../common/customHooks';
import RenderInputs from './Inputs';
import { EMAIL_VALIDATOR, PHONE_VALIDATOR } from '../../../utils/staticUtils';
import ChangePasswordModal from './changePassword';
import { unRegisterUser } from '../../../actions/AuthActions';
import { updateProfile } from 'actions/ProfileActions';

const EditProfileModal = React.memo(
    ({ modalVisibility, toggleModalVisibility, user = {}, unregisterUser: logOut, setup = false, updateProfile }) => {
        // Required
        let [firstName, setFirstName] = React.useState(user.name || '');
        let [lastName, setLastName] = React.useState(user.name || '');
        let [email, setEmail] = React.useState(user.email || '');

        // Not Required
        let [image, setImage] = React.useState(user.avatar);
        let [phone, setPhone] = React.useState(user.phone || '');
        let [city, setCity] = React.useState(user.city || '');

        let [firstNameValidate, setFirstNameValidate] = React.useState(true);
        let [lastNameValidate, setLastNameValidate] = React.useState(true);
        let [emailValidate, setEmailValidate] = React.useState(true);
        let [phoneValidate, setPhoneValidate] = React.useState(true);

        let [isSubmitting, toggleIsSubmitting] = useToggle(false);

        let [changePasswordModalVisibility, toggleChangePasswordModalVisibility] = useToggle(false);

        const changeFirstName = ({ target }) => {
            setFirstName(target.value.trim());
        };
        const changeLastName = ({ target }) => {
            setLastName(target.value.trim());
        };
        const changeEmail = ({ target }) => {
            setEmail(target.value.trim());
        };
        const changePhone = ({ target }) => {
            setPhone(target.value.trim());
        };
        const changeCity = ({ target }) => {
            setCity(target.value.trim());
        };

        const changeImage = imageInput => {
            if (imageInput) {
                var file = imageInput.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = function(e) {
                    setImage(reader.result);
                };
            } else {
                setImage(null);
            }
        };

        const submitForm = event => {
            event.preventDefault();
            updateProfile({ first_name: firstName, last_name: lastName, phone, city, email }).finally(() => toggleIsSubmitting());
        };

        const submitButtonHandler = event => {
            setFirstNameValidate(firstName.length);
            setLastNameValidate(lastName.length);
            setEmailValidate(!!email.match(EMAIL_VALIDATOR));
            setPhoneValidate(!phone.length || !!phone.match(PHONE_VALIDATOR));

            if (firstName.length && !!email.match(EMAIL_VALIDATOR) && (!phone.length || !!phone.match(PHONE_VALIDATOR))) {
                toggleIsSubmitting();
            } else {
                event.preventDefault();
            }
        };

        return (
            <>
                <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} className={styles['container']}>
                    <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Edit Profile">
                        <div className={styles['container']}>
                            <RenderInputs
                                firstName={{ firstName, change: changeFirstName, error: !firstNameValidate }}
                                lastName={{ lastName, change: changeLastName, error: !lastNameValidate }}
                                email={{ email, error: !emailValidate, change: changeEmail }}
                                phone={{ phone, change: changePhone, error: !phoneValidate }}
                                image={{ image, change: changeImage }}
                                city={{ city, change: changeCity }}
                                isSubmitting={isSubmitting}
                                handleSubmit={submitButtonHandler}
                                submitForm={submitForm}
                                showChangePasswordModal={toggleChangePasswordModalVisibility}
                                logOut={logOut}
                                setup={setup}
                            />
                        </div>
                    </CustomScreenWithBackButton>
                </Modal>

                {!setup && (
                    <ChangePasswordModal
                        modalVisibility={changePasswordModalVisibility}
                        toggleModalVisibility={toggleChangePasswordModalVisibility}
                    />
                )}
            </>
        );
    },
);

const mapDispatchToProps = {
    unregisterUser: unRegisterUser,
    updateProfile,
};

export default connect(undefined, mapDispatchToProps)(EditProfileModal);
