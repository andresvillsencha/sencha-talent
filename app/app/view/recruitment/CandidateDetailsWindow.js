
Ext.define('HrApp.view.recruitment.CandidateDetailsWindow', {
    extend: 'Ext.window.Window',
    xtype: 'candidate-details-window',

    requires: [
        'HrApp.ux.InfoField'
    ],

    title: 'Candidate Details',
    iconCls: 'x-fa fa-user',

    cls: 'sencha-new-window sn-candidate-window',

    width: 760,
    height: 720,
    minWidth: 500,
    minHeight: 450,

    modal: true,
    layout: 'fit',
    closeAction: 'destroy',

    maximizable: true,
    resizable: true,

    bodyPadding: 0,

    controller: 'recruitment',

    config: {
        candidateRecord: null
    },

    items: [{
        xtype: 'form',
        reference: 'candidateDetailsForm',

        cls: 'sn-position-form sn-candidate-form',

        border: false,
        scrollable: true,
        bodyPadding: 24,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [
            // =====================================
            // CANDIDATE INFORMATION
            // =====================================
            {
                xtype: 'container',
                cls: 'sn-position-overview sn-candidate-overview',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'component',
                    cls: 'sn-position-section-title',
                    html: '<i class="x-fa fa-user"></i> ' +
                          'Candidate Information'
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'infofield',
                        flex: 1,
                        margin: '0 12 12 0'
                    },
                    items: [{
                        name: 'candidate_name',
                        title: 'Full Name',
                        iconCls: 'x-fa fa-user'
                    }, {
                        name: 'candidate_email',
                        title: 'Email',
                        iconCls: 'x-fa fa-envelope',
                        margin: '0 0 12 0'
                    }]
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'infofield',
                        flex: 1,
                        margin: '0 12 0 0'
                    },
                    items: [{
                        name: 'candidate_phone',
                        title: 'Phone',
                        iconCls: 'x-fa fa-phone'
                    }, {
                        name: 'application_id',
                        title: 'Application ID',
                        iconCls: 'x-fa fa-hashtag',
                        margin: 0
                    }]
                }]
            },

            // =====================================
            // POSITION INFORMATION
            // =====================================
            {
                xtype: 'container',
                cls: 'sn-position-overview sn-candidate-section',
                margin: '20 0 0 0',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'component',
                    cls: 'sn-position-section-title',
                    html: '<i class="x-fa fa-briefcase"></i> ' +
                          'Position Information'
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'infofield',
                        name: 'position_title',
                        title: 'Position',
                        iconCls: 'x-fa fa-briefcase',
                        margin: '0 0 12 0'
                    }, {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype: 'infofield',
                            flex: 1,
                            margin: '0 12 0 0'
                        },
                        items: [{
                            name: 'position_department',
                            title: 'Department',
                            iconCls: 'x-fa fa-building'
                        }, {
                            name: 'position_location',
                            title: 'Location',
                            iconCls: 'x-fa fa-location-dot',
                            margin: 0
                        }]
                    }]
                }]
            },

            // =====================================
            // DOCUMENTS
            // =====================================
            {
                xtype: 'container',
                cls: 'sn-position-overview sn-candidate-section',
                margin: '20 0 0 0',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'component',
                    cls: 'sn-position-section-title',
                    html: '<i class="x-fa fa-folder-open"></i> ' +
                          'Documents'
                }, {
                    xtype: 'container',
                    cls: 'sn-candidate-documents',

                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },

                    defaults: {
                        xtype: 'button',
                        flex: 1,
                        height: 46,
                        margin: '0 12 0 0',
                        cls: 'sn-candidate-document-btn'
                    },

                    items: [{
                        text: 'View Resume',
                        iconCls: 'x-fa fa-file-pdf',
                        handler: 'onViewResume'
                    }, {
                        text: 'View Job Description',
                        iconCls: 'x-fa fa-file-lines',
                        handler: 'onViewJobDescription',
                        margin: 0
                    }]
                }]
            },

            // =====================================
            // AI EVALUATION
            // =====================================
            {
                xtype: 'container',
                cls: 'sn-position-overview sn-candidate-section ' +
                     'sn-candidate-ai-section',

                margin: '20 0 0 0',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'component',
                    cls: 'sn-position-section-title',
                    html: '<i class="x-fa fa-wand-magic-sparkles"></i> ' +
                          'AI Evaluation'
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'infofield',
                        flex: 1,
                        margin: '0 12 12 0'
                    },
                    items: [{
                        name: 'ai_status',
                        title: 'AI Status',
                        iconCls: 'x-fa fa-robot',
                        renderer: function (value) {
                            return Ext.String.htmlEncode(
                                value || 'Not analyzed'
                            );
                        }
                    }, {
                        name: 'match_percentage',
                        title: 'Match Percentage',
                        iconCls: 'x-fa fa-chart-pie',
                        margin: '0 0 12 0',
                        renderer: function (value) {
                            if (value === null ||
                                value === undefined ||
                                value === '') {
                                return 'Not analyzed';
                            }

                            var numericValue = Number(value);

                            if (!isFinite(numericValue)) {
                                return 'Not analyzed';
                            }

                            return numericValue + '%';
                        }
                    }]
                }, {
                    xtype: 'infofield',
                    name: 'match_summary',
                    title: 'Match Summary',
                    iconCls: 'x-fa fa-clipboard-check',

                    renderer: function (value) {
                        return Ext.String.htmlEncode(
                            value || 'No evaluation available'
                        );
                    }
                }]
            }
        ]
    }],

    // =====================================
    // FOOTER BUTTONS
    // =====================================
    buttons: [{
        text: 'Analyze with AI',
        cls: 'sn-window-primary-btn',
        iconCls: 'x-fa fa-wand-magic-sparkles',

        handler: 'onAnalyzeCandidate'
    }, '->', {
        text: 'Cerrar',
        iconCls: 'x-fa fa-xmark',
        handler: function (btn) {
            btn.up('window').close();
        }
    }],

    // =====================================
    // INITIAL DATA
    // =====================================
    listeners: {
        afterrender: function (win) {
            var record = win.getCandidateRecord();

            if (!record) {
                return;
            }

            var data = Ext.apply({}, record.getData());

            data.candidate_name = (
                (data.candidate_first_name || '') + ' ' +
                (data.candidate_last_name || '')
            ).trim();

            // Keep the underlying match percentage
            // numeric. The InfoField renderer formats it.
            win.down('form').getForm().setValues(data);
        }
    }
});
