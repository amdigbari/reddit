import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import Avatar from '../../common/Avatar';
import { CustomButtonWithLoading, CustomButton } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';
import { LIGHT_PRIMARY_COLOR } from '../../../utils/staticUtils';
import EditProfileModal from '../editProfile';

const ProfileCard = ({ user, showBorder = false, showEdit = false, link = false, className = '', ...restProps }) => {
    let [loading, toggleLoading] = useToggle(false);
    let [editModalVisibility, toggleEditModalVisibility] = useToggle(false);

    const followButtonClicked = () => {
        toggleLoading();
        //TODO: add toggle follow functionality
    };

    const editButtonClicked = () => {
        toggleEditModalVisibility();
    };

    const FollowButton = () => {
        return (
            <>
                <div className="buttons-container">
                    {showEdit && (
                        <CustomButton
                            color="transparent"
                            hoverColor={LIGHT_PRIMARY_COLOR}
                            onClick={editButtonClicked}
                            className="edit-profile-button">
                            Edit Profile
                        </CustomButton>
                    )}
                    <CustomButtonWithLoading className="follow-button" loading={loading} clickHandler={followButtonClicked}>
                        Follow
                    </CustomButtonWithLoading>
                </div>

                {showEdit && (
                    <EditProfileModal modalVisibility={editModalVisibility} toggleModalVisibility={toggleEditModalVisibility} user={user} />
                )}
            </>
        );
    };

    return link ? (
        <Link to={`/profile/${user.pk}`} className={`container${showBorder ? ' border-bottom' : ''} ${className}`} {...restProps}>
            <Avatar src={user.avatar} />
            <div className="name-container">
                <p className="text-truncate">{user.name}</p>
            </div>
            <FollowButton />
        </Link>
    ) : (
        <div className={`container${showBorder ? ' border-bottom' : ''} ${className}`} {...restProps}>
            <Avatar src={user.avatar} />
            <div className="name-container">
                <p className="text-truncate">{user.name}</p>
            </div>
            <FollowButton />
        </div>
    );
};
export default ProfileCard;
