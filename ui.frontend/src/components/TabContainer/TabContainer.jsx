import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './TabContainer.module.scss';
import cx from 'classnames';

const TabContainer = (props) => {
    const {children} = props;
    return(
        <div className={`content-media__info`}>
            {children}
        </div>
    );
};

TabContainer.displayName = 'TabContainer';

TabContainer.propTypes = {};

export default TabContainer;
