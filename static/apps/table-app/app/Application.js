/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('TableApp.Application', {
    extend: 'Ext.app.Application',
    
    name: 'TableApp',

    appFolder: '/static/apps/table-app/app',


    stores: [
        // TODO: add global / shared stores here
        'Emojis'
    ],
    
    launch: function () {
        // TODO - Launch the application
    }
});
