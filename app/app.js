/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'HrApp.Application',

    name: 'HrApp',

    requires: [
        // This will automatically load all classes in the HrApp namespace
        // so that application classes do not need to require each other.
        'HrApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'HrApp.view.main.Main'
});
