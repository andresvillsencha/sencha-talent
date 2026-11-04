Ext.define('HrApp.store.PositionStore', {
    extend: 'Ext.data.Store',

    alias:'store.position-store',

    proxy: {
        type: 'ajax',

        url: 'http://localhost:3000/api/positions',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },

    pageSize: 25,
    autoLoad: true
});