Ext.define('TableApp.view.emojitable.EmojiTableController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.emojitable-emojitable',
    

    onAddClick: function () {
        var view = this.getView(),
            rec = new Emoji();

        view.store.insert(0, rec);
        view.findPlugin('rowediting').startEdit(rec, 0);
    },

    onDelete: function(grid, rowIndex){
        grid.getStore().removeAt(rowIndex);
    }
});
