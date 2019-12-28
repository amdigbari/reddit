import React from 'react';

import { sampleUser } from '../../../utils/hardcodedData';
import ProfileCard from '../profileCard';
import PostsScreen from '../../post/postsScreen';
import './styles.scss';

const ProfileScreen = React.memo(({ match }) => {
    const userPk = React.useMemo(() => match.params.pk, [match]);

    const user = React.useMemo(() => {
        return sampleUser;
    }, [userPk]);

    const Bio = () => {
        return (
            <>
                <div className="description-container">
                    <h4>About</h4>
                    <p className="description-text">{user.bio}</p>
                </div>

                <div className="description-container">
                    <h4>Stats</h4>
                    <div className="stats-wrapper">
                        <div>
                            <h4 className="danger">{user.postsCount}</h4>
                            <p>Posts</p>
                        </div>
                        <div>
                            <h4 className="danger">{user.followersCount}</h4>
                            <p>Followers</p>
                        </div>
                        <div>
                            <h4 className="danger">{user.followingsCount}</h4>
                            <p>Followings</p>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const UserPosts = () => {
        return (
            <div className="posts-container">
                <PostsScreen showFloatButton={false} />
            </div>
        );
    };

    return (
        <>
            <ProfileCard user={user} showBorder className="profile-card" showEdit />
            <Bio />
            <UserPosts />
        </>
    );
});
export default ProfileScreen;
