import React from 'react';

import styles from './styles.module.scss';
import Modal from '../../common/Modal';
import CustomScreenWithBackButton from '../../common/screenWithBackButton/CustomScreenWithBackButton';
import SearchBar from '../../common/searchbar/SearchBar';

const SearchModal = React.memo(({ modalVisibility, toggleModalVisibility, setLoading, search, Results }) => {
    const renderSearchInput = React.useCallback(() => {
        return <SearchBar autoFocus search={search} setLoading={setLoading} />;
    }, [search]);

    return (
        <Modal modalVisibility={modalVisibility} toggleVisibility={toggleModalVisibility} className={styles['container']}>
            <CustomScreenWithBackButton goBack={toggleModalVisibility} renderTitle={renderSearchInput}>
                <div className={styles['content']}>{<Results />}</div>
            </CustomScreenWithBackButton>
        </Modal>
    );
});
export default SearchModal;
