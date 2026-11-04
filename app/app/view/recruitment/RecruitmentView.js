Ext.define('HrApp.view.recruitment.RecruitmentView', {
    extend: 'Ext.panel.Panel',
    xtype: 'recruitment-view',

    title: 'Reclutamiento',

    requires: [
        'HrApp.view.recruitment.RecruitmentController',
        'HrApp.view.recruitment.PositionDetailsWindow',
        'HrApp.store.PositionStore',
        'HrApp.store.CandidatePerPositionStore',
        'HrApp.view.recruitment.CandidateDetailsWindow',
    ],

    controller: 'recruitment',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        margin: 8
    },


    items: [{
        xtype: 'grid',
        reference: 'positionsGrid',
        cls: 'sencha-new-grid',

        store: {
            type: 'position-store'
        },

        header: {
            title: 'Posiciones',
            style: {
                backgroundColor: '#1f85da'
            }
        },
        flex: 1,
        maxWidth: 400,
        minWidth: 200,


        listeners: {
            selectionchange: 'onPositionSelectionChange',
            itemdblclick: 'onPositionDoubleClick'
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
        }],
        bbar: {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Mostrando posiciones {0} - {1} of {2}',
            emptyMsg: "No hay posiciones para mostrar",
        }
    }, {
        xtype: 'grid',
        reference: 'candidatesGrid',
        cls: 'sencha-new-grid',

        store: {
            type: 'candidate-position-store'
        },

        header: {
            title: 'Candidatos',
            style: {
                backgroundColor: '#1f85da'
            }
        },

        listeners: {
            itemdblclick: 'onCandidateDoubleClick'
        },
        
        flex: 2,
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
                let color = "#666";
                if (value === null || value === undefined) {
                    return '-';
                }
                if (!isNaN(value)) {
                    if (value<60) {
                        color="#C33";
                    } else if (value<85) {
                        color="#C93";
                    } else {
                        color="#396";
                    }
                }
                return '<span style="weight: bold; color:'+color+';">'+value + '%</span>';
            }
        }, {
            text: 'AI Status',
            dataIndex: 'ai_status',
            width: 120,
            align: 'center',
            renderer: function (value) {
                let color="#333";
                switch (value) {
                    case 'validated': color="#396";
                        break;
                    case 'pending': color="#993";
                        break;
                }
                return `<span style="border-radius: 32px; min-width: 80px; padding: 4px 8px; display: inline-block; color:#fff; background-color: ${color}">${value}</span>`;
            }
        }, {
            text:'Job Desc',
            dataIndex: 'jd_file',
            width: 80,
            align: 'center',
            renderer: function (value) {
                let url=`http://localhost:3000/files/jd/${value}`;
                let title=`View Job Description: ${value}`;
                let button=`<a href="${url}" target="_blank" style="display: inline-block; width: 24px; height:24px; line-height: 24px; text-align: center; border-radius: 50%; background-color:#939; color:#fff; font-size: 16px;" title="${title}"><span class="x-fa fa-briefcase"></span></a>`;
                return button;
            }
        }, {
            text: 'Resume',
            dataIndex: 'resume_file',
            width: 80,
            align: 'center',
            renderer: function (value) {
                let url=`http://localhost:3000/files/resume/${value}`;
                let title=`View Resume: ${value}`;
                let button=`<a href="${url}" target="_blank" style="display: inline-block; width: 24px; height:24px; line-height: 24px; text-align: center; border-radius: 50%; background-color:#369; color:#fff; font-size: 16px;" title="${title}"><span class="x-fa fa-file-lines"></span></a>`;
                return button;
            }
        }]
    }]
});