const positionRepository = require("../repositories/position.repository");
const applicationRepository = require("../repositories/application.repository");

async function getAll() {
    return positionRepository.findAll();
}

async function getById(id) {
    const position = await positionRepository.findById(id);

    if (!position) {
        const error = new Error(`Position with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return position;
}

async function getCandidatesbyPositionId(id) {
    const list = await applicationRepository.findByPositionId(id);

    if (!list) {
        const error = new Error(`Position with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return list;
}

async function getAllCandidates(id) {
    const list = await applicationRepository.getAll();

    if (!list) {
        const error = new Error(`Not found`);
        error.statusCode = 404;
        throw error;
    }

    return list;
}




async function createPosition(data) {
    return await positionRepository.createPosition(data);
}

async function updatePosition(id, data) {
    return await positionRepository.updatePosition(id, data);
}

module.exports = {
    getAll,
    getById,
    createPosition,
    updatePosition,
    getCandidatesbyPositionId,
    getAllCandidates
};