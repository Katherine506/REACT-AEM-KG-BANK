import { useEffect, useState } from 'react';

const useAuthorMode = () => {
    const html = document.documentElement;

    const authorModes = {
        'aem-AuthorLayer-Edit': 'edit',
        'aem-AuthorLayer-Layouting': 'layouting',
        'aem-AuthorLayer-Scaffolding': 'scaffolding',
        'aem-AuthorLayer-Developer': 'developer',
        'aem-AuthorLayer-Design': 'design',
        'aem-AuthorLayer-Preview': 'preview',
        'aem-AuthorLayer-Timewarp': 'timewarp',
        'aem-AuthorLayer-Annotate': 'annotate',
        'aem-AuthorLayer-MSM': 'msm',
        'aem-AuthorLayer-Targeting': 'targeting',
    };

    const getAuthorMode = () => {
        const classes = Array.from(html.classList);
        return classes.map((c) => authorModes[c]).find((m) => m !== null) || null;
    };

    const [authorMode, setAuthorMode] = useState(getAuthorMode);

    useEffect(() => {
        const observer = new MutationObserver(function () {
            setAuthorMode(getAuthorMode);
        });

        observer.observe(html, {
            attributes: true,
            attributeFilter: ['class'],
            childList: false,
            characterData: false,
        });

        return () => observer.disconnect();
    }, []);

    return authorMode;
};

export default useAuthorMode;
