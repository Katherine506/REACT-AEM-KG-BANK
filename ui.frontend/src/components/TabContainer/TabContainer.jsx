import React, {useEffect, useRef} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './TabContainer.module.scss';
import cx from 'classnames';

const TabContainer = (props) => {
    const {children, wcChildren, label} = props;
    const items = useRef([]);
    let newDiv = [];

    const filterNodes =(n) => {
        //exclude html contents and cq markup if not in edit node
        return (
            ! [Node.TEXT_NODE, Node.COMMENT_NODE, "cq"].includes(n.nodeType)

        );
    };
     //useEffect

    useEffect( () =>{
       wcChildren.nodes.filter(filterNodes)[0].childNodes.forEach((child, index) => {
           if( child.className && child.className.includes('heading')){
               newDiv.push(<div key={index} ref={(ref)=> ref && ref.appendChild(child)}/>);
           }
       });
    items.current = newDiv;
    }, []);

    console.log("newDiv", newDiv);

    return(
        <section className={`tab-container`} aria-label={label}>
            <div className={`tab-container__wrapper`}>
                <div className={`tab-container__buttons`}>
                </div>
                <div className={`tab-container__content`}>
                    {children}
                </div>

            </div>
        </section>
    );
};

TabContainer.displayName = 'TabContainer';

TabContainer.propTypes = {};

export default TabContainer;
