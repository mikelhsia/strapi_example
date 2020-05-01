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