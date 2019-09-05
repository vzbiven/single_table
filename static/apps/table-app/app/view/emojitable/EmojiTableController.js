Ext.define('TableApp.view.emojitable.EmojiTableController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emojitable-emojitable',


    onAddClick: function () {
        var view = this.getView(),
            rec = new Emoji();
        view.findPlugin('rowediting').cancelEdit();
        view.store.insert(0, rec);
        view.findPlugin('rowediting').startEdit(rec, 0);
    },

    onDelete: function (grid, rowIndex) {
        Ext.MessageBox.confirm(
            'Confirm delete',
            'Are you sure?',
            function (btn) {
                if (btn == 'yes') {
                    grid.getStore().removeAt(rowIndex);
                }
            }
        )
    },

    syncStore: function () {
        var view = this.getView();
        view.getStore().sync();
    },

    rejectChanges: function () {
        var view = this.getView();
        view.getStore().rejectChanges();
    },

    doRowCtxMenu: function (view, record, item, index, e) {
        e.stopEvent();
        view.rowCtxMenu = Ext.widget('menu', {
            items: [{
                    text: 'Delete',
                    handler: function () {
                        this.onDelete(view, index)
                    },
                    scope: this
                },
                {
                    text: 'Edit',
                    handler: function () {
                        this.view.findPlugin('rowediting').startEdit(record, 0);
                    },
                    scope: this
                }
            ]
        });
        view.selModel.select(record);
        view.rowCtxMenu.showAt(e.getXY());
    }
});