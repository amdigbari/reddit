import React from 'react';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

import styles from './styles.module.scss';
import { GRAY, GREEN, RED } from '../../../utils/staticUtils';

const PostScore = ({ score, setScore, userScore }) => {
    return (
        <div className={styles['score-container']}>
            <IoMdArrowDropup
                onClick={() => setScore(userScore > 0 ? 0 : 1)}
                size={30}
                color={userScore > 0 ? GREEN : GRAY}
                cursor={userScore > 0 ? 'unset' : 'pointer'}
            />

            <p style={{ marginTop: -7 }}>{score}</p>

            <IoMdArrowDropdown
                onClick={() => setScore(userScore < 0 ? 0 : -1)}
                size={30}
                color={userScore < 0 ? RED : GRAY}
                style={{ marginTop: -7 }}
                cursor={userScore < 0 ? 'unset' : 'pointer'}
            />
        </div>
    );
};
export default PostScore;
