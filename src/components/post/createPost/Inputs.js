import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab/';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { Animated } from 'react-animated-css';

import styles from './styles.module.scss';
import './material_style.scss';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import Avatar from '../../common/Avatar';
import AddImageIcon from '../../../assets/images/addImage.png';
import PostImage from '../postCard/PostImage';
import { ANIMATION_DURATION } from '../../../utils/staticUtils';

const RenderInputs = ({
    channel: { channel, change: changeChannel },
    caption: { caption, error: captionError, change: changeCaption },
    image: { image, change: changeImage },
    isSubmitting,
    submitForm,
    handleSubmit,
    possibleChannels,
}) => {
    let [imageVisibility, setImageVisibility] = React.useState(true);

    const handleChange = (event, value) => {
        changeChannel(value);
    };

    const hideImageEditContainer = () => setImageVisibility(false);

    const showImageEditContainer = () => setImageVisibility(true);

    const clearImage = () => changeImage(null);

    const RenderImageInput = () => {
        return <input type="file" accept="image/*" className={styles['add-image-input']} onChange={changeImage} />;
    };

    const RenderImage = () => {
        return (
            <div className={styles['add-image-container']}>
                {image ? (
                    <div
                        className={styles['image-preview-container']}
                        onMouseEnter={showImageEditContainer}
                        onMouseLeave={hideImageEditContainer}>
                        <PostImage src={image} />

                        <Animated
                            className={styles['edit-image-container']}
                            animationIn="fadeInUp"
                            animationOut="fadeOutDown"
                            animationInDuration={ANIMATION_DURATION}
                            animationOutDuration={ANIMATION_DURATION}
                            isVisible={imageVisibility}>
                            <div className={[styles['add-image-wrapper'], styles['icon']].join(' ')} style={{ marginRight: 15 }}>
                                <MdModeEdit size={30} />
                                <RenderImageInput />
                            </div>
                            <MdDelete size={30} className={styles['icon']} onClick={clearImage} />
                        </Animated>
                    </div>
                ) : (
                    <div className={styles['add-image-wrapper']}>
                        <img src={AddImageIcon} alt="add avatar" width="100" />
                        <RenderImageInput />
                    </div>
                )}
            </div>
        );
    };

    return (
        <form method="POST" action="/" onSubmit={submitForm}>
            <div className={styles['channel-container']}>
                <Autocomplete
                    options={possibleChannels}
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

            <RenderImage />

            <CustomButtonWithLoading className="button-container" type="submit" loading={isSubmitting} clickHandler={handleSubmit}>
                Create
            </CustomButtonWithLoading>
        </form>
    );
};
export default RenderInputs;
