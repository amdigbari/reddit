import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import PostChannel from './PostChannel';
import PostAuthor from './PostAuthor';
import PostScore from './PostScore';

const PostCard = React.memo(({ post, showBorder = false }) => {
    return (
        <div className={[styles['card-container'], showBorder ? styles['border-bottom'] : ''].join(' ')}>
            <PostChannel channel={post.channel} />

            <Link to="#">
                <div className={styles['image-container']}>
                    <img src={post.image} alt="card_image" className={styles['card-image']} />
                </div>
            </Link>

            <LinesEllipsis
                component={'p'}
                text={post.caption}
                className={styles['caption-container']}
                maxLine={3}
                ellipsis="..."
                trimRight={false}
            />

            <div className={styles.footer}>
                <PostAuthor author={post.author} />
                <PostScore
                    score={post.score}
                    userScore={post.userScore}
                    setScore={() => {
                        //TODO:
                    }}
                />
            </div>
        </div>
    );
});
export default PostCard;
