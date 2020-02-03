import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ProfileCard from '../profileCard';
import PostsScreen from '../../post/postsScreen';
import './styles.scss';
import { getUserProfileById } from '../../../actions/ProfileActions';
import { userFollowingsPath, userFollowersPath } from '../../../utils/pathUtils';

const ProfileScreen = React.memo(({ match, getUserProfile, loginUser }) => {
    const userPk = React.useMemo(() => match.params.pk, [match]);

    let [user, setUser] = React.useState({});

    React.useEffect(() => {
        userPk && getUserProfile(userPk).then(setUser);
    }, [userPk, getUserProfile]);

    const Bio = () => {
        return (
            <>
                <div className="description-container">
                    <h4>About</h4>
                    <p className="description-text">{user.bio || ''}</p>
                </div>

                <div className="description-container">
                    <h4>Stats</h4>
                    <div className="stats-wrapper">
                        <div>
                            <h4 className="danger">{user.no_posts}</h4>
                            <p>Posts</p>
                        </div>
                        <Link to={userFollowersPath(userPk)}>
                            <div>
                                <h4 className="danger">{user.no_followers}</h4>
                                <p>Followers</p>
                            </div>
                        </Link>
                        <Link to={userFollowingsPath(userPk)}>
                            <div>
                                <h4 className="danger">{user.no_followings}</h4>
                                <p>Followings</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </>
        );
    };

    const UserPosts = () => {
        return (
            <div className="posts-container">
                <PostsScreen showFloatButton={false} authorsLink={false} />
            </div>
        );
    };

    return (
        // TODO: remove user.username
        (user.id || user.username) && (
            <>
                <ProfileCard user={user} showBorder className="profile-card" showEdit={loginUser.id === user.id} />
                <Bio />
                <UserPosts />
            </>
        )
    );
});

const mapStateToProps = state => {
    return { loginUser: state.loginUser };
};

const mapDispatchToProps = {
    getUserProfile: getUserProfileById,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
