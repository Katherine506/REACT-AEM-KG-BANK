import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import styles from './TabContainer.module.scss';
import cx from 'classnames';
import { useEffect, useState } from 'react';

const TabContainer = (props) => {
    const {children, wcChildren, label, roleAtribute} = props;
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState('');
    const block = 'tabContainer';

    useEffect(() => {
        if (wcChildren.nodes.length > 1) {
            const nodes = wcChildren.nodes;
            let tabs = [];
            let tabToJSON;
            nodes.map((node) => {

                if (node.children !== undefined && node.children.length > 0) {

                    if (node.children[0].tagName === 'KG-TAB-CONTENT') {
                        tabToJSON = JSON.parse(node.childNodes[1].getAttribute('aem-data'));
                        tabs.push(tabToJSON);
                    }
                }
            })

            if (tabs.length > 0) {
                console.log("tabs", tabs);
                setPages(tabs);
                setPage(tabs[0].tabId);
            }
        }
    }, [wcChildren]);

    const showOrHidePages = (id) => {
        const nodes = wcChildren.nodes;
        let showOrHideClassName = '';
        let dataToJSON;
        nodes.map((node) =>{
            if (node.children !== undefined && node.children.length > 0){
                if (node.children[0].tagName === 'KG-TAB-CONTENT') {
                    showOrHideClassName = node.className.replace(`${block}__tab--show`, '').replace(`${block}__tab--hide`, '');
                    dataToJSON = JSON.parse(node.childNodes[1].getAttribute('aem-data'));
                    if (dataToJSON.tabId === id){
                        node.className = `${showOrHideClassName} ${block}__tab--show`;
                    }else{
                        node.className = `${showOrHideClassName} ${block}__tab--hide`;
                    }
                }
            }
        })
    };

    const setPage = (pageId) => {
        setCurrentPage(pageId);
        showOrHidePages(pageId);
    }

    return (
        <div className= {`${block}`}>
            <div className={`${block}__scroller-wrapper`} aria-label={label} role={roleAtribute}>
                {pages && pages.length > 0 &&
                (pages.map(
                        (node)=>(
                            <a key={node.tabId} href={`#${node.tabId}`}
                               className={`${block}__page ${currentPage === node.tabId && block+'__page--selected'}`}
                               onClick={()=>{setPage(node.tabId)}}>
                                {node.title}
                            </a>
                        ))
                )
                }
            </div>
            {children}
        </div>
    );
};


TabContainer.displayName = 'TabContainer';

TabContainer.propTypes = {};

export default TabContainer;
