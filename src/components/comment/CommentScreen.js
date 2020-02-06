import React from 'react';
import { connect } from 'react-redux';

import ScreenWithError from 'components/common/screenWithError';
import Comment from 'components/comment/Comment';
import { getCommentById } from 'actions/commentActions';

const CommentScreen = React.memo(({ match, getComment }) => {
    const commentPk = React.useMemo(() => match.params.pk, [match]);

    let [comment, setComment] = React.useState({});

    React.useEffect(() => {
        getComment(commentPk).then(setComment);
    }, [commentPk]);

    return comment.id && <Comment comment={comment} />;
});

const mapDispatchToProps = {
    getComment: getCommentById,
};
export default connect(undefined, mapDispatchToProps)(ScreenWithError(CommentScreen));
