import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { useToggle } from '../../common/customHooks';
import RenderInputs from './Inputs';
import { createPost, getAvailableChannels } from 'actions/PostActions';
import { imageToBase64 } from 'utils/functionalUtils';

const CreatePostModal = React.memo(({ modalVisibility, toggleModalVisibility, createPost, getAvailableChannels, callback }) => {
    let [availableChannels, setAvailableChannels] = React.useState([]);
    let [channel, setChannel] = React.useState(null);
    let [caption, setCaption] = React.useState('');
    let [image, setImage] = React.useState(null);
    let [imageFile, setImageFile] = React.useState(null);

    let [captionValidate, setCaptionValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    React.useEffect(() => {
        getAvailableChannels().then(response => {
            setAvailableChannels(response);
            setChannel(response[0]);
        });
    }, [getAvailableChannels]);

    const changeCaption = ({ target }) => {
        setCaption(target.value);
    };

    const changeChannel = value => {
        setChannel(value);
    };

    const changeImage = imageInput => {
        if (imageInput) {
            setImageFile(imageInput.target.files[0]);
            imageToBase64(imageInput.target.files[0]).then(setImage);
        } else {
            setImage(null);
        }
    };

    const submitForm = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption.trim());
        formData.append('channel_id', channel.id);
        // formData.append('image', imageFile);

        createPost(formData)
            .then(response => {
                toggleModalVisibility();
                callback({ ...{ caption: caption.trim(), channel_id: channel.id }, ...response });
            })
            .finally(() => toggleIsSubmitting());
    };

    const submitButtonHandler = event => {
        setCaptionValidate(caption.trim().length);

        if (caption.length) {
            toggleIsSubmitting();
        } else {
            event.preventDefault();
        }
    };

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} className={styles['container']}>
            <CustomScreenWithBackButton goBack={toggleModalVisibility} title="Create Post">
                <div className={styles['container']}>
                    <RenderInputs
                        channel={{ channel, change: changeChannel }}
                        caption={{ caption, error: !captionValidate, change: changeCaption }}
                        image={{ image, change: changeImage }}
                        isSubmitting={isSubmitting}
                        handleSubmit={submitButtonHandler}
                        submitForm={submitForm}
                        possibleChannels={availableChannels}
                    />
                </div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});

const mapDispatchToProps = {
    createPost,
    getAvailableChannels,
};
export default connect(undefined, mapDispatchToProps)(CreatePostModal);
