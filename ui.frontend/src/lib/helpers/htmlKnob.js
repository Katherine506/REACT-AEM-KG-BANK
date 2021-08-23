import { text } from '@storybook/addon-knobs';
import he from 'he';

export default (...args) => {
    let ans = he.decode(text(...args));
    return ans;
};
