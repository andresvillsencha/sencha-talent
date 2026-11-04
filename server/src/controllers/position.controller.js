const positionService = require("../services/position.service");

async function getAll(req, res, next) {
    try {
        const positions = await positionService.getAll();

        res.status(200).json({
            success: true,
            count: positions.length,
            data: positions
        });
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const position = await positionService.getById(req.params.id);

        res.status(200).json({
            success: true,
            data: position
        });
    } catch (error) {
        next(error);
    }
}

async function getCandidatesbyPositionId(req, res, next) {
    try {
        const position = await positionService.getCandidatesbyPositionId(req.params.id);

        res.status(200).json({
            success: true,
            data: position
        });
    } catch (error) {
        next(error);
    }
}

async function getAllCandidates(req, res, next) {
    try {
        const position = await positionService.getAllCandidates();

        res.status(200).json({
            success: true,
            data: position
        });
    } catch (error) {
        next(error);
    }
}

async function createPosition(req, res) {
    try {
        const position = await positionService.createPosition(req.body);

        res.status(201).json({
            success: true,
            data: position
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error creating position"
        });
    }
}

async function updatePosition(req, res) {
    try {
        const positionId = req.params.id;

        const position = await positionService.updatePosition(
            positionId,
            req.body
        );

        res.json({
            success: true,
            data: position
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error updating position"
        });
    }
}

module.exports = {
    getAll,
    getById,
    createPosition,
    updatePosition,
    getCandidatesbyPositionId,
    getAllCandidates
};