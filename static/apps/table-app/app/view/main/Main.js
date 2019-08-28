/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
    //creating editor for rows data
    var onInsertRecord = function () {
        var selected = grid.selModel.getSelection();
        rowEditing.cancelEdit();
        var newEmoji = Ext.create("Emoji");
        store.insert(selected[0].index, newEmoji);
        rowEditing.startEdit(selected[0].index, 0);
    };

    //setting context menu to edit data
    var doRowCtxMenu = function (view, record, item, index, e) {
        e.stopEvent();
        if (!grid.rowCtxMenu) {
            grid.rowCtxMenu = new Ext.menu.Menu({
                items: [
                    {
                        text: 'Insert Record',
                        handler: onInsertRecord

                    },
                    {
                        text: 'Delete Record',
                        handler: onDelete
                    }
                ]
            });
        }
        grid.selModel.select(record);
        grid.rowCtxMenu.showAt(e.getXY());
    };

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
        xtype: 'emojitable',
        padding: 10,
        height: 40,
    }]
});

