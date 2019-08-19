Ext.onReady(function () {
    Ext.create('Ext.Panel',{
        renderTo: "helloExt",
        height: 300,
        width: 400,
        title: "Yo",
        html: "{{ boldmessage }}"

    })
});