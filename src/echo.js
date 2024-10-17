// src/echo.js
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const createEchoInstance = (campaignId) => {
    return new Echo({
        broadcaster: 'pusher',
        key: '5e3ea522732d18099e80',
        cluster: 'ap2',
        forceTLS: true,
        authEndpoint: `http://127.0.0.1:8000/campaign/emails-count/${campaignId}`, // Dynamic endpoint
        auth: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
            },
        },
    });
};

export default createEchoInstance;
