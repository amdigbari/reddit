import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Avatar from '../../common/Avatar';
import { CustomButton } from '../../common/CommonComponents';
import './styles.scss';
import { useToggle } from '../../common/customHooks';
import { LIGHT_PRIMARY_COLOR, SILVER_GRAY } from '../../../utils/staticUtils';
import { channelPath, basePath } from '../../../utils/pathUtils';
import { followChannel, deleteChannel } from 'actions/ChannelActions';

const ChannelCard = ({ channel, showBorder = false, link = true, followChannel, edit, showEdit, deleteChannel, ...restProps }) => {
    // let [loading, toggleLoading] = useToggle(false);
    let [isFollow, toggleIsFollow] = useToggle(channel.follow);
    let [openDialog, setDialogOpen] = React.useState(false);

    let history = useHistory();

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

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const removeChannel = () => {
        deleteChannel(channel.id).then(() => {
            history.push(basePath);
        });
    };

    const FollowButton = () => {
        return edit ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <MdDelete
                    color={SILVER_GRAY}
                    className="pointer"
                    size={23}
                    onClick={() => {
                        setDialogOpen(true);
                    }}
                    style={{ marginRight: 25 }}
                />

                <CustomButton className="follow-button" color="transparent" hoverColor={LIGHT_PRIMARY_COLOR} onClick={showEdit}>
                    Edit Channel
                </CustomButton>
            </div>
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

            {edit && (
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle id="alert-dialog-title">Are you Sore??</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Are you sure about delete this channel??</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton style={{ height: 35 }} onClick={handleCloseDialog}>
                            Cancel
                        </CustomButton>
                        <CustomButton style={{ height: 35 }} onClick={removeChannel}>
                            Confirm
                        </CustomButton>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

const mapDispatchToProps = {
    followChannel,
    deleteChannel,
};
export default connect(undefined, mapDispatchToProps)(ChannelCard);
