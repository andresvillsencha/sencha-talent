
Ext.define('HrApp.view.recruitment.PositionDetailsWindow', {
    extend: 'Ext.window.Window',

    xtype: 'position-details-window',

    title: 'Detalles de la posición',

    requires: [
        'HrApp.ux.InfoField'
    ],

    cls: 'sencha-new-window sn-position-window',
    iconCls: 'x-fa fa-briefcase',

    width: 760,
    height: 720,
    minWidth: 500,
    minHeight: 400,

    modal: true,
    layout: 'fit',
    closeAction: 'destroy',

    bodyPadding: 0,
    resizable: false,

    items: [{
        xtype: 'form',
        reference: 'detailsForm',
        cls: 'sn-position-form',
        border: false,
        scrollable: true,
        bodyPadding: 24,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [{
            xtype: 'container',
            cls: 'sn-position-overview',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                xtype: 'container',
                flex: 1,
                minWidth: 0,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            },

            items: [{
                cls: 'sn-position-column',

                items: [{
                    xtype: 'infofield',
                    name: 'id',
                    title: 'ID',
                    iconCls: 'x-fa fa-hashtag',
                    dataType: 'number',
                    format: '0'
                }, {
                    xtype: 'infofield',
                    name: 'title',
                    title: 'Posición',
                    iconCls: 'x-fa fa-briefcase',
                    dataType: 'text'
                }, {
                    xtype: 'infofield',
                    name: 'department',
                    title: 'Departamento',
                    iconCls: 'x-fa fa-building',
                    dataType: 'text'
                }]
            }, {
                cls: 'sn-position-column',

                items: [{
                    xtype: 'infofield',
                    name: 'location',
                    title: 'Ubicación',
                    iconCls: 'x-fa fa-map-marker',
                    dataType: 'text'
                },{
                    xtype: 'infofield',
                    name: 'status',
                    title: 'Estatus',
                    iconCls: 'x-fa fa-check-circle',
                    dataType: 'text'
                },{
                    xtype: 'infofield',
                    name: 'created_at',
                    title: 'Creada',
                    iconCls: 'x-fa fa-calendar',
                    dataType: 'date',
                    format: 'd/m/Y H:i'
                }]
            }]
        }, {
            xtype: 'container',
            cls: 'sn-position-section sn-position-description',

            layout: {
                type: 'hbox',
                align: 'start'
            },

            items: [{
                xtype: 'infofield',
                name: 'description',
                title: 'Descripción',
                iconCls: 'x-fa fa-circle-info',
                dataType: 'text',

                renderer: function(value) {
                    return Ext.String.htmlEncode(value || '');
                }
            }]
        }, {
            xtype: 'container',
            cls: 'sn-position-section sn-position-documents',

            layout: {
                type: 'hbox',
                align: 'start'
            },

            items: [{
                xtype: 'infofield',
                name: 'jd_file',
                title: 'Archivo JD',
                iconCls: 'x-fa fa-file-pdf',
                dataType: 'text',

                click: function (obj) {
                    let  value = obj.getValue();

                    let url = 'http://localhost:3000/files/jd/' + encodeURIComponent(String(value).split(/[\\/]/).pop());

                    window.open( url, '_blank', 'noopener,noreferrer' );
                },

                
            }, ]
        }]
    }],

    buttons: [{
        text: 'Cerrar',
        cls: 'sn-position-close-btn',
        handler: function(btn) {
            btn.up('window').close();
        }
    }],

    loadPosition: function(record) {
        var form = this.down('form');

        form.getForm().setValues(record.getData());
    }
});
