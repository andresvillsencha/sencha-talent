
/**
 * @class HrApp.view.candidates.CandidateEditWindow
 *
 * Window for creating or editing candidates.
 * Saving is intentionally disabled.
 */
Ext.define('HrApp.view.candidates.CandidateEditWindow', {
    extend: 'Ext.window.Window',

    xtype: 'candidate-edit-window',

    title: 'Nuevo candidato',
    iconCls: 'x-fa fa-user',

    cls: 'sencha-new-window sn-candidate-edit-window',

    width: 720,
    height: 680,
    minWidth: 500,
    minHeight: 450,

    modal: true,
    resizable: false,
    layout: 'fit',
    closeAction: 'destroy',

    // Existing candidate, or null for new
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
                name: 'first_name',
                fieldLabel: 'Nombre',
                emptyText: 'Nombre',
                allowBlank: false,
                flex: 1,
                margin: '0 10 0 0'
            }, {
                xtype: 'textfield',
                name: 'last_name',
                fieldLabel: 'Apellido',
                emptyText: 'Apellido',
                allowBlank: false,
                flex: 1
            }]
        }, {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Correo electrónico',
            emptyText: 'correo@ejemplo.com',

            vtype: 'email',
            allowBlank: false
        }, {
            xtype: 'textfield',
            name: 'phone',
            fieldLabel: 'Teléfono',
            emptyText: '555-000-0000'
        }, {
            xtype: 'textarea',
            name: 'resume_text',
            fieldLabel: 'Resumen profesional',
            emptyText: 'Experiencia, habilidades y conocimientos...',
            height: 200
        }, {
            xtype: 'textfield',
            name: 'resume_file',
            fieldLabel: 'Archivo de currículum (PDF)',
            emptyText: 'nombre-apellido.pdf',

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
                win.setTitle(
                    'Editar candidato ' +
                    '<div style="font-size:14px; color: #666;">'+record.get('first_name') + ' ' + record.get('last_name')+'</div>'
                );

                form.loadRecord(record);
            } else {
                win.setTitle('Nuevo candidato');
                form.getForm().reset();
            }
        }
    }
});
