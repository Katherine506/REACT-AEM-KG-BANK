import { t } from '@konrad/reweb-aem';

export const CSRF_TOKEN_PATH = '/libs/granite/csrf/token.json';

export const ALIGNMENT_OPTIONS = ['left', 'center', 'right'];

export const BACKGROUND_COLORS = ['white', 'darkPurple', 'purpleGray'];

//see 'styles/constants/breakpoints.scss'
export const BREAKPOINT_MOBILE = 'mobile';

export const BREAKPOINT_TABLET = 'tablet';

export const BREAKPOINT_DESKTOP = 'desktop';

export const BREAKPOINT_DESKTOP_L = 'desktop-l';

export const BREAKPOINTS = [
    { name: BREAKPOINT_MOBILE, query: '(max-width: 719px)', minWidth: 0 },
    { name: BREAKPOINT_TABLET, query: '(max-width: 959px)', minWidth: 720 },
    { name: BREAKPOINT_DESKTOP, query: '(max-width: 1279px)', minWidth: 960 },
    { name: BREAKPOINT_DESKTOP_L, query: '(min-width: 1280px)', minWidth: 1280 },
];

export const BUTTON_STYLES = ['general', 'hero-primary', 'hero-secondary', 'link-text'];

export const CONTAINER_WIDTH = ['full', 'reduced', 'skinny'];

export const CURRENCY_MASK_OPTIONS = {
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: false,
    integerLimit: 15, // Set max digits to prevent strange rounding error when number is too large
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false,
};

export const DARK_THEME = 'dark';

export const DESKTOP_POSITION = ['media-left', 'media-right'];

export const DROPDOWN_PLACEHOLDER_TEXT = t('Select an option');

export const EMAIL_SIGNUP_URL = '/bin/emailsubscribe.json';

export const FORM_ERROR_CODES = {
    EMAIL_INVALID: t('The email address provided is not valid.'),
    EMAIL_NOT_PROVIDED: t('An email address was not provided.'),
    INTERNAL_SERVER_ERROR: t('An internal server error has occurred.'),
    INVALID_RECAPTCHA: t('reCAPTCHA is invalid.'),
    INVALID_RESOURCE: t('An internal server error has occurred.'),
    MEMBER_EXISTS: t('Your email address is already subscribed.'),
    OPT_IN_NOT_CHECKED: t('The subscription opt-in checkbox was not checked.'),
    FIELD_REQUIRED: t('This field is required. Please enter a value.'),
};

export const FLUSH_OPTIONS = ['never', 'neither', 'top', 'bottom', 'both'];

export const GRAPHICAL_ELEMENT = ['no', 'purple-corners'];

export const HEADING_LEVELS = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const HEADING_LEVELS_TIME_LINE = HEADING_LEVELS.slice(1);

export const HEADING_STYLES = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'large'];

export const HERO_BUTTON_STYLES = ['hero-primary', 'hero-secondary'];

export const HERO_PRIMARY = 'primary';

export const HERO_SECONDARY = 'secondary';

export const HERO_TERTIARY = 'tertiary';

export const HERO_TYPES = [HERO_PRIMARY, HERO_SECONDARY, HERO_TERTIARY];

export const HORIZONTAL_ALIGNMENT = ['left', 'center', 'right', 'stretch'];

export const ICON_SIZES = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large'];

export const KEYS = {
    ARROW_UP: 'ArrowUp',
    UP: 'Up',
    ARROW_DOWN: 'ArrowDown',
    DOWN: 'Down',
    ARROW_LEFT: 'ArrowLeft',
    LEFT: 'Left',
    ARROW_RIGHT: 'ArrowRight',
    RIGHT: 'Right',
    END: 'End',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    ESC: 'Esc',
    HOME: 'Home',
    SPACE: ' ',
    SPACEBAR: 'Spacebar',
    TAB: 'Tab',
};

export const LIGHT_THEME = 'light';

export const LINK_TYPES = ['internal', 'external'];

export const MOBILE_POSITION = ['media-above', 'media-below'];

export const PERCENTAGE_MASK_OPTIONS = {
    prefix: '',
    suffix: '%',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 3,
    requireDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false,
};

export const PROVINCES = [
    {
        name: t('British Columbia'),
        value: 'british-columbia',
    },
    {
        name: t('Alberta'),
        value: 'alberta',
    },
    {
        name: t('Saskatchewan'),
        value: 'saskatchewan',
    },
    {
        name: t('Manitoba'),
        value: 'manitoba',
    },
    {
        name: t('Ontario'),
        value: 'ontario',
    },
    {
        name: t('Quebec'),
        value: 'quebec',
    },
    {
        name: t('New Brunswick'),
        value: 'new-brunswick',
    },
    {
        name: t('Nova Scotia'),
        value: 'nova-scotia',
    },
    {
        name: t('Prince Edward Island'),
        value: 'prince-edward-island',
    },
    {
        name: t('Newfoundland & Labrador'),
        value: 'newfoundland-and-labrador',
    },
    {
        name: t('Yukon'),
        value: 'yukon',
    },
    {
        name: t('Northwest Territories'),
        value: 'northwest-territories',
    },
];

export const RECAPTCHA_BRANDING_TEXT = t(
    'This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.'
);

export const THEME_OPTIONS = [LIGHT_THEME, DARK_THEME];

export const SAMPLE_ICONS = {
    'Communication (Mail)':
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/communication-mail.svg',
    'Communication (Phone)':
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/communication-phone.svg',
    'Disability (Heart)':
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/disability-heart.svg',
    'Disability (Wheelchair)':
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/disability-wheelchair.svg',
    'Electronics (Computer)':
        '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/electronics-computer.svg',
};

export const TEXT_SIZE = ['x-large', 'large', 'body', 'small', 'labels'];

export const PORTAL_MODAL_ROOT = 'modal-root';
export const PORTAL_STICKY_CONTAINER_ROOT = 'sticky-container-root';
export const ICONS_PATH = '/etc.clientlibs/kg-bank/clientlibs/clientlib-base/resources/icons/';

export const MEDIA_TYPES = {
    QUOTE: 'quote-only',
    PROFILE_IMAGE: 'profile-image',
    VIDEO: 'video',
};
export const MEDIA_TYPE = [MEDIA_TYPES.QUOTE, MEDIA_TYPES.PROFILE_IMAGE, MEDIA_TYPES.VIDEO];

export const VISIBILITY_DELAYS = [0.4, 0.6];
export const VISIBILITY_HEIGHT = 600;
