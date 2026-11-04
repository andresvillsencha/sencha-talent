Ext.define('HrApp.view.recruitment.RecruitmentWindow', {
    extend: 'Ext.window.Window',
    xtype: 'recruitment-window',

    title: 'Detalles de Reclutamiento',
    iconCls: 'x-fa fa-file-lines',

    requires: [
        'HrApp.ux.InfoField'
    ],

    controller: 'recruitment-ctrl',

    width: 760,
    height: 300,

    modal: true,

    layout: 'fit',

    config: {
        candidateRecord: null
    },

    items: [{
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'infofield',
            name: 'ai_status',
            title: 'AI Status',
            iconCls: 'x-fa fa-robot',
        }, {
            xtype: 'infofield',
            name: 'match_percentage',
            title: 'Calificación',
            iconCls: 'x-fa fa-chart-pie',
        }, {
            xtype: 'infofield',
            name: 'match_summary',
            title: 'Resumen',
            iconCls: 'x-fa fa-clipboard-check',
        }]
    }],

    bbar: [{
        text: 'Analizar con IA',
        handler: 'onAnalyze'
    }, '->', {
        text: 'Cerrar',
        handler: function (btn) {
            btn.up('window').close();
        }
    }],

    listeners: {
        afterrender: function (win) {
            let record = win.getCandidateRecord();

            if (!record) {
                return;
            }

            let data = Ext.apply({}, record.getData());

            data.match_summary = (data.ai_response!==null) ? data.ai_response.summary : '';

            win.down('form').getForm().setValues(data);
        }
    }
});