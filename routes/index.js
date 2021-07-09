const notesRoutes =  require('./notes-routes');

module.exports = (app, db) => {
    notesRoutes(app,db);

}