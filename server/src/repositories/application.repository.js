const { pool } = require("../config/database");

const baseQuery = `
    SELECT
        a.id AS application_id,
        a.match_percentage,
        a.match_summary,
        a.ai_status,
        a.ai_response,
        a.applied_at,
        a.analyzed_at,

        c.id AS candidate_id,
        c.first_name AS candidate_first_name,
        c.last_name AS candidate_last_name,
        c.email AS candidate_email,
        c.phone AS candidate_phone,
        c.resume_file,
        c.resume_text,
        c.created_at AS candidate_created_at,
        c.updated_at AS candidate_updated_at,

        p.id AS position_id,
        p.title AS position_title,
        p.department AS position_department,
        p.location AS position_location,
        p.jd_file,
        p.description AS position_description,
        p.status AS position_status,
        p.created_at AS position_created_at,
        p.updated_at AS position_updated_at

    FROM applications a
    INNER JOIN candidates c
        ON c.id = a.candidate_id
    INNER JOIN positions p
        ON p.id = a.position_id
`;

async function findAll() {
    const sql = `
        ${baseQuery}
        ORDER BY a.id ASC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

async function findById(id) {
    const sql = `
        ${baseQuery}
        WHERE a.id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

async function findByCandidateId(candidateId) {
    const sql = `
        ${baseQuery}
        WHERE c.id = ?
        ORDER BY a.id ASC
    `;

    const [rows] = await pool.execute(sql, [candidateId]);

    return rows;
}

async function findByPositionId(positionId) {
    const sql = `
        ${baseQuery}
        WHERE p.id = ?
        ORDER BY
            a.match_percentage DESC,
            c.last_name ASC,
            c.first_name ASC
    `;

    const [rows] = await pool.execute(sql, [positionId]);

    return rows;
}

async function getFiles(appId) {
    console.log(appId);
    const sql = `
        SELECT q.jd_file, q.resume_file FROM
        (
            ${baseQuery}
            WHERE a.id = ?
        ) q
    `;

    const [rows] = await pool.execute(sql, [appId]);

    return rows;
}

async function saveResults(appId,result) {
    const selStatus = "validated";

    const values = [
        result.match_percentage,
        JSON.stringify(result),
        selStatus,
        appId
    ];

    const sql = `
        UPDATE applications SET
            match_percentage = ?,
            ai_response = ?,
            ai_status = ?,
            analyzed_at= NOW()
        WHERE id = ?
    `;

    const [dbResult] = await pool.execute(sql, values);
    console.log(dbResult);

    return dbResult;
}

async function createApplication(candidateId, positionId) {

    const sql = `
        INSERT INTO applications (
            candidate_id,
            position_id,
            ai_status,
            match_percentage,
            applied_at
        )
        VALUES (?, ?,'pending','0',NOW())
    `;

    const [result] = await pool.execute(sql, [
        candidateId,
        positionId
    ]);

    return result.insertId;
}

module.exports = {
    findAll,
    findById,
    findByCandidateId,
    findByPositionId,
    getFiles,
    saveResults,
    createApplication
};