import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

function hijackConsole(name) {
    const old = console[name];
    // make a new one
    console[name] = (...args) => {
        // always call the old one, because React Native does magic swizzling too
        old(...args);

        // send this off to Reactotron.
        Reactotron.display({
            name: `console.${name}`,
            value: args,
            preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
        });
    };
}

hijackConsole('log');
hijackConsole('warn');
hijackConsole('error');

const reactotron = Reactotron.configure({
    // use "adb reverse tcp:9090 tcp:9090" to connect
    host: '127.0.0.1',
})
    .use(reactotronRedux())
    .connect();

export default reactotron;
