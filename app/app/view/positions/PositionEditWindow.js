
/**
 * @class HrApp.view.positions.PositionEditWindow
 *
 * Window used to create or edit a job position.
 * Saving is intentionally disabled.
 */
Ext.define('HrApp.view.positions.PositionEditWindow', {
    extend: 'Ext.window.Window',

    xtype: 'position-edit-window',

    title: 'Nueva posición',
    iconCls: 'x-fa fa-briefcase',

    cls: 'sencha-new-window sn-position-edit-window',

    width: 720,
    height: 650,
    minWidth: 500,
    minHeight: 450,

    modal: true,
    resizable: false,
    layout: 'fit',
    closeAction: 'destroy',

    // Existing record, or null for a new position
    editRecord: null,

    items: [{
        xtype: 'form',
        reference: 'editForm',

        bodyPadding: 24,
        scrollable: true,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        defaults: {
            labelAlign: 'top',
            margin: '0 0 15 0'
        },

        items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            xtype: 'textfield',
            name: 'title',
            fieldLabel: 'Título de la posición',
            emptyText: 'Ej. Senior PHP Developer',
            allowBlank: false
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                labelAlign: 'top'
            },

            items: [{
                xtype: 'textfield',
                name: 'department',
                fieldLabel: 'Departamento',
                emptyText: 'Ej. Engineering',
                flex: 1,
                margin: '0 10 0 0'
            }, {
                xtype: 'combo',
                name: 'location',
                fieldLabel: 'Modalidad',
                flex: 1,

                queryMode: 'local',
                editable: true,
                forceSelection: false,

                store: [
                    'Remote',
                    'Hybrid',
                    'On-site'
                ]
            }]
        }, {
            xtype: 'combo',
            name: 'status',
            fieldLabel: 'Estado',
            value: 'open',

            editable: false,
            queryMode: 'local',
            forceSelection: true,

            displayField: 'text',
            valueField: 'value',

            store: {
                fields: ['value', 'text'],
                data: [{
                    value: 'open',
                    text: 'Abierta'
                }, {
                    value: 'closed',
                    text: 'Cerrada'
                }, {
                    value: 'on_hold',
                    text: 'En pausa'
                }]
            }
        }, {
            xtype: 'textarea',
            name: 'description',
            fieldLabel: 'Descripción del puesto',
            emptyText: 'Describe los requisitos y responsabilidades...',
            height: 160
        }, {
            xtype: 'textfield',
            name: 'jd_file',
            fieldLabel: 'Archivo de descripción (PDF)',
            emptyText: 'nombre-archivo.pdf',

            triggers: {
                file: {
                    cls: 'x-fa fa-file-pdf'
                }
            }
        }]
    }],

    buttons: [{
        text: 'Cancelar',
        iconCls: 'x-fa fa-times',

        handler: function(btn) {
            btn.up('window').close();
        }
    }, {
        text: 'Guardar',
        iconCls: 'x-fa fa-save',
        cls: 'sn-primary-button',

        disabled: true
    }],

    listeners: {
        show: function(win) {
            var record = win.editRecord,
                form = win.down('form');

            if (record) {
                win.setTitle('Editar posición: ' +
                    '<div style="font-size:14px; color: #666;">'+record.get('title') +'</div>'
                );

                form.loadRecord(record);
            } else {
                win.setTitle('Nueva posición');

                form.getForm().reset();
                form.getForm().setValues({
                    status: 'open'
                });
            }
        }
    }
});
