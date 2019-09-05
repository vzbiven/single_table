/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('TableApp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'TableApp.view.main.MainController',
        'TableApp.view.main.MainModel',

        'TableApp.view.emojitable.Emoji*'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'fit',

    items: [{
        region: 'center',
        xtype: 'emojitable',
        title: 'Emojis',
        autoShow: true,
        border: false,
    }]
});