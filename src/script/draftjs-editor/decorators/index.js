import {CompositeDecorator} from 'draft-js';

import LinkDecorator from './LinkDecorator';

export default new CompositeDecorator([
    LinkDecorator
]);
