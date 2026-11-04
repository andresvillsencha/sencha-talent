Ext.define('HrApp.store.CandidateStore', {
    extend: 'Ext.data.Store',

    alias:'store.candidate-store',


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

        url: 'http://localhost:3000/api/positions/candidates',

        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    },

    pageSize: 100,
    autoLoad: false,
    remoteFilter: false,
    remoteSort: false
});