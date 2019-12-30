import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab/';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';
import { sampleUser } from '../../../utils/hardcodedData';
import Avatar from '../../common/Avatar';

const RenderInputs = ({
    name: { name, error: nameError, change: changeName },
    description: { description, change: changeDescription },
    admins: { admins, change: changeAdmins },
    isSubmitting,
    submitForm,
    handleSubmit,
}) => {
    const potentialAdmins = [
        sampleUser,
        { ...sampleUser, pk: 2, name: 'amdigbari1' },
        { ...sampleUser, pk: 3, name: 'amdigbari2' },
        { ...sampleUser, pk: 4, name: 'amdigbari3' },
        { ...sampleUser, pk: 5, name: 'amdigbari4' },
        { ...sampleUser, pk: 6, name: 'amdigbari5' },
        { ...sampleUser, pk: 7, name: 'amdigbari6' },
    ];

    const RenderOption = ({ user, listBox = false }) => {
        return !listBox ? (
            <div className={styles['option-container']}>
                <Avatar src={user.avatar} size={25} />
                <p className={styles['option-text']}>{user.name}</p>
            </div>
        ) : (
            user.name
        );
    };

    const handleChange = (event, value) => {
        changeAdmins(value);
    };

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

            <Autocomplete
                options={potentialAdmins}
                getOptionLabel={user => <RenderOption user={user} />}
                renderOption={user => <RenderOption user={user} listBox />}
                multiple
                autoComplete
                renderInput={params => <TextField {...params} name="admins" label="admins" margin="normal" fullWidth />}
                onChange={handleChange}
            />

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

    const changeAdmins = value => {
        setAdmins(value);
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
