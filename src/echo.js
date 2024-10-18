// src/echo.js

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '5e3ea522732d18099e80',
    cluster: 'ap2',
    forceTLS: true,
});

export default echo;
