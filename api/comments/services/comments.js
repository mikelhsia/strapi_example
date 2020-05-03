'use strict';
const nodemailer = require('nodemailer');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: 'mikelhsia@hotmail.com',
        pass: 'F19811128f'
    },
});

module.exports = {
    send: (from, to, subject, text) => {
        const options ={
            from, 
            to, 
            subject, 
            text
        };

        return transporter.sendMail(options);
    }
};
