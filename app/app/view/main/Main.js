/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('HrApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'HrApp.view.main.MainController',
        'HrApp.view.main.MainModel',

        'HrApp.view.recruitment.RecruitmentView',
        'HrApp.view.positions.PositionsView',
        'HrApp.view.candidates.CandidatesView'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            text: 'RH CV',
            flex: 0
        },
        iconCls: 'fa-robot'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 0,
        layout: 'fit',
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Reclutamiento',
        iconCls: 'fa-award',
        items: [{
            xtype: 'recruitment-view'
        }]
    }, {
        title: 'Posiciones',
        iconCls: 'fa-briefcase',
        items: [{
            xtype: 'positions-view'
        }]
    }, {
        title: 'Candidatos',
        iconCls: 'fa-user-group',
        items: [{
            xtype: 'candidates-view'
        }]
    }]
});
