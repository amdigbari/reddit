import React from 'react';

import styles from './styles.module.scss';
import CustomScreen from '../../common/customScreen/CustomScreen';
import PostCard from '../postCard/PostCard';
import { samplePost } from '../../../utils/hardcodedData';

const PostScreen = React.memo(({ match }) => {
    //use post pk to get full post from server
    const postPk = React.useMemo(() => match.params.pk, [match]);

    return (
        <CustomScreen className={styles.container}>
            <PostCard post={samplePost} fullCaption />
        </CustomScreen>
    );
});
export default PostScreen;
