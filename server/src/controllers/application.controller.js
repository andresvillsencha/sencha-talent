const applicationService = require("../services/application.service");

async function getAll(req, res, next) {
    try {
        const applications = await applicationService.getAll();

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const application = await applicationService.getById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: application
        });
    } catch (error) {
        next(error);
    }
}

async function getByCandidateId(req, res, next) {
    try {
        const applications =
            await applicationService.getByCandidateId(
                req.params.candidateId
            );

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        next(error);
    }
}

async function getByPositionId(req, res, next) {
    try {
        const applications =
            await applicationService.getByPositionId(
                req.params.positionId
            );

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        next(error);
    }
}

async function evaluateCandidate(req, res, next) {
    try {
        const applications =
            await applicationService.evaluateCandidate(
                req.params.appId
            );
        console.log("RETURNING: ");
        console.log(applications.length);
        console.log(applications);
        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications
        });
    } catch (error) {
        next(error);
    }
}

async function createApplication(req, res) {
    try {
        const { candidate_id, position_id } = req.body;

        if (!candidate_id || !position_id) {
            return res.status(400).json({
                success: false,
                message: "candidate_id and position_id are required"
            });
        }

        const application = await applicationService.createApplication(
            candidate_id,
            position_id
        );

        res.status(201).json({
            success: true,
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error creating application"
        });
    }
}

module.exports = {
    getAll,
    getById,
    getByCandidateId,
    getByPositionId,
    evaluateCandidate,
    createApplication
};