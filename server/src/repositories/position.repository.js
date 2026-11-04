const { pool } = require("../config/database");

async function findAll() {
    const sql = `
        SELECT
            id,
            title,
            department,
            location,
            jd_file,
            description,
            status,
            created_at,
            updated_at
        FROM positions
        ORDER BY id ASC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

async function findById(id) {
    const sql = `
        SELECT
            id,
            title,
            department,
            location,
            jd_file,
            description,
            status,
            created_at,
            updated_at
        FROM positions
        WHERE id = ?
        LIMIT 1
    `;

    const [rows] = await pool.execute(sql, [id]);

    return rows[0] || null;
}

async function createPosition(data) {
    const {
        title,
        department,
        location,
        jd_file,
        description,
        status
    } = data;

    const sql = `
        INSERT INTO positions (
            title,
            department,
            location,
            jd_file,
            description,
            status,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(sql, [
        title,
        department,
        location,
        jd_file,
        description,
        status
    ]);

    return {
        id: result.insertId,
        title,
        department,
        location,
        jd_file,
        description,
        status
    };
}

async function updatePosition(id, data) {
    const {
        title,
        department,
        location,
        jd_file,
        description,
        status
    } = data;

    const sql = `
        UPDATE positions SET
            title = ?,
            department = ?,
            location = ?,
            jd_file = ?,
            description = ?,
            status = ?,
            updated_at = NOW()
        WHERE id = ?
    `;

    const [result] = await db.execute(sql, [
        title,
        department,
        location,
        jd_file,
        description,
        status,
        id
    ]);

    return {
        id,
        affectedRows: result.affectedRows
    };
}

module.exports = {
    findAll,
    findById,
    createPosition,
    updatePosition
};