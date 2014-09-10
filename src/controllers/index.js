module.exports = function(app){
    require('./auth')(app);
    require('./modules')(app);
};