/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
    //creating editor for rows data
var textField = {
    xtype: 'textfield',
    getSubmitValue: function(){
        var value = this.getValue();
        if(Ext.isEmpty(value)) {
            return null;
        }
        return value;
}
};
    
var columns = [
    {
        header: 'ID',
        dataIndex: 'id',
        sortable: true,
        width: 50,
    },
    {
        header: 'Emoji',
        dataIndex: 'emoji',
        sortable: true,
        width: 50,
        editor: textField
    },
    {
        header: 'Name',
        dataIndex: 'name',
        sortable: true,
        flex: 1,
        editor: textField
    },
    {
         header: 'Group',
         dataIndex: 'group',
         sortable: true,
         flex: 1,
         editor: textField
    },
    {
        header: 'Sub Group',
        dataIndex: 'sub_group',
        sortable: true,
        editor: textField,
    },
    {
        header: 'Codepoints',
        dataIndex: 'codepoints',
        sortable: true,
        editor: textField
    },

];


//Creating store to hold data with dynamic loading via rest
var store = Ext.create('Ext.data.Store', {
    model: 'Emoji',
    autoLoad: {start: 0, limit: 25},
    proxy: {
        noCache: false,
        type: 'rest',
        url: 'emojis',
        format: 'json',
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        },
        writer: 'json',
    },
});

Ext.define('TableApp.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'TableApp.view.main.MainController',
        'TableApp.view.main.MainModel'
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
        xtype: 'gridpanel',
        columns: columns,
        store: store,
        loadMask: true,
        //bbar: pagingToolbar,
        //plugins: [rowEditing],
        stripeRows: true,
        selType: 'rowmodel',
        viewConfig: {
            forceFit: true
        },
        //listeners: {
        //    itemcontextmenu: doRowCtxMenu,
        //    destroy: function (thisGrid) {
        //        if (thisGrid.rowCtxMenu) {
        //            thisGrid.rowCtxMenu.destroy();
        //       }
        //    }
        //}
    }]
});

