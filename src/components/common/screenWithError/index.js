import React from 'react';
import NotFound from 'components/notFound';
import ServerError from 'components/serverError';

const ScreenWithError = Component => {
    const Wrapper = ({ ...props }) => {
        let [_404, set404] = React.useState(false);
        let [_500, set500] = React.useState(false);

        const raise404 = () => set404(true);
        const lower404 = () => set404(false);

        const raise500 = () => set500(true);
        const lower500 = () => set500(false);

        return _404 ? (
            <NotFound />
        ) : _500 ? (
            <ServerError />
        ) : (
            <Component raise404={raise404} raise500={raise500} lower404={lower404} lower500={lower500} {...props} />
        );
    };

    return Wrapper;
};

export default ScreenWithError;
