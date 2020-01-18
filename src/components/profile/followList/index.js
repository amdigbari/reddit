import React from 'react';
import { connect } from 'react-redux';

import ProfileCard from '../profileCard';
import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';
import { getFollowList, getUserProfileById } from '../../../actions/ProfileActions';

const FollowList = React.memo(({ match, getUsersList, getUser }) => {
    const isFollowers = React.useMemo(() => !!match.url.match(/followers/), [match]);
    const userPk = React.useMemo(() => match.params.pk, [match]);

    const [user, setUser] = React.useState({});

    const [usersList, setUsersList] = React.useState([]);

    React.useEffect(() => {
        setUser(getUser(userPk));
    }, [userPk, getUser]);

    React.useEffect(() => {
        setUsersList(getUsersList(userPk, isFollowers ? 'followers' : 'followings'));
    }, [userPk, getUsersList, isFollowers]);

    const RenderTitle = () => {
        return (
            <header className={styles['header-container']}>
                <Avatar src={user.avatar} />
                <p className={styles['title']}>{`${user.name}'s ${isFollowers ? 'Followers List' : 'Followings List'}`}</p>
                <Avatar src={user.avatar} style={{ opacity: 0 }} />
            </header>
        );
    };

    const RenderList = React.useCallback(() => {
        return (
            <div className={styles['list-container']}>
                {usersList.map((user, index, array) => (
                    <ProfileCard key={user.pk} user={user} showBorder={index < array.length - 1} link />
                ))}
            </div>
        );
    }, [usersList]);

    return (
        <div className={styles['container']}>
            <RenderTitle />
            <RenderList />
        </div>
    );
});

const mapDispatchToProps = {
    getUsersList: getFollowList,
    getUser: getUserProfileById,
};
export default connect(undefined, mapDispatchToProps)(FollowList);
