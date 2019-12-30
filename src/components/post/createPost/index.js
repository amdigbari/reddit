import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab/';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';
import { sampleChannel } from '../../../utils/hardcodedData';
import Avatar from '../../common/Avatar';

const potentialChannels = [
    sampleChannel,
    { ...sampleChannel, pk: 2, name: 'amdigbari1' },
    { ...sampleChannel, pk: 3, name: 'amdigbari2' },
    { ...sampleChannel, pk: 4, name: 'amdigbari3' },
    { ...sampleChannel, pk: 5, name: 'amdigbari4' },
    { ...sampleChannel, pk: 6, name: 'amdigbari5' },
    { ...sampleChannel, pk: 7, name: 'amdigbari6' },
];

const RenderInputs = ({
    channel: { channel, change: changeChannel },
    caption: { caption, error: captionError, change: changeCaption },
    image: { image, change: changeImage },
    isSubmitting,
    submitForm,
    handleSubmit,
}) => {
    const handleChange = (event, value) => {
        console.log(value);
        changeChannel(value);
    };

    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <div className={styles['channel-container']}>
                <Autocomplete
                    options={potentialChannels}
                    getOptionLabel={channel => channel.name}
                    autoComplete
                    disableClearable
                    defaultValue={channel}
                    renderInput={params => <TextField {...params} name="channel" label="channel" margin="normal" fullWidth />}
                    onChange={handleChange}
                />
                <Avatar src={channel.logo} size={25} className={styles['channel-logo']} />
            </div>

            <TextField
                name="caption"
                className="input-container animation-error"
                type="text"
                label="caption"
                color="secondary"
                value={caption}
                onChange={changeCaption}
                error={captionError}
                helperText="caption can't be empty"
            />

            {/* TODO: add image input */}

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Create
            </CustomButtonWithLoading>
        </form>
    );
};

const CreatePostModal = React.memo(({ modalVisibility, toggleModalVisibility }) => {
    let [channel, setChannel] = React.useState(potentialChannels[0]);
    let [caption, setCaption] = React.useState('');
    let [image, setImage] = React.useState(null);

    let [captionValidate, setCaptionValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    const changeCaption = ({ target }) => {
        setCaption(target.value.trim());
    };

    const changeChannel = value => {
        setChannel(value);
    };

    const changeImage = value => {
        setImage(value);
    };

    const submitForm = event => {
        event.preventDefault();
        console.log('Submit');
    };

    const submitButtonHandler = event => {
        setCaptionValidate(caption.length);

        if (caption.length) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} containerClassName={styles['container']}>
            <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Create Post">
                <div className={styles['container']}>
                    <RenderInputs
                        channel={{ channel, change: changeChannel }}
                        caption={{ caption, error: !captionValidate, change: changeCaption }}
                        image={{ image, change: changeImage }}
                        isSubmitting={isSubmitting}
                        handleSubmit={submitButtonHandler}
                        submitForm={submitForm}
                    />
                </div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});
export default CreatePostModal;
