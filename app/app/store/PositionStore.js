// app/store/PositionStore.js

Ext.define('HrApp.store.PositionStore', {
    extend: 'HrApp.store.MainStore',

    alias: 'store.position-store',


    proxy: {
        type: 'ajax',

        url: '/api/positions',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },

    pageSize: 25,
    autoLoad: true
});