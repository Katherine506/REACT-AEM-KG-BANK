import React from 'react';
import spacing from '../../styles/constants/spacing.scss';

const Spacer = (props) => {
    return (
        <div
            style={{
                height: spacing[props.spacerSize],
            }}
        />
    );
};

Spacer.displayName = 'Spacer';

export default Spacer;
