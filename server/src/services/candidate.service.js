const candidateRepository = require("../repositories/candidate.repository");

async function getAll() {
    return candidateRepository.findAll();
}

async function getById(id) {
    const candidate = await candidateRepository.findById(id);

    if (!candidate) {
        const error = new Error(`Candidate with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return candidate;
}

module.exports = {
    getAll,
    getById
};