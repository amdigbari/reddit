import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../common/Avatar';
import { CustomButton } from '../../common/CommonComponents';
import './styles.scss';
import { useToggle } from '../../common/customHooks';
import { LIGHT_PRIMARY_COLOR } from '../../../utils/staticUtils';

const ChannelCard = ({ channel, showBorder = false, link = true, ...restProps }) => {
    let [loading, toggleLoading] = useToggle(false);
    let [isFollow, toggleIsFollow] = useToggle(false);

    const Description = () => {
        return (
            <div className="description">
                <p className="name text-truncate">{channel.name}</p>

                <p>{`${channel.members} Member${channel.members > 1 ? 's' : ''}`}</p>
            </div>
        );
    };

    const followButtonClicked = () => {
        // toggleLoading();
        toggleIsFollow();
        //TODO: add toggle follow functionality
    };

    const FollowButton = () => {
        return isFollow ? (
            <CustomButton className="un-follow-button" onClick={followButtonClicked}>
                UnFollow
            </CustomButton>
        ) : (
            <CustomButton className="follow-button" color="transparent" hoverColor={LIGHT_PRIMARY_COLOR} onClick={followButtonClicked}>
                Follow
            </CustomButton>
        );
    };

    return (
        <div className={`card ${showBorder ? ' border-bottom' : ''}`} {...restProps}>
            {link ? (
                <Link to={`/channels/${channel.pk}`} className={`link`}>
                    <Avatar src={channel.logo} />
                    <Description />
                </Link>
            ) : (
                <>
                    <Avatar src={channel.logo} />
                    <Description />
                </>
            )}

            <FollowButton />
        </div>
    );
};
export default ChannelCard;
