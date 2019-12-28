import React from 'react';

import { sampleUser } from '../../../utils/hardcodedData';
import ProfileCard from '../profileCard';
import styles from './styles.module.scss';
import Avatar from '../../common/Avatar';

const FollowList = React.memo(({ match, history }) => {
    const isFollowers = React.useMemo(() => !!match.url.match(/followers/), [match]);
    const userPk = React.useMemo(() => match.params.pk, [match]);

    const user = React.useMemo(() => sampleUser, [userPk]);

    const usersList = React.useMemo(() => {
        return [sampleUser, { ...sampleUser, pk: 2 }, { ...sampleUser, pk: 3 }, { ...sampleUser, pk: 4 }];
    }, [userPk]);

    const RenderTitle = () => {
        return (
            <header className={styles['header-container']}>
                <Avatar src={user.avatar} />
                <p className={styles['title']}>{`${user.name}'s ${isFollowers ? 'Followers List' : 'Followings List'}`}</p>
                <Avatar src={sampleUser.avatar} style={{ opacity: 0 }} />
            </header>
        );
    };

    const RenderList = React.useCallback(() => {
        return (
            <div className={styles['list-container']}>
                {usersList.map((user, index, array) => (
                    <ProfileCard user={user} showBorder={index < array.length - 1} link />
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
export default FollowList;
