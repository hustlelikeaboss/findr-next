import pg, { Pool } from 'pg';
import sqorn from '@sqorn/pg';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export default sqorn({ pg, pool });
