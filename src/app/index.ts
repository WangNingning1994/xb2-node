import express from 'express';

/**
 * create app
 */
const app = express();

/**
 * use middleware to handle JSON data
 */

app.use(express.json());

/**
 * export
 */

export default app;