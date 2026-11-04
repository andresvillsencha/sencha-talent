// app/store/MainStore.js

Ext.define('HrApp.store.MainStore', {
    extend: 'Ext.data.Store',

    config: {
        baseUrl: 'http://localhost:3000/'
    },

    proxy: {
        type: 'ajax',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        },

        writer: {
            type: 'json',
            writeAllFields: false
        }
    },

    autoLoad: true,
    remoteSort: true,
    remoteFilter: true,

    listeners: {
        beforeload: function(store) {
            let me=this;
            let proxy = store.getProxy(),
                url = proxy.getUrl(),
                baseUrl = me.baseUrl;

            if (url && !/^(https?:)?\/\//i.test(url)) {
                proxy.setUrl(
                    baseUrl.replace(/\/$/, '') +
                    '/' +
                    url.replace(/^\//, '')
                );
            }
        }
    }
});