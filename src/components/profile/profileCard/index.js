import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import Avatar from '../../common/Avatar';
import { CustomButtonWithLoading, CustomButton } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';
import { LIGHT_PRIMARY_COLOR } from '../../../utils/staticUtils';
import EditProfileModal from '../editProfile';
import { userPath } from '../../../utils/pathUtils';

const ProfileCard = ({ user, showBorder = false, showEdit = false, link = false, className = '', ...restProps }) => {
    let [loading, toggleLoading] = useToggle(false);
    let [editModalVisibility, toggleEditModalVisibility] = useToggle(false);
    let [isFollow, toggleIsFollow] = useToggle(user.follow || false);

    const followButtonClicked = () => {
        // toggleLoading();
        toggleIsFollow();
        //TODO: add toggle follow functionality
    };

    const editButtonClicked = () => {
        toggleEditModalVisibility();
    };

    const RenderFollowButton = React.useCallback(() => {
        return isFollow ? (
            <CustomButton className="follow-button" onClick={followButtonClicked}>
                UnFollow
            </CustomButton>
        ) : (
            <CustomButton
                className="edit-profile-button"
                color="transparent"
                hoverColor={LIGHT_PRIMARY_COLOR}
                onClick={followButtonClicked}>
                Follow
            </CustomButton>
        );
    }, [isFollow]);

    const FollowButton = () => {
        return (
            <>
                <div className="buttons-container">
                    {showEdit ? (
                        <CustomButton
                            color="transparent"
                            hoverColor={LIGHT_PRIMARY_COLOR}
                            onClick={editButtonClicked}
                            className="edit-profile-button">
                            Edit Profile
                        </CustomButton>
                    ) : (
                        <RenderFollowButton />
                    )}
                </div>

                {showEdit && (
                    <EditProfileModal modalVisibility={editModalVisibility} toggleModalVisibility={toggleEditModalVisibility} user={user} />
                )}
            </>
        );
    };

    const RenderProfileAvatar = () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.avatar} />
            <div className="name-container">
                <p className="text-truncate">{user.username}</p>
            </div>
        </div>
    );

    return (
        <div className={`container${showBorder ? ' border-bottom' : ''} ${className}`} {...restProps}>
            {link ? (
                <Link to={userPath(user.id)}>
                    <RenderProfileAvatar />
                </Link>
            ) : (
                <RenderProfileAvatar />
            )}
            <FollowButton />
        </div>
    );
};
export default ProfileCard;
