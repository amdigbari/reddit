import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { MdClose } from 'react-icons/md';
import MuiAlert from '@material-ui/lab/Alert';

import NotFound from 'components/notFound';
import ServerError from 'components/serverError';

const ScreenWithError = Component => {
    const Wrapper = ({ ...props }) => {
        let [_404, set404] = React.useState(false);
        let [_500, set500] = React.useState(false);
        let [snack, setSnack] = React.useState({});

        const raise404 = () => set404(true);
        const lower404 = () => set404(false);

        const raise500 = () => set500(true);
        const lower500 = () => set500(false);

        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setSnack({});
        };

        const Alert = props => {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        };

        return (
            <>
                {_404 ? (
                    <NotFound />
                ) : _500 ? (
                    <ServerError />
                ) : (
                    <Component
                        raise404={raise404}
                        raise500={raise500}
                        lower404={lower404}
                        lower500={lower500}
                        {...props}
                        setErrorMessage={setSnack}
                    />
                )}

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={!!snack.text}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snack.type}>
                        {snack.text}
                    </Alert>
                </Snackbar>
            </>
        );
    };

    return Wrapper;
};

export default ScreenWithError;
