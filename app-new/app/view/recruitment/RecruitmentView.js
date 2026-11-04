Ext.define('HrApp.view.recruitment.RecruitmentView', {
    extend: 'Ext.panel.Panel',
    xtype: 'recruitment-view',

    title: 'Reclutamiento',

    requires: [
        'HrApp.view.recruitment.RecruitmentController',
        'HrApp.view.recruitment.RecruitmentWindow',
        'HrApp.store.PositionStore',
        'HrApp.store.CandidateStore'
    ],
    controller: 'recruitment-ctrl',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        xtype: 'grid'
    },

    items: [{
        title: 'Posiciones',
        width: 300,
        store: {
            type: 'position-store'
        },
        listeners: {
            selectionchange: 'onSelChange'
        },
        columns: [{
            text: 'Id',
            dataIndex: 'id',
            width: 100,
            hidden: true
        }, {
            text: 'Posición',
            dataIndex: 'title',
            flex: 2
        }, {
            text: 'Departamento',
            dataIndex: 'department',
            flex: 1
        }, {
            text: 'Estatus',
            dataIndex: 'status',
            flex: 1
        }]
    }, {
        title: 'Candidates',
        flex: 1,
        listeners: {
            itemdblclick: 'onOpenDetails',
        },
        store: {
            type: 'candidate-store'
        },
        reference: 'candidatesGrid',
        columns: [{
            text: 'ID',
            dataIndex: 'application_id',
            width: 70,
            align: 'center'
        }, {
            text: 'Candidate',
            dataIndex: 'candidate_name',
            flex: 1.5
        }, {
            text: 'Email',
            dataIndex: 'candidate_email',
            flex: 1.5
        },{
            text: 'Position',
            dataIndex: 'position_title',
            flex: 1.5
        },
        {
            text: 'Department',
            dataIndex: 'position_department',
            flex: 1
        },
        {
            text: 'Location',
            dataIndex: 'position_location',
            flex: 1
        }, {
            text: 'Match',
            dataIndex: 'match_percentage',
            width: 100,
            align: 'center',
            renderer: function (value) {
                let color="#396";

                if (value<60) {
                    color="#933";
                } else if (value<90) {
                    color="#993";
                }
                if (value===null) value='-';

                return `<span style="color: ${color}; font-weight: bold;">${value}</span>`;

            }
        }, {
            text: 'AI Status',
            dataIndex: 'ai_status',
            width: 120,
            align: 'center',
        }, {
            text:'Job Desc',
            dataIndex: 'jd_file',
            width: 80,
            align: 'center',
            renderer: function (value) {
                let url="http://localhost:3000/files/jd/"+value;
                let button = `<a href="${url}" target="_blank" style="background-color: #369; color: #fff; width: 24px; height:24px; border-radius: 50%; display: inline-block;"><span class="x-fa fa-briefcase"></span></a>`;
                return button;
            }
        }, {
            text: 'Resume',
            dataIndex: 'resume_file',
            width: 80,
            align: 'center',
            renderer: function (value) {
                let url="http://localhost:3000/files/resume/"+value;
                let button = `<a href="${url}" target="_blank" style="background-color: #939; color: #fff; width: 24px; height:24px; border-radius: 50%; display: inline-block;"><span class="x-fa fa-file-lines"></span></a>`;
                return button;
            }
        }]
    }]
});