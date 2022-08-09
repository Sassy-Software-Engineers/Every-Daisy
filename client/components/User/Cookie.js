export const COOKIE = 'device';

const keyGen = () => {
    const nav = window.navigator;
    const screen = window.screen;
    let deviceId = nav.mimeTypes.length;
    deviceId += nav.userAgent.replace(/\D+/g, '');
    deviceId += nav.plugins.length;
    deviceId += screen.height || '';
    deviceId += screen.width || '';
    deviceId += screen.pixelDepth || '';
    return deviceId;
};

const Cookie = (props) => {
    let cookie = window.localStorage.getItem(COOKIE);
    cookie ??= keyGen();
    window.localStorage.setItem(COOKIE, cookie);
    return null;
};

export default Cookie;