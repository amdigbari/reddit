import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../common/Avatar';
import { CustomButtonWithLoading } from '../../common/CommonComponents';
import './styles.scss';
import { useToggle } from '../../common/customHooks';

const ChannelCard = ({ channel, showBorder = false, showFollowButton = false, link = true, ...restProps }) => {
    let [loading, toggleLoading] = useToggle(false);

    const Description = () => {
        return (
            <div className="description">
                <p className="name">{channel.name}</p>

                <p>{`${channel.members} Member${channel.members > 1 ? 's' : ''}`}</p>
            </div>
        );
    };

    const followButtonClicked = () => {
        toggleLoading();
        //TODO: add toggle follow functionality
    };

    const FollowButton = () => {
        return (
            <CustomButtonWithLoading className="follow-button" loading={loading} clickHandler={followButtonClicked}>
                Follow
            </CustomButtonWithLoading>
        );
    };

    return link ? (
        <Link to={`/channels/${channel.pk}`} className={`card link${showBorder ? ' border-bottom' : ''}`} {...restProps}>
            <Avatar src={channel.logo} />
            <Description />
            {showFollowButton && <FollowButton />}
        </Link>
    ) : (
        <div className={`card ${showBorder ? ' border-bottom' : ''}`} {...restProps}>
            <Avatar src={channel.logo} />
            <Description />
            {showFollowButton && <FollowButton />}
        </div>
    );
};
export default ChannelCard;
