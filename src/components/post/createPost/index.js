import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { useToggle } from '../../common/customHooks';
import RenderInputs from './Inputs';
import { createPost, getAvailableChannels } from 'actions/PostActions';

const CreatePostModal = React.memo(({ modalVisibility, toggleModalVisibility, createPost, getAvailableChannels }) => {
    let [availableChannels, setAvailableChannels] = React.useState([]);
    let [channel, setChannel] = React.useState(null);
    let [caption, setCaption] = React.useState('');
    let [image, setImage] = React.useState(null);

    let [captionValidate, setCaptionValidate] = React.useState(true);

    let [isSubmitting, toggleIsSubmitting] = useToggle(false);

    React.useEffect(() => {
        getAvailableChannels().then(response => {
            console.log(response);
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
        createPost({ caption: caption.trim(), channel_id: channel.id })
            .then(() => toggleModalVisibility())
            .catch(console.log)
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
