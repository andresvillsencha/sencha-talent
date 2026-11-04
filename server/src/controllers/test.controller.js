// const testService = require('../services/test.service');

const resumeServ = require('../services/resume');

async function getTest(req, res, next) {
    try {
        //const test = await testService.getAll();

        res.json({
            success: true,
            message: 'Nothing to see her, move along',
            data: []
        });
    } catch (error) {
        next(error);
    }
};

async function getResume(req, res, next) {
    try {
        console.log("hello "+(new Date()).toDateString());
        const resumeResult = await resumeServ.validateResume();

        res.json({
            success: true,
            message: 'resume',
            data: []
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getTest,
    getResume
};