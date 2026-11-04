const applicationRepository = require(
    "../repositories/application.repository"
);
const aiService = require("./ai.service");

function parseJsonField(value) {
    if (value === null || value === undefined) {
        return null;
    }

    // mysql2 may already return JSON columns as objects.
    if (typeof value === "object") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function mapApplication(row) {
    return {
        id: row.application_id,
        matchPercentage: row.match_percentage,
        matchSummary: row.match_summary,
        aiStatus: row.ai_status,
        aiResponse: parseJsonField(row.ai_response),
        appliedAt: row.applied_at,
        analyzedAt: row.analyzed_at,

        candidate: {
            id: row.candidate_id,
            firstName: row.candidate_first_name,
            lastName: row.candidate_last_name,
            fullName: [
                row.candidate_first_name,
                row.candidate_last_name
            ]
                .filter(Boolean)
                .join(" "),
            email: row.candidate_email,
            phone: row.candidate_phone,
            resumeFile: row.resume_file,
            resumeText: row.resume_text,
            createdAt: row.candidate_created_at,
            updatedAt: row.candidate_updated_at
        },

        position: {
            id: row.position_id,
            title: row.position_title,
            department: row.position_department,
            location: row.position_location,
            jdFile: row.jd_file,
            description: row.position_description,
            status: row.position_status,
            createdAt: row.position_created_at,
            updatedAt: row.position_updated_at
        }
    };
}

async function getAll() {
    const rows = await applicationRepository.findAll();

    return rows.map(mapApplication);
}

async function getById(id) {
    const row = await applicationRepository.findById(id);

    if (!row) {
        const error = new Error(`Application with ID ${id} was not found`);
        error.statusCode = 404;
        throw error;
    }

    return mapApplication(row);
}

async function getByCandidateId(candidateId) {
    const rows = await applicationRepository.findByCandidateId(candidateId);

    return rows.map(mapApplication);
}

async function getByPositionId(positionId) {
    const rows = await applicationRepository.findByPositionId(positionId);

    return rows.map(mapApplication);
}

async function getFiles(appId) {
    const rows = await applicationRepository.getFiles(appId);

    return rows;
}

async function evaluateCandidate(appId) {
    let files = await getFiles(appId);

    const result = await aiService.validateResume(files[0].resume_file,files[0].jd_file);
    console.log(result);

    // Let's save
        // The application table will save the results and change status
            const rows = await applicationRepository.saveResults(appId,result);

    return result;
}

async function createApplication(candidateId, positionId) {

    const applicationId =
        await applicationRepository.createApplication(
            candidateId,
            positionId
        );

    return {
        id: applicationId,
        candidate_id: candidateId,
        position_id: positionId
    };
}

module.exports = {
    getAll,
    getById,
    getByCandidateId,
    getByPositionId,
    evaluateCandidate,
    createApplication
};