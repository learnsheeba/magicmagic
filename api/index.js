// Vercel Serverless Function entrypoint.
// This mounts the Express app so routes like /api/me work in production.
require("dotenv").config();

const { createApp } = require("../backend/src/app");

module.exports = createApp();

