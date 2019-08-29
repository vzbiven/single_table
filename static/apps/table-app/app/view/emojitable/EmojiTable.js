var columns = [
    {
        header: 'ID',
        dataIndex: 'id',
        sortable: true,
        width: 50
    },
    {
        header: 'Emoji',
        dataIndex: 'emoji',
        sortable: true,
        width: 50,
        editor: 'textfield'
    },
    {
        header: 'Name',
        dataIndex: 'name',
        sortable: true,
        flex: 1,
        editor: 'textfield'
    },
    {
         header: 'Group',
         dataIndex: 'group',
         sortable: true,
         flex: 1,
         editor: 'textfield'
    },
    {
        header: 'Sub Group',
        dataIndex: 'sub_group',
        sortable: true,
        editor: 'textfield'
    },
    {
        header: 'Codepoints',
        dataIndex: 'codepoints',
        sortable: true,
        editor: 'textfield'
    }
];

Ext.define("TableApp.view.emojitable.EmojiTable",{
    extend: "Ext.grid.Panel",
    xtype: 'gridpanel',
    alias: 'widget.emojitable',
 
    requires: [
        "TableApp.view.emojitable.EmojiTableController",
        "TableApp.view.emojitable.EmojiTableModel"
    ],
    
    controller: "emojitable-emojitable",
    viewModel: {
        type: "emojitable-emojitable"
    },

    loadMask: true,
    tbar: [{
        text: 'Add Emoji',
        handler: 'onAddClick'
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        store: 'Emojis',
        displayInfo: true,
        items: [
            '-',
            {
                text: 'Save Changes',
                handler: 'syncStore'
            },
            '-',
            {
                text: 'Reject Changes',
                handler: 'rejectChanges'
            },
            '-'
        ]
    },
    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        autoCancel: false
    }],
    store: 'Emojis',
    columns: columns,
    stripeRows: true,
    selType: 'rowmodel',
    viewConfig: {
        forceFit: true
    },
    listeners: {
        itemcontextmenu: 'doRowCtxMenu',
        destroy: function (thisGrid) {
            if (thisGrid.rowCtxMenu) {
                thisGrid.rowCtxMenu.destroy();
            }
        }
    }
})
