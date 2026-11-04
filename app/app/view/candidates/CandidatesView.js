
/**
 * @class HrApp.view.candidates.CandidatesView
 * @extends Ext.grid.Panel
 *
 * Standalone candidate management grid.
 *
 * Features:
 * - New candidate button
 * - Quick search
 * - Column filters
 * - Resume PDF access
 * - Pagination
 * - Edit and view actions
 */
Ext.define('HrApp.view.candidates.CandidatesView', {
    extend: 'Ext.grid.Panel',

    xtype: 'candidates-view',

    requires: [
        'HrApp.store.CandidateStore',
        'Ext.grid.filters.Filters',
        'HrApp.view.candidates.CandidateEditWindow',
    ],

    title: 'Administración de candidatos',

    iconCls: 'x-fa fa-users',

    cls: 'sencha-new-grid sn-candidates-grid',

    store: {
        type: 'candidate-store'
    },

    plugins: [{
        ptype: 'gridfilters'
    }],

    viewConfig: {
        stripeRows: true,
        markDirty: false,
        emptyText: 'No se encontraron candidatos',
        deferEmptyText: false
    },

    selModel: {
        type: 'rowmodel',
        mode: 'SINGLE'
    },

    tbar: [{
        text: 'Nuevo candidato',
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
        width: 75,
        align: 'center',

        filter: {
            type: 'number'
        }
    }, {
        text: 'Nombre completo',
        dataIndex: 'full_name',
        flex: 2,
        minWidth: 200,

        filter: {
            type: 'string'
        },

        renderer: function(value,x,row) {
            return '<strong>' +
                Ext.String.htmlEncode(row.get('first_name')+' '+row.get('last_name')) +
                '</strong>';
        }
    }, {
        text: 'Nombre',
        dataIndex: 'first_name',
        flex: 1,
        minWidth: 120,
        hidden: true,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Apellido',
        dataIndex: 'last_name',
        flex: 1,
        minWidth: 120,
        hidden: true,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Correo electrónico',
        dataIndex: 'email',
        flex: 2,
        minWidth: 220,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Teléfono',
        dataIndex: 'phone',
        width: 160,

        filter: {
            type: 'string'
        }
    }, {
        text: 'Resumen profesional',
        dataIndex: 'resume_text',
        flex: 3,
        minWidth: 260,

        filter: {
            type: 'string'
        },

        renderer: function(value, meta) {
            var text = value || '';

            meta.tdAttr =
                'data-qtip="' +
                Ext.String.htmlEncode(text) +
                '"';

            return Ext.String.htmlEncode(text);
        }
    }, {
        text: 'CV',
        dataIndex: 'resume_file',
        width: 85,
        align: 'center',

        filter: {
            type: 'string'
        },

        renderer: function (value) {
            let url=`http://localhost:3000/files/resume/${value}`;
            let title=`View Resume: ${value}`;
            let button=`<a href="${url}" target="_blank" style="display: inline-block; width: 24px; height:24px; line-height: 24px; text-align: center; border-radius: 50%; background-color:#369; color:#fff; font-size: 16px;" title="${title}"><span class="x-fa fa-file-lines"></span></a>`;
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
        emptyMsg: 'Sin candidatos'
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
            'HrApp.view.candidates.CandidateEditWindow',
            {
                editRecord: record || null
            }
        ).show();
    },
});
