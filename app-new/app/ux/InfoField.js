
/**
 * @class HrApp.ux.InfoField
 * @extends Ext.container.Container
 * @alias widget.infofield
 *
 * Reusable read-only information component.
 *
 * Features:
 * - Icon, label, and formatted value
 * - Form integration (setValues / loadRecord)
 * - Text, boolean, number, date, time, datetime
 * - Custom renderer
 * - Optional click handler
 * - Automatic pointer cursor when clickable
 * - Dynamic click handler using setClick()
 *
 * @author Aumenta Desarrollo de Software
 */
Ext.define('HrApp.ux.InfoField', {
    extend: 'Ext.container.Container',

    xtype: 'infofield',

    cls: 'sn-position-field-container',

    layout: {
        type: 'hbox',
        align: 'center'
    },

    // =====================================================
    // CONFIGURATION
    // =====================================================

    config: {

        /**
         * Name assigned to the internal displayfield.
         */
        name: null,

        /**
         * Label displayed above the value.
         */
        title: '',

        /**
         * Font Awesome icon CSS classes.
         */
        iconCls: 'x-fa fa-info-circle',

        /**
         * Supported:
         * text, boolean, number, date, time, datetime
         */
        dataType: 'text',

        /**
         * Optional date/time or numeric format.
         */
        format: null,

        /**
         * Optional custom value renderer.
         *
         * renderer: function(value, infoField) {
         *     return String(value);
         * }
         *
         * Custom HTML is not automatically encoded.
         */
        renderer: null,

        /**
         * Optional click handler.
         *
         * click: function(infoField, event) {
         *     console.log(infoField.getValue());
         * }
         *
         * If null, the component is not clickable.
         */
        click: null,

        /**
         * Boolean display labels.
         */
        trueText: 'Sí',
        falseText: 'No',

        /**
         * Placeholder for missing values.
         */
        emptyText: '-'
    },

    /**
     * Optional initial value.
     */
    value: null,

    // =====================================================
    // CHILD COMPONENTS
    // =====================================================

    items: [{
        xtype: 'component',
        itemId: 'fieldIcon',
        cls: 'sn-position-field-icon'
    }, {
        xtype: 'displayfield',
        itemId: 'fieldValue',
        labelAlign: 'top',
        flex: 1,
        cls: 'sn-position-field',

        renderer: function(value) {
            var infoField = this.up('infofield'),
                customRenderer;

            if (!infoField) {
                return Ext.String.htmlEncode(
                    String(
                        value === null ||
                        value === undefined
                            ? ''
                            : value
                    )
                );
            }

            customRenderer = infoField.getRenderer();

            if (Ext.isFunction(customRenderer)) {
                return customRenderer.call(
                    infoField,
                    value,
                    infoField
                );
            }

            return infoField.formatValue(value);
        }
    }],

    // =====================================================
    // COMPONENT LIFECYCLE
    // =====================================================

    onAdded: function() {
        this.callParent(arguments);

        this.refreshField();
    },

    afterRender: function() {
        var me = this;

        me.callParent(arguments);

        me.refreshField();

        // Register the click event on the container.
        // Ext JS automatically manages listener cleanup.
        me.mon(
            me.getEl(),
            'click',
            me.onFieldClick,
            me
        );

        // Update the cursor based on click configuration.
        me.updateClick(me.getClick());
    },

    // =====================================================
    // CLICK HANDLING
    // =====================================================

    /**
     * Executes the configured click handler.
     *
     * @param {Ext.event.Event} event
     * @private
     */
    onFieldClick: function(event) {
        var handler = this.getClick();

        if (Ext.isFunction(handler)) {
            handler.call(
                this,
                this,
                event
            );
        }
    },

    /**
     * Updates the clickable appearance.
     *
     * Called automatically when:
     * - The component is initialized
     * - setClick() is called
     *
     * @param {Function/null} handler
     * @private
     */
    updateClick: function(handler) {
        var me = this,
            el = me.getEl(),
            isClickable = Ext.isFunction(handler);

        if (!el) {
            return;
        }

        // Update pointer cursor
        el.setStyle(
            'cursor',
            isClickable ? 'pointer' : ''
        );

        // Add/remove clickable CSS class
        if (isClickable) {
            me.addCls('sn-infofield-clickable');
        } else {
            me.removeCls('sn-infofield-clickable');
        }
    },

    // =====================================================
    // CONFIGURATION UPDATE METHODS
    // =====================================================

    updateName: function() {
        this.syncFieldName();
    },

    updateTitle: function(value) {
        var field = this.getDisplayField();

        if (field) {
            field.setFieldLabel(value);
        }
    },

    updateIconCls: function() {
        var icon = this.getIconField();

        if (icon) {
            icon.setHtml(this.buildIconHtml());
        }
    },

    updateDataType: function() {
        this.refreshValue();
    },

    updateFormat: function() {
        this.refreshValue();
    },

    updateRenderer: function() {
        this.refreshValue();
    },

    updateTrueText: function() {
        this.refreshValue();
    },

    updateFalseText: function() {
        this.refreshValue();
    },

    updateEmptyText: function() {
        this.refreshValue();
    },

    // =====================================================
    // INTERNAL FIELD ACCESS
    // =====================================================

    /**
     * Returns the internal displayfield.
     *
     * @return {Ext.form.field.Display/null}
     * @private
     */
    getDisplayField: function() {
        if (!this.items || !this.items.isMixedCollection) {
            return null;
        }

        return this.down('#fieldValue');
    },

    /**
     * Returns the internal icon component.
     *
     * @return {Ext.Component/null}
     * @private
     */
    getIconField: function() {
        if (!this.items || !this.items.isMixedCollection) {
            return null;
        }

        return this.down('#fieldIcon');
    },

    // =====================================================
    // NAME SYNCHRONIZATION
    // =====================================================

    /**
     * Assigns the name to the internal displayfield.
     *
     * Supports Ext JS versions where the displayfield
     * does not provide setName().
     *
     * @private
     */
    syncFieldName: function() {
        var field = this.getDisplayField();

        if (!field) {
            return;
        }

        var name = this.getName();

        if (Ext.isFunction(field.setName)) {
            field.setName(name);
        } else {
            field.name = name;
        }
    },

    // =====================================================
    // DISPLAY METHODS
    // =====================================================

    /**
     * Synchronizes:
     * - Name
     * - Label
     * - Icon
     * - Initial value
     *
     * Initial values are applied only once.
     *
     * @public
     */
    refreshField: function() {
        var field = this.getDisplayField(),
            icon = this.getIconField();

        if (field) {

            this.syncFieldName();

            field.setFieldLabel(this.getTitle());

            if (!this._initialValueApplied) {

                if (this.value !== null &&
                    this.value !== undefined) {

                    field.setValue(this.value);
                }

                this._initialValueApplied = true;
            }
        }

        if (icon) {
            icon.setHtml(this.buildIconHtml());
        }
    },

    /**
     * Refreshes the formatted display value.
     *
     * @public
     */
    refreshValue: function() {
        var field = this.getDisplayField();

        if (field) {
            field.setRawValue(
                field.valueToRaw(field.getValue())
            );
        }
    },

    /**
     * Builds the icon HTML.
     *
     * @return {String}
     * @private
     */
    buildIconHtml: function() {
        return '<span class="' +
            Ext.String.htmlEncode(
                this.getIconCls() || ''
            ) +
            '"></span>';
    },

    // =====================================================
    // VALUE MANAGEMENT
    // =====================================================

    /**
     * Sets the value of the internal displayfield.
     *
     * @param {*} value
     * @return {HrApp.ux.InfoField}
     * @public
     */
    setValue: function(value) {
        var field = this.getDisplayField();

        this.value = value;

        if (field) {
            field.setValue(value);
            this._initialValueApplied = true;
        }

        return this;
    },

    /**
     * Returns the current raw value.
     *
     * @return {*}
     * @public
     */
    getValue: function() {
        var field = this.getDisplayField();

        return field
            ? field.getValue()
            : this.value;
    },

    // =====================================================
    // VALUE FORMATTING
    // =====================================================

    /**
     * Formats a raw value based on its data type.
     *
     * @param {*} value
     * @return {String}
     * @public
     */
    formatValue: function(value) {
        var me = this,
            type = me.getDataType(),
            format = me.getFormat(),
            date,
            number,
            defaultFormats;

        // Handle empty values.
        if (value === null ||
            value === undefined ||
            value === '') {

            return Ext.String.htmlEncode(
                String(me.getEmptyText())
            );
        }

        switch (type) {

            // -----------------------------------------
            // BOOLEAN
            // -----------------------------------------
            case 'boolean':

                return Ext.String.htmlEncode(
                    me.formatBoolean(value)
                );

            // -----------------------------------------
            // NUMBER
            // -----------------------------------------
            case 'number':

                number = Number(value);

                if (!isFinite(number)) {
                    return Ext.String.htmlEncode(
                        String(me.getEmptyText())
                    );
                }

                return Ext.util.Format.number(
                    number,
                    format || '0,000.00'
                );

            // -----------------------------------------
            // DATE / TIME / DATETIME
            // -----------------------------------------
            case 'date':
            case 'time':
            case 'datetime':

                if (Ext.isDate(value)) {

                    date = value;

                } else if (
                    typeof value === 'string' &&
                    /^\d{4}-\d{2}-\d{2}$/.test(value)
                ) {

                    date = Ext.Date.parse(
                        value,
                        'Y-m-d'
                    );

                } else if (
                    type === 'time' &&
                    typeof value === 'string' &&
                    /^\d{2}:\d{2}(:\d{2})?$/.test(value)
                ) {

                    date = Ext.Date.parse(
                        '2000-01-01 ' + value,
                        value.length === 5
                            ? 'Y-m-d H:i'
                            : 'Y-m-d H:i:s'
                    );

                } else {

                    date = new Date(value);
                }

                if (!date || isNaN(date.getTime())) {
                    return Ext.String.htmlEncode(
                        String(me.getEmptyText())
                    );
                }

                defaultFormats = {
                    date: 'd/m/Y',
                    time: 'H:i',
                    datetime: 'd/m/Y H:i'
                };

                return Ext.Date.format(
                    date,
                    format || defaultFormats[type]
                );

            // -----------------------------------------
            // TEXT
            // -----------------------------------------
            case 'text':
            default:

                return Ext.String.htmlEncode(
                    String(value)
                );
        }
    },

    /**
     * Converts boolean-compatible values
     * into the configured labels.
     *
     * True values:
     * - true
     * - 1
     * - '1'
     * - 'true'
     *
     * @param {*} value
     * @return {String}
     * @public
     */
    formatBoolean: function(value) {
        var isTrue = value === true ||
            value === 1 ||
            value === '1' ||
            value === 'true';

        return isTrue
            ? this.getTrueText()
            : this.getFalseText();
    },

    // =====================================================
    // RECORD SUPPORT
    // =====================================================

    /**
     * Loads the value from an Ext.data.Model
     * or a plain JavaScript object.
     *
     * @param {Ext.data.Model/Object} record
     * @public
     */
    setRecord: function(record) {
        var name = this.getName(),
            value;

        if (!name || !record) {
            return;
        }

        value = record.isModel
            ? record.get(name)
            : record[name];

        this.setValue(value);
    }
});
