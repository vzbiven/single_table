Ext.onReady(function () {

    //Creating base data model to work with
    Ext.define('Emoji', {
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'emoji',
            'name',
            'group',
            'sub_group',
            'codepoints',
        ]
    });

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

    //Plugin to edit rows
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit: 2,
        autoCancel: false,
    });

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
    //initializing columns for the table
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

    //setting pagination toolbar
    var pagingToolbar = {
        xtype: 'pagingtoolbar',
        store: store,
        displayInfo: true,
        items: [
            '-',
            {
                text: 'Save Changes',
                handler: function () {
                    store.sync();
                }
            },
            '-',
            {
                text: 'Reject Changes',
                handler: function () {
                    store.rejectChanges();
                }
            },
            '-'
        ]
    };

    //setting delete method
    var onDelete = function () {
        var selected = grid.selModel.getSelection();
        Ext.MessageBox.confirm(
                'Confirm delete',
                'Are you sure?',
                function (btn) {
                    if (btn == 'yes') {
                        var nn = selected[0].get('id')
                        var emp = store.getProxy();
                        emp.setExtraParam("id", nn)
                        grid.store.remove(selected);
                        grid.store.sync();
                    }
                }
        );
    };

    //setting create method
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

    //setting panel for the table
    var grid = Ext.create('Ext.grid.Panel', {
        columns: columns,
        store: store,
        loadMask: true,
        bbar: pagingToolbar,
        plugins: [rowEditing],
        stripeRows: true,
        selType: 'rowmodel',
        viewConfig: {
            forceFit: true
        },
        listeners: {
            itemcontextmenu: doRowCtxMenu,
            destroy: function (thisGrid) {
                if (thisGrid.rowCtxMenu) {
                    thisGrid.rowCtxMenu.destroy();
                }
            }
        }
    });

    //setting window to hold table
    Ext.create('Ext.Window', {
        title: 'Emojis',
        height: 600,
        width: 800,
        border: false,
        layout: 'fit',
        items: grid,
        closable: true,
        maximizable: true,
    }).show();
    store.load();
});

Ext.Ajax.on('beforerequest', function (conn, options) {
   if (!(/^http:.*/.test(options.url) || /^https:.*/.test(options.url))) {
     if (typeof(options.headers) == "undefined") {
       options.headers = {'X-CSRFToken': Ext.util.Cookies.get('csrftoken')};
     } else {
       options.headers.extend({'X-CSRFToken': Ext.util.Cookies.get('csrftoken')});
     }
   }
}, this);
