const { pool } = require("../config/database");

async function findAll() {
    const sql = `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            resume_text,
            resume_file,
            created_at,
            updated_at
        FROM candidates
        ORDER BY id ASC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

async function findById(id) {
    const sql = `
        SELECT
            id,
            first_name,
            last_name,
            email,
            phone,
            resume_text,
            resume_file,
            created_at,
            updated_at
        FROM candidates
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

module.exports = {
    findAll,
    findById
};