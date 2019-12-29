import React from 'react';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';

const RenderInputs = ({
    name: { name, error: nameError, change: changeName },
    description: { description, change: changeDescription },
    admins: { admins, change: changeAdmins },
    isSubmitting,
    submitForm,
    handleSubmit,
}) => {
    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <TextField
                name="name"
                className="input-container animation-error"
                type="text"
                label="name"
                color="secondary"
                value={name}
                onChange={changeName}
                error={nameError}
                helperText="name can't be empty"
            />
            <TextField
                name="description"
                className="input-container animation-error"
                type="text"
                label="description"
                color="secondary"
                value={description}
                onChange={changeDescription}
            />
            {/* <TextField
                name="confirm_password"
                className="input-container animation-error"
                type="password"
                label="password"
                color="secondary"
                value={admins}
                onChange={changeAdmins}
            /> */}

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Create
            </CustomButtonWithLoading>
        </form>
    );
};

const CreateChannelModal = React.memo(({ modalVisibility, toggleModalVisibility }) => {
    let [name, setName] = React.useState('');
    let [description, setDescription] = React.useState('');
    let [admins, setAdmins] = React.useState([]);

    let [nameValidate, setNameValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeName = ({ target }) => {
        setName(target.value.trim());
    };

    const changeDescription = ({ target }) => {
        setDescription(target.value.trim());
    };

    const changeAdmins = ({ target }) => {
        setAdmins(target.value.trim());
    };

    const submitForm = event => {
        event.preventDefault();
        console.log('Submit');
    };

    const submitButtonHandler = event => {
        setNameValidate(name.length);

        if (name.length) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} containerClassName={styles['container']}>
            <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Create Channel">
                <div className={styles['container']}>
                    <RenderInputs
                        name={{ name: name, error: !nameValidate, change: changeName }}
                        description={{ description: description, change: changeDescription }}
                        admins={{ admins, change: changeAdmins }}
                        isSubmitting={isSubmitting}
                        handleSubmit={submitButtonHandler}
                        submitForm={submitForm}
                    />
                </div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});
export default CreateChannelModal;
