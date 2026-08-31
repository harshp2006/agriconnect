const express = require('express');
const router = express.Router();

// GET /health — bare liveness check, no DB dependency, so it can go live
// even before schema/migrations are run. This is the endpoint the other
// two teams should point at to confirm the backend is deployed.
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'agriconnect-backend' });
});

module.exports = router;
