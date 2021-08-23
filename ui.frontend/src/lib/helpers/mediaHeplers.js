import { ICONS_PATH } from '../constants';

export const getYoutubeVideoIdFromUrl = (url) => {
    const youtubeVideoIdRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const youtubeId = url.match(youtubeVideoIdRegex);
    const isValidYoutubeId = youtubeId && youtubeId.length >= 8;
    return isValidYoutubeId ? youtubeId[7] : null;
};

export const getIconUrl = (iconName) => {
    let result = iconName;
    if (iconName && !iconName.includes(ICONS_PATH)) {
        result = `${ICONS_PATH}${iconName}.svg`;
    }
    return result;
};
