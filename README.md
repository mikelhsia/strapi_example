# Strapi application

A quick description of your strapi application

# Q&A
### Q: I can't `yarn develop` or `yarn install` to start the project
A: For some reasons, some of the yarn version will create issue when install & run, saying the node-modules/sharp image not found. To resolve this,  you need to run `yarn install; npm rebuild` to resolve this issue

### Q: What I need to do to overwrite the admin panel
A: Admin panel is built in react. Need to run `yarn develop --watch-admin` to monitor the changes


### Q: The admin panel was updated on the run time because of the command yarn develop --watch-admin?

If you start your application using `yarn start` or `yarn develop` the admin will be the old version. Your updates are not applied.

To do so, you have to build the admin panel using the following command `yarn build`.

### Q: How to use pm2 to manage your process

`pm2 start server.js` to manage your strapi project through **server.js**

or 

use `pm2 start npm --name app -- run start` to to start the project with production environment

or

use `pm2 start ecosystem.config.js` to start application with config file