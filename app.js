/**
 * MadanCo Corporate Platform & CMS - cPanel Passenger Startup Entry
 *
 * This file is loaded by Phusion Passenger in cPanel "Setup Node.js App".
 * Passenger injects process.env.PORT dynamically.
 * Express serves the API, uploads, and the pre-built React frontend.
 */

import app from './server/dist/index.js';

export default app;
