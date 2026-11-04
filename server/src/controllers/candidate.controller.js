const candidateService = require("../services/candidate.service");

async function getAll(req, res, next) {
    try {
        const candidates = await candidateService.getAll();

        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates
        });
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const candidate = await candidateService.getById(req.params.id);

        res.status(200).json({
            success: true,
            data: candidate
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll,
    getById
};