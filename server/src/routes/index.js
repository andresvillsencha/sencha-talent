const express = require('express');

const testRoutes = require('./test.routes');


const positionRoutes = require('./position.routes');
const candidateRoutes = require('./candidate.routes');
const applicationRoutes = require('./application.routes');

const evRoutes = require('./evaluation.routes');

const router = express.Router();

router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

router.use('/test', testRoutes);
router.use("/positions", positionRoutes);
router.use("/candidates", candidateRoutes);
router.use("/applications", applicationRoutes);

router.use('/evaluation', evRoutes);

module.exports = router;