import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from './CommonComponents';
import { customFetch } from 'utils/functionalUtils';

const CustomPaginator = React.memo(({ renderItem, initialUrl, requestOptions }) => {
    let parentRef = React.useRef();

    let [nextUrl, setNextUrl] = React.useState(null);
    let [items, setItems] = React.useState([]);

    const loadMore = () => {
        customFetch(nextUrl || initialUrl, requestOptions).then(response => {
            setNextUrl(response.pagination.next);
            setItems([...items, ...response.data]);
        });
    };

    return (
        <div style={{ width: '100%', height: '100%' }} ref={parentRef}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={!items.length || nextUrl}
                initialLoad
                loader={<Loading />}
                useWindow={false}
                getScrollParent={() => parentRef}>
                {items.map(renderItem)}
            </InfiniteScroll>
        </div>
    );
});
export default CustomPaginator;
