Ext.define('Emoji', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'emoji',
        'name',
        'group',
        'sub_group',
        'codepoints'
    ]
});