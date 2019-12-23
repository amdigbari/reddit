import React from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/AuthActions';
import styles from './styles.module.scss';
import logo from '../../assets/images/reddit_logo.png';
import { CustomButton } from '../common/CommonComponents';
import SignIn from './SignIn';
import SignUp from './SignUp';

const PAGE_TYPES = {
    auth: 'auth',
    login: 'login',
    signUp: 'signUp',
};

const Auth = React.memo(({ loginUser, registerUser, unregisterUser }) => {
    let [page, setPage] = React.useState(PAGE_TYPES.auth);

    const showLoginPage = () => setPage(PAGE_TYPES.login);

    const showSignUpPage = () => setPage(PAGE_TYPES.signUp);

    const showAuthPage = () => setPage(PAGE_TYPES.auth);

    const Description = () => {
        return (
            <>
                <img alt="Reddit" src={logo} className={styles['reddit-avatar']} />
                <h2 className={styles['reddit-title']}>DNews</h2>
                <p className={styles['reddit-description']}>DNews is a social website to share your news with friends</p>
            </>
        );
    };

    const LoginButton = () => {
        return (
            <CustomButton className={styles['login-page-button']} onClick={showLoginPage}>
                Sign In
            </CustomButton>
        );
    };

    const SignUpButton = () => {
        return (
            <p className={styles['signup-page-button']} onClick={showSignUpPage}>
                Create New Account
            </p>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles['auth-container']}>
                {page === PAGE_TYPES.auth ? (
                    <>
                        <Description />
                        <LoginButton />
                        <SignUpButton />
                    </>
                ) : page === PAGE_TYPES.login ? (
                    <SignIn goBack={showAuthPage} />
                ) : (
                    <SignUp />
                )}
            </div>
        </div>
    );
});

const mapDispatchToProps = {
    registerUser,
};
export default connect(undefined, mapDispatchToProps)(Auth);
