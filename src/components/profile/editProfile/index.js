import React from 'react';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { useToggle } from '../../common/customHooks';
import RenderInputs from './Inputs';
import { EMAIL_VALIDATOR, PHONE_VALIDATOR } from '../../../utils/staticUtils';

const EditProfileModal = React.memo(({ modalVisibility, toggleModalVisibility, user = {} }) => {
    // Required
    let [name, setName] = React.useState(user.name || '');
    let [email, setEmail] = React.useState(user.email || '');

    // Not Required
    let [image, setImage] = React.useState(user.avatar);
    let [phone, setPhone] = React.useState(user.phone || '');
    let [city, setCity] = React.useState(user.city || '');

    let [nameValidate, setNameValidate] = React.useState(true);
    let [emailValidate, setEmailValidate] = React.useState(true);
    let [phoneValidate, setPhoneValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeName = ({ target }) => {
        setName(target.value.trim());
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
        console.log('Submit');
    };

    const submitButtonHandler = event => {
        setNameValidate(name.length);
        setEmailValidate(!!email.match(EMAIL_VALIDATOR));
        setPhoneValidate(!phone.length || !!phone.match(PHONE_VALIDATOR));

        if (name.length && !!email.match(EMAIL_VALIDATOR) && (!phone.length || !!phone.match(PHONE_VALIDATOR))) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} className={styles['container']}>
            <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Edit Profile">
                <div className={styles['container']}>
                    <RenderInputs
                        name={{ name, change: changeName, error: !nameValidate }}
                        email={{ email, error: !emailValidate, change: changeEmail }}
                        phone={{ phone, change: changePhone, error: !phoneValidate }}
                        image={{ image, change: changeImage }}
                        city={{ city, change: changeCity }}
                        isSubmitting={isSubmitting}
                        handleSubmit={submitButtonHandler}
                        submitForm={submitForm}
                    />
                </div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});
export default EditProfileModal;
