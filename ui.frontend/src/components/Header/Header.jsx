import React, { useEffect, useRef, useState } from 'react';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import useBreakpoint from '../../lib/helpers/useBreakpoint';
import StickyContainer from '../StickyContainer';
import styles from './HeaderDesktop.module.scss';

const Header = (props) => {
    const phoneNumber = useRef([]);
    const phoneLinkText = useRef('');
    const phoneLinkUrl = useRef('');
    const navItems = useRef([]);
    const [mountedChildren, setMountedChildren] = useState(false);
    const currentBreakpoint = useBreakpoint();

    const filterNodes = (n) => {
        // Exclude HTML comments and CQ markup if not in edit mode
        return (
            ![Node.TEXT_NODE, Node.COMMENT_NODE, 'cq', 3].includes(n.nodeType) &&
            n.tagName !== 'CQ' &&
            !n.className.includes('cq')
        );
    };

    useEffect(() => {
        let navNodes = [];
        let phoneNodes = [];
        let phoneValues = [];
        const decodeHTML = (html) => {
            const txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };

        const getValue = (stringProp) =>
            stringProp ? (stringProp.split(':')[1] || '').split('"').join('') : '';

        props.wcChildren.nodes.filter(filterNodes)[0].childNodes.forEach((child, index) => {
            if (child.className && child.className.includes('phone-number')) {
                const regex = /"(phoneNumber)":"((\\"|[^"])*)"/g;
                phoneValues = decodeHTML(child.innerHTML).match(regex);
                phoneNodes.push(<div key={index} ref={(ref) => ref && ref.appendChild(child)} />);
            }
            if (child.className && child.className.includes('navigation-item')) {
                navNodes.push(
                    <div
                        className={styles['child-container']}
                        key={index}
                        ref={(ref) => ref && ref.appendChild(child)}
                    />
                );
            }
        });
        navItems.current = navNodes;
        phoneNumber.current = phoneNodes;
        phoneLinkText.current = getValue(phoneValues[0]);
        phoneLinkUrl.current = `tel:${phoneLinkText.current}`;
        setMountedChildren(true);
    }, []);

    const currentHeader =
        currentBreakpoint === 'desktop-l' ? (
            <HeaderDesktop
                {...props}
                phoneNumber={phoneNumber.current}
                navItems={navItems.current}
            />
        ) : (
            <HeaderMobile
                {...props}
                navItems={navItems.current}
                phoneNumber={phoneNumber.current}
                phoneLinkUrl={phoneLinkUrl.current}
                phoneLinkText={phoneLinkText.current}
            />
        );

    return <StickyContainer>{currentHeader}</StickyContainer>;
};

Header.displayName = 'Header';

export default Header;
