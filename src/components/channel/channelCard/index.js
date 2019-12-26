import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../common/Avatar';
import './styles.scss';

const ChannelCard = ({ channel, showBorder, ...restProps }) => {
    const Description = () => {
        return (
            <div className="description">
                <p className="name">{channel.name}</p>

                <p>{`${channel.members} Member${channel.members > 1 ? 's' : ''}`}</p>
            </div>
        );
    };

    return (
        <Link to={`/channels/${channel.pk}`} className={`link${showBorder ? ' border-bottom' : ''}`} {...restProps}>
            <div className="card">
                <Avatar src={channel.logo} />
                <Description />
            </div>
        </Link>
    );
};
export default ChannelCard;
