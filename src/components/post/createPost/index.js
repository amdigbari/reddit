import React from 'react';

import styles from './styles.module.scss';
import './material_style.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import { useToggle } from '../../common/customHooks';
import { sampleChannel } from '../../../utils/hardcodedData';
import RenderInputs from './Inputs';

const potentialChannels = [
    sampleChannel,
    { ...sampleChannel, pk: 2, name: 'amdigbari1' },
    { ...sampleChannel, pk: 3, name: 'amdigbari2' },
    { ...sampleChannel, pk: 4, name: 'amdigbari3' },
    { ...sampleChannel, pk: 5, name: 'amdigbari4' },
    { ...sampleChannel, pk: 6, name: 'amdigbari5' },
    { ...sampleChannel, pk: 7, name: 'amdigbari6' },
];

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
        setCaptionValidate(caption.length);

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
                        possibleChannels={potentialChannels}
                    />
                </div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});
export default CreatePostModal;
