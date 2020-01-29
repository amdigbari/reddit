import React from 'react';
import TextField from '@material-ui/core/TextField';
import { MdDelete, MdModeEdit, MdPhotoCamera } from 'react-icons/md';

import styles from './styles.module.scss';
import './material_style.scss';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import Avatar from '../../common/Avatar';
import { SHOW_ON_DESKTOP } from '../../../utils/staticUtils';

const RenderInputs = ({
    firstName: { firstName, change: changeFirstName, error: firstNameError },
    lastName: { lastName, change: changeLastName, error: lastNameError },
    email: { email, error: emailError, change: changeEmail },
    phone: { phone, change: changePhone, error: phoneError },
    image: { image, change: changeImage },
    city: { city, change: changeCity },
    isSubmitting,
    submitForm,
    handleSubmit,
    showChangePasswordModal,
    logOut,
    setup = false,
}) => {
    const clearImage = () => changeImage(null);

    const RenderImageInput = () => {
        return <input type="file" accept="image/*" className={styles['add-image-input']} onChange={changeImage} />;
    };

    const RenderImage = () => {
        return (
            <div className={styles['add-image-container']}>
                {image ? (
                    <div className={styles['image-preview-container']}>
                        <Avatar src={image} size={100} />

                        <div className={styles['edit-image-container']}>
                            <div className={[styles['add-image-wrapper'], styles['icon']].join(' ')} style={{ marginRight: 15 }}>
                                <MdModeEdit size={30} />
                                <RenderImageInput />
                            </div>
                            <MdDelete size={30} className={styles['icon']} onClick={clearImage} />
                        </div>
                    </div>
                ) : (
                    <div className={[styles['add-image-wrapper'], styles['add-image-background']].join(' ')}>
                        <MdPhotoCamera className={styles.icon} size={40} />
                        <RenderImageInput />
                    </div>
                )}
            </div>
        );
    };

    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <RenderImage />

            <TextField
                name="first_name"
                className="input-container animation-error"
                type="text"
                label="first_name *"
                color="secondary"
                value={firstName}
                onChange={changeFirstName}
                error={firstNameError}
                helperText="first name can't be empty"
            />
            <TextField
                name="last_name"
                className="input-container animation-error"
                type="text"
                label="last_name *"
                color="secondary"
                value={lastName}
                onChange={changeLastName}
                error={lastNameError}
                helperText="last name can't be empty"
            />
            <TextField
                name="email"
                className="input-container animation-error"
                type="text"
                label="email *"
                color="secondary"
                value={email}
                onChange={changeEmail}
                error={emailError}
                helperText="invalid email!!"
            />
            <TextField
                name="phone"
                className="input-container animation-error"
                type="phone"
                label="phone"
                color="secondary"
                value={phone}
                onChange={changePhone}
                error={phoneError}
                helperText="invalid phone number!!"
            />
            <TextField
                name="city"
                className="input-container animation-error"
                type="text"
                label="city"
                color="secondary"
                value={city}
                onChange={changeCity}
            />

            {!setup && (
                <p className={[styles['change-password'], 'danger'].join(' ')} onClick={showChangePasswordModal}>
                    change password
                </p>
            )}

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Save
            </CustomButtonWithLoading>

            <p
                className={[styles['change-password'], 'danger'].join(' ')}
                onClick={logOut}
                style={{ marginTop: 50 }}
                desc={SHOW_ON_DESKTOP}>
                Log Out
            </p>
        </form>
    );
};
export default RenderInputs;
