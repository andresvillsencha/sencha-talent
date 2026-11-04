
/**
 * @class HrApp.view.positions.PositionsView
 * @extends Ext.grid.Panel
 *
 * Standalone view for managing job positions.
 *
 * Features:
 * - New position button
 * - Filters on all data columns
 * - Pagination
 * - Job description PDF access
 * - Row actions
 * - Refresh button
 */
Ext.define('HrApp.view.positions.PositionsView', {
    extend: 'Ext.grid.Panel',

    xtype: 'positions-view',

    requires: [
        'HrApp.store.PositionStore',
        'HrApp.view.positions.PositionEditWindow',
    ],

    title: 'Administración de posiciones',

    iconCls: 'x-fa fa-briefcase',

    cls: 'sencha-new-grid sn-positions-grid',

    layout: 'fit',

    store: {
        type: 'position-store'
    },

    plugins: [{
        ptype: 'gridfilters'
    }],

    viewConfig: {
        stripeRows: true,
        markDirty: false,
        emptyText: 'No se encontraron posiciones',
        deferEmptyText: false
    },

    selModel: {
        type: 'rowmodel',
        mode: 'SINGLE'
    },

    tbar: [{
        text: 'Nueva posición',
        iconCls: 'x-fa fa-plus',
        cls: 'sn-primary-button',

        handler: function(btn) {
            btn.up('grid').openEditor(null);
        }
    }, '->', {
        text: 'Actualizar',
        iconCls: 'x-fa fa-sync',
        handler: function(btn) {
            btn.up('grid').getStore().reload();
        }
    }],

    columns: [{
        text: 'ID',
        dataIndex: 'id',
        width: 85,
        align: 'center',

        filter: {
            type: 'number'
        }
    }, {
        text: 'Posición',
        dataIndex: 'title',
        flex: 2,
        minWidth: 220,

        filter: {
            type: 'string'
        },

        renderer: function(value) {
            return '<strong>' +
                Ext.String.htmlEncode(value || '') +
                '</strong>';
        }
    }, {
        text: 'Departamento',
        dataIndex: 'department',
        flex: 1,
        minWidth: 140,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Ubicación',
        dataIndex: 'location',
        width: 140,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Estado',
        dataIndex: 'status',
        width: 130,
        align: 'center',

        filter: {
            type: 'list',
            options: [
                ['open', 'Abierta'],
                ['closed', 'Cerrada'],
                ['on_hold', 'En pausa']
            ]
        },

        renderer: function(value) {
            var statuses = {
                open: {
                    text: 'Abierta',
                    cls: 'sn-status-open'
                },
                closed: {
                    text: 'Cerrada',
                    cls: 'sn-status-closed'
                },
                on_hold: {
                    text: 'En pausa',
                    cls: 'sn-status-hold'
                }
            };

            var status = statuses[value] || {
                text: value || '-',
                cls: ''
            };

            return '<span class="sn-status-badge ' +
                status.cls + '">' +
                Ext.String.htmlEncode(status.text) +
                '</span>';
        }
    }, {
        text: 'Descripción',
        dataIndex: 'description',
        flex: 2,
        minWidth: 200,

        filter: {
            type: 'string'
        },

        renderer: function(value) {
            return Ext.String.htmlEncode(value || '');
        }
    }, {
        text: 'JD',
        dataIndex: 'jd_file',
        width: 85,
        align: 'center',

        filter: {
            type: 'string'
        },

        renderer: function (value) {
            let url=`http://localhost:3000/files/jd/${value}`;
            let title=`View Job Description: ${value}`;
            let button=`<a href="${url}" target="_blank" style="display: inline-block; width: 24px; height:24px; line-height: 24px; text-align: center; border-radius: 50%; background-color:#939; color:#fff; font-size: 16px;" title="${title}"><span class="x-fa fa-briefcase"></span></a>`;
            return button;
        }

    }, {
        text: 'Creación',
        dataIndex: 'created_at',
        xtype: 'datecolumn',
        format: 'd/m/Y',
        width: 120,

        filter: {
            type: 'date'
        }
    }, {
        text: 'Actualización',
        dataIndex: 'updated_at',
        xtype: 'datecolumn',
        format: 'd/m/Y',
        width: 130,

        filter: {
            type: 'date'
        }
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: 'Sin posiciones'
    },

    listeners: {
        afterrender: function(grid) {
            grid.down('pagingtoolbar')
                .setStore(grid.getStore());
        },

        itemdblclick: function(grid, record) {
            grid.up('grid').openEditor(record);
        }
    },
    openEditor: function(record) {
    Ext.create(
        'HrApp.view.positions.PositionEditWindow',
        {
            editRecord: record || null
        }
    ).show();
},
});
