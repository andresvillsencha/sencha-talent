function validateId(parameterName = "id") {
    return function validateIdMiddleware(req, res, next) {
        const value = Number(req.params[parameterName]);

        if (!Number.isInteger(value) || value <= 0) {
            return res.status(400).json({
                success: false,
                message: `${parameterName} must be a positive integer`
            });
        }

        req.params[parameterName] = value;

        next();
    };
}

module.exports = validateId;