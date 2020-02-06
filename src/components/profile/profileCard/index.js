import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.scss';
import Avatar from '../../common/Avatar';
import { CustomButtonWithLoading, CustomButton } from '../../common/CommonComponents';
import { useToggle } from '../../common/customHooks';
import { LIGHT_PRIMARY_COLOR } from '../../../utils/staticUtils';
import EditProfileModal from '../editProfile';
import { userPath } from '../../../utils/pathUtils';
import { followUser } from 'actions/ProfileActions';

const ProfileCard = ({ user, showBorder = false, link = false, className = '', loginUser, followUser, ...restProps }) => {
    // let [loading, toggleLoading] = useToggle(false);
    let [editModalVisibility, toggleEditModalVisibility] = useToggle(false);
    let [isFollow, toggleIsFollow] = useToggle(user.follow || false);

    let showEdit = React.useMemo(() => loginUser.id === user.id, [loginUser, user]);

    const followButtonClicked = () => {
        // toggleLoading();
        followUser(user.id, isFollow).then(() => toggleIsFollow());
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
                    <EditProfileModal
                        modalVisibility={editModalVisibility}
                        toggleModalVisibility={toggleEditModalVisibility}
                        user={{ ...user, ...loginUser }}
                    />
                )}
            </>
        );
    };

    const RenderProfileAvatar = () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={user.picture} />
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

const mapStateToProps = state => {
    return { loginUser: state.loginUser };
};
const mapDispatchToProps = {
    followUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
