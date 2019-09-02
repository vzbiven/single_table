Ext.define('Emoji', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id',  type: 'int'},
        {name: 'emoji', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'group', type: 'string'},
        {name: 'sub_group', type: 'string'},
        {name: 'codepoints', type: 'string'}
    ]
});