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

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'component',
        padding: 10,
        height: 40,
        html: 'Emojis'
    }, {
        region: 'center',
        xtype: 'window',
        title: 'Emojis',
        autoShow: true,
        height: 600,
        width: 800,
        border: false,
        layout: 'fit',
        closable: true,
        maximizable: true,
        items: {
            xtype: 'emojitable',
            border: false
        }
    }]
});

