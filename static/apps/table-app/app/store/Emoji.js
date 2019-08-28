Ext.define('TableApp.store.Emoji', {
    extend: 'Ext.data.Store',
    alias: 'store.emojis',
    
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