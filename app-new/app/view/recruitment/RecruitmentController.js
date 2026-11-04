Ext.define('HrApp.view.recruitment.RecruitmentController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.recruitment-ctrl',

    onSelChange: function (selectionModel, selected) {
        let me = this,
            candidatesGrid = me.lookupReference('candidatesGrid'),
            candidatesStore = candidatesGrid.getStore(),
            position = selected.length ? selected[0] : null;

        if (!position) {
            candidatesStore.removeAll();
            return;
        }

        let positionId = position.get('id');

        candidatesStore.getProxy().setUrl(
            'http://localhost:3000/api/positions/'+encodeURIComponent(positionId)+'/candidates/'
        );

        candidatesStore.loadPage(1);
    },

    onOpenDetails: function (grid, record) {
        let wnd = Ext.create('HrApp.view.recruitment.RecruitmentWindow', {
            candidateRecord: record,
            grid
        });
        wnd.show();
    },

    onAnalyze: function (btn) {
        var me = this;
        var win = btn.up('window');

        let record=win.getCandidateRecord();

        if (!record) {
            Ext.Msg.alert('Error', 'No hay candidato seleccionado.');
            return;
        }

        Ext.Msg.confirm('Iniciar Analisis','Esto utilizará tokens. Continuar?', function (answer) {
            if (answer==='yes') {
                me.evaluateCandidate(win, record);
            }
        });

    },

    evaluateCandidate: function (win, record) {
        let me=this;
        let applicationID = record.get('application_id');

        win.setLoading('Analizando CV y JD...');

        Ext.Ajax.request({
            url: 'http://localhost:3000/api/evaluation/' + encodeURIComponent(applicationID),

            method: 'GET',
            timeout: 180000,

            success: function (response) {
                let result;
                win.setLoading(false);

                try {
                    result = Ext.decode(response.responseText);
                } catch (e) {
                    Ext.Msg.alert(
                        'Error',
                        'The server returned invalid JSON.'
                    );
                    return;
                }

                me.updateCandidateEvaluation(win, result.data);
                me.refreshCandidateGrid(win);

                Ext.toast({
                    html: 'Candidate analyzed successfully.',
                    title: 'AI Evaluation',
                    align: 't',
                    slideInDuration: 200
                });

            },

            failure: function () {
                win.setLoading(false);
            },
        });
    },
    updateCandidateEvaluation: function (win, evaluation) {
        let form = win.down('form');

        let values = {
            ai_status: 'Completed',
            match_percentage: evaluation.match_percentage,
            match_summary: evaluation.summary || '',
        };

        form.getForm().setValues(values);
    },

    refreshCandidateGrid: function (win) {
        let grid = win.grid;

        grid.getStore().load();
    }
});