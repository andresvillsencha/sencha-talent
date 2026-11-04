// app/store/CandidateStore.js

Ext.define('HrApp.store.CandidatePerPositionStore', {
    extend: 'HrApp.store.MainStore',

    alias: 'store.candidate-position-store',

    buffered: true,

    fields: [
        { name: 'application_id',type: 'int' },
        { name: 'matchPercentage', type: 'number' },
        { name: 'matchSummary', type: 'string' },
        { name: 'aiStatus', type: 'string' },
        { name: 'appliedAt', type: 'date', dateFormat: 'c' },
        { name: 'analyzedAt', type: 'date', dateFormat: 'c' },
        {
            name: 'candidate_name',
            calculate: function(data) {
                return ( (data.candidate_first_name || '') + ' ' + (data.candidate_last_name || '') ).trim();
            }
        },
        { name: 'candidate_first_name', type: 'auto' },
        { name: 'candidate_last_name', type: 'auto' },
        { name: 'candidate_email', type: 'auto' },
        { name: 'resume_file', type: 'auto' },
        { name: 'jd_file', type: 'auto' },
        { name: 'position_title', type: 'auto' },
        { name: 'position_department', type: 'auto' },
        { name: 'location', type: 'auto' },

    ],
    proxy: {
        type: 'ajax',

        url: '/api/positions/candidates',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },

    pageSize: 100,
    leadingBufferZone: 200,
    trailingBufferZone: 50,

    autoLoad: false,
    remoteFilter: false,
    remoteSort: false
});