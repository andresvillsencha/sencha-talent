Ext.define('HrApp.view.recruitment.RecruitmentController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.recruitment',

    onPositionSelectionChange: function(selectionModel, selected) {
        let me = this,
            candidatesGrid = me.lookupReference('candidatesGrid'),
            candidatesStore = candidatesGrid.getStore(),
            position = selected.length ? selected[0] : null;

        // No position selected
        if (!position) {
            candidatesStore.removeAll();
            return;
        }

        // Get selected position ID
        let positionId = position.get('id');

        // Update the proxy URL
        candidatesStore.getProxy().setUrl(
            '/api/positions/'+encodeURIComponent(positionId)+'/candidates/'
        );

        // Reset and load candidates for selected position
        candidatesStore.loadPage(1);
    },

    onPositionDoubleClick: function(grid, record) {
        let window = Ext.create(
            'HrApp.view.recruitment.PositionDetailsWindow'
        );

        window.loadPosition(record);
        window.show();

    }, 

    onCandidateDoubleClick: function (grid, record) {
        let wnd = Ext.create(
                'HrApp.view.recruitment.CandidateDetailsWindow',
                {
                    candidateRecord: record
                }
            );
            
        wnd.show();

    },

    onViewResume: function (btn) {

        let win = btn.up('candidate-details-window');
        let record = win.getCandidateRecord();

        let file = record.get('resume_file');

        if (!file) {
            Ext.Msg.alert('Resume', 'No resume available.');
            return;
        }

        let url = 'http://localhost:3000/files/resume/' +
            encodeURIComponent(file);

        window.open(url, '_blank');

    },

    onViewJobDescription: function (btn) {
        let win = btn.up('candidate-details-window');
        let record = win.getCandidateRecord();

        let file = record.get('jd_file');

        if (!file) {
            Ext.Msg.alert(
                'Job Description',
                'No job description available.'
            );
            return;
        }

        let url = 'http://localhost:3000/files/jd/' +
            encodeURIComponent(file);

        window.open(url, '_blank');

    },

        
    /**
     * Ask for confirmation before analyzing a candidate.
     */
    onAnalyzeCandidate: function (btn) {
        var me = this;
        var win = btn.up('candidate-details-window');

        if (!win) {
            return;
        }

        var record = win.getCandidateRecord();

        if (!record) {
            Ext.Msg.alert('Error', 'No candidate selected.');
            return;
        }

        Ext.Msg.confirm(
            'Confirm AI Analysis',
            'Analyzing this candidate will consume AI tokens and may generate additional costs. Do you want to continue?',
            function (answer) {
                if (answer === 'yes' && !win.destroyed) {
                    me.evaluateCandidate(win, record);
                }
            }
        );
    },

    /**
     * Execute AI candidate evaluation.
     *
     * GET /api/evaluation/:candidateId
     *
     * @param {Ext.window.Window} win
     * @param {Ext.data.Model} record
     */
    evaluateCandidate: function (win, record) {
        var me = this;

        // The API expects the candidate ID,
        // not the application ID.
        var candidateId = record.get('candidate_id');

        if (candidateId == null) {
            Ext.Msg.alert(
                'Error',
                'The candidate ID is missing.'
            );
            return;
        }

        var analyzeBtn = win.down(
            'button[cls=sn-window-primary-btn]'
        );

        win.setLoading('Analyzing candidate with AI...');

        if (analyzeBtn) {
            analyzeBtn.setDisabled(true);
        }

        Ext.Ajax.request({
            url: 'http://localhost:3000/api/evaluation/' +
                encodeURIComponent(candidateId),

            method: 'GET',
            timeout: 180000,

            success: function (response) {
                var result;

                try {
                    result = Ext.decode(response.responseText);
                } catch (e) {
                    Ext.Msg.alert(
                        'Error',
                        'The server returned invalid JSON.'
                    );
                    return;
                }

                if (!result.success || !result.data) {
                    Ext.Msg.alert(
                        'Evaluation Failed',
                        result.message || 'Unable to evaluate candidate.'
                    );
                    return;
                }

                // Update the candidate window
                if (!win.destroyed) {
                    me.updateCandidateEvaluation(win, result.data);
                }

                // Refresh the main recruitment grid
                me.refreshCandidateGrid();

                Ext.toast({
                    html: 'Candidate analyzed successfully.',
                    title: 'AI Evaluation',
                    align: 't',
                    slideInDuration: 200
                });
            },

            failure: function (response) {
                var message = 'Unable to evaluate the candidate.';

                if (response.timedout) {
                    message = 'The AI evaluation request timed out.';
                } else if (response.status) {
                    message += ' HTTP status: ' + response.status;
                }

                Ext.Msg.alert('Evaluation Error', message);
            },

            callback: function () {
                if (!win.destroyed) {
                    win.setLoading(false);

                    if (analyzeBtn) {
                        analyzeBtn.setDisabled(false);
                    }
                }
            }
        });
    },

    /**
     * Update the CandidateDetailsWindow using
     * the evaluation API response.
     */
    updateCandidateEvaluation: function (win, evaluation) {
        var form = win.down('form');

        if (!form) {
            return;
        }

        var values = {
            ai_status: 'Completed',
            match_percentage: evaluation.match_percentage,
            match_summary: evaluation.summary || '',
            recommendation: evaluation.recommendation || ''
        };

        form.getForm().setValues(values);

        // Keep the local candidate record synchronized.
        var record = win.getCandidateRecord();

        if (record) {
            record.set({
                ai_status: 'Completed',
                match_percentage: evaluation.match_percentage,
                match_summary: evaluation.summary || ''
            });
        }
    },

    /**
     * Reload the candidates grid in RecruitmentView.
     */
    refreshCandidateGrid: function () {
        var view = this.getView();

        // When the controller belongs to RecruitmentView,
        // getView() is the main recruitment panel.
        var grid = view.lookupReference('candidatesGrid');

        if (!grid) {
            Ext.log.warn('Candidates grid not found.');
            return;
        }

        var store = grid.getStore();

        if (store) {
            store.reload();
        }
    }

});
