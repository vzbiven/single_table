
Ext.define("TableApp.view.emoji-table.EmojiTable",{
    extend: "Ext.panel.Panel",
 
    requires: [
        "TableApp.view.emoji-table.EmojiTableController",
        "TableApp.view.emoji-table.EmojiTableModel"
    ],
    
    controller: "emoji-table-emojitable",
    viewModel: {
        type: "emoji-table-emojitable"
    },

    html: "Hello, World!!"
});
