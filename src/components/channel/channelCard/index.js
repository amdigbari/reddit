import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Avatar from '../../common/Avatar';
import { CustomButton } from '../../common/CommonComponents';
import './styles.scss';
import { useToggle } from '../../common/customHooks';
import { LIGHT_PRIMARY_COLOR } from '../../../utils/staticUtils';
import { channelPath } from '../../../utils/pathUtils';
import { followChannel } from 'actions/ChannelActions';

const ChannelCard = ({ channel, showBorder = false, link = true, followChannel, edit, showEdit, ...restProps }) => {
    // let [loading, toggleLoading] = useToggle(false);
    let [isFollow, toggleIsFollow] = useToggle(channel.follow);

    const Description = () => {
        return (
            <div className="description">
                <p className="name text-truncate">{channel.name}</p>
            </div>
        );
    };

    const followButtonClicked = () => {
        // toggleLoading();
        followChannel(channel.id, isFollow).then(() => toggleIsFollow());
    };

    const FollowButton = () => {
        return edit ? (
            <CustomButton className="follow-button" color="transparent" hoverColor={LIGHT_PRIMARY_COLOR} onClick={showEdit}>
                Edit Channel
            </CustomButton>
        ) : isFollow ? (
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
                <Link to={channelPath(channel.id)} className={`link`}>
                    <Avatar src={channel.avatar} />
                    <Description />
                </Link>
            ) : (
                <>
                    <Avatar src={channel.avatar} />
                    <Description />
                </>
            )}

            <FollowButton />
        </div>
    );
};

const mapDispatchToProps = {
    followChannel,
};
export default connect(undefined, mapDispatchToProps)(ChannelCard);
