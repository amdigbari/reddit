import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab/';
import { connect } from 'react-redux';
import { MdDelete, MdModeEdit, MdPhotoCamera } from 'react-icons/md';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';
import Avatar from '../../common/Avatar';
import { createChannel, getPotentialAuthors } from 'actions/ChannelActions';
import { imageToBase64 } from 'utils/functionalUtils';

const RenderInputs = ({
    name: { name, error: nameError, change: changeName },
    description: { description, change: changeDescription },
    authors: { change: changeAuthors },
    image: { image, change: changeImage },
    isSubmitting,
    submitForm,
    handleSubmit,
    possibleAuthors,
    edit,
}) => {
    const RenderImageInput = () => {
        return <input type="file" accept="image/*" className={styles['add-image-input']} onChange={changeImage} />;
    };

    const clearImage = () => changeImage(null);

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

    const handleChange = (event, value) => {
        changeAuthors(value);
    };

    const renderOption = author => {
        return (
            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }} key={author.id}>
                <Avatar size={25} src={author.picture} />
                <p style={{ marginLeft: 15 }}>{author.username}</p>
            </div>
        );
    };

    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <RenderImage />

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
                name="rules"
                className="input-container animation-error"
                type="text"
                label="rules"
                color="secondary"
                value={description}
                onChange={changeDescription}
            />

            {edit && (
                <Autocomplete
                    options={possibleAuthors}
                    getOptionLabel={channel => channel.name}
                    renderOption={renderOption}
                    autoComplete
                    disableClearable
                    renderInput={params => <TextField {...params} name="authors" label="authors" margin="normal" fullWidth />}
                    onChange={handleChange}
                    multiple
                />
            )}

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Create
            </CustomButtonWithLoading>
        </form>
    );
};

const CreateChannelModal = React.memo(
    ({ modalVisibility, toggleModalVisibility, createChannel, callback, edit, channel, getAvailableAuthors }) => {
        let [name, setName] = React.useState(edit ? channel.name : '');
        let [description, setDescription] = React.useState(edit ? channel.rules : '');
        let [image, setImage] = React.useState(edit ? channel.avatar : null);
        let [authors, setAuthors] = React.useState(edit ? channel.authors : []);
        let [availableAuthors, setAvailableAuthors] = React.useState([]);
        let [imageFile, setImageFile] = React.useState(null);

        let [nameValidate, setNameValidate] = React.useState(true);

        let [isSubmitting, toggleIsSubmitting] = useToggle(false);

        React.useEffect(() => {
            edit && getAvailableAuthors(channel.id).then(setAvailableAuthors);
        }, [channel, edit]);

        const changeName = ({ target }) => {
            setName(target.value);
        };

        const changeDescription = ({ target }) => {
            setDescription(target.value);
        };

        const submitForm = event => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('rules', description.trim());
            imageFile && formData.append('avatar', imageFile);
            if (edit) {
                formData.append('admin', channel.admin);
                authors.forEach(author => {
                    formData.append('authors', author.id);
                });
            }

            createChannel(formData, edit, channel ? channel.id : null)
                .then(response => {
                    toggleModalVisibility();
                    callback({
                        ...{ name: name.trim(), rules: description.trim(), avatar: image },
                        ...response,
                        ...(edit ? {} : { id: response.channel_id }),
                    });
                })
                .finally(() => toggleIsSubmitting());
        };

        const submitButtonHandler = event => {
            setNameValidate(name.trim().length);

            if (name.length) {
                toggleIsSubmitting();
            } else {
                event.preventDefault();
            }
        };

        const changeImage = imageInput => {
            if (imageInput) {
                setImageFile(imageInput.target.files[0]);
                imageToBase64(imageInput.target.files[0]).then(image => setImage(image));
            } else {
                setImage(null);
            }
        };

        return (
            <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} className={styles['container']}>
                <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Create Channel">
                    <div className={styles['container']}>
                        <RenderInputs
                            name={{ name: name, error: !nameValidate, change: changeName }}
                            description={{ description: description, change: changeDescription }}
                            authors={{ authors, change: setAuthors }}
                            image={{ image, change: changeImage }}
                            isSubmitting={isSubmitting}
                            handleSubmit={submitButtonHandler}
                            submitForm={submitForm}
                            edit={edit}
                            possibleAuthors={availableAuthors}
                        />
                    </div>
                </CustomScreenWithBackButton>
            </Modal>
        );
    },
);

const mapDispatchToProps = {
    createChannel,
    getAvailableAuthors: getPotentialAuthors,
};
export default connect(undefined, mapDispatchToProps)(CreateChannelModal);
