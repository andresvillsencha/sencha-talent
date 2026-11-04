// app/store/CandidateStore.js

Ext.define('HrApp.store.CandidateStore', {
    extend: 'HrApp.store.MainStore',

    alias: 'store.candidate-store',

    buffered: true,

    proxy: {
        type: 'ajax',

        url: '/api/candidates',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },

    pageSize: 100,
    leadingBufferZone: 200,
    trailingBufferZone: 50,

    autoLoad: true,
    remoteFilter: false
});