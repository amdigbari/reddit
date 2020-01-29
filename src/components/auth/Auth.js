import React from 'react';
import { connect, useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import logo from 'assets/images/reddit_logo.png';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import { registerUser, loginUser, checkLogin, registerUserSuccess } from 'actions/AuthActions';
import { CustomButton, Loading } from 'components/common/CommonComponents';

const PAGE_TYPES = {
    auth: 'auth',
    login: 'login',
    signUp: 'signUp',
    forgotPassword: 'forgotPassword',
};

const Auth = React.memo(({ loginUser, checkLogin, registerUser }) => {
    let [page, setPage] = React.useState(PAGE_TYPES.auth);
    let [loading, setLoading] = React.useState(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (dispatch) {
            if (localStorage.getItem('token')) {
                checkLogin()
                    .then(res => {
                        dispatch(registerUserSuccess(res[0]));
                    })
                    .catch(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        }
    }, [dispatch]);

    const showLoginPage = () => setPage(PAGE_TYPES.login);

    const showSignUpPage = () => setPage(PAGE_TYPES.signUp);

    const showAuthPage = () => setPage(PAGE_TYPES.auth);

    const showForgotPasswordPage = () => setPage(PAGE_TYPES.forgotPassword);

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

    const signUpUser = user => {
        return registerUser(user);
    };

    const signInUser = user => {
        return loginUser(user);
    };

    return (
        <div className={styles.container}>
            <div className={styles['auth-container']} style={{ maxWidth: page === PAGE_TYPES.auth ? 600 : 'unset' }}>
                {loading ? (
                    <Loading />
                ) : page === PAGE_TYPES.auth ? (
                    <>
                        <Description />
                        <LoginButton />
                        <SignUpButton />
                    </>
                ) : page === PAGE_TYPES.login ? (
                    <SignIn goBack={showAuthPage} showForgotPasswordPage={showForgotPasswordPage} registerUser={signInUser} />
                ) : page === PAGE_TYPES.signUp ? (
                    <SignUp goBack={showAuthPage} registerUser={signUpUser} />
                ) : (
                    <ResetPassword goBack={showLoginPage} />
                )}
            </div>
        </div>
    );
});

const mapDispatchToProps = {
    registerUser,
    loginUser,
    checkLogin,
};
export default connect(undefined, mapDispatchToProps)(Auth);
