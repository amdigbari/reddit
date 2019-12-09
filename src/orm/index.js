import { ORM } from 'redux-orm';

const orm = new ORM({
    stateSelector: state => state.ormDatabase,
});

orm.register();

export default orm;
