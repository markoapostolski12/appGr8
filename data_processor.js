const fs = require('fs');
const { Pool } = require('pg');

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'database_name',
  password: 'password',
  port: 5432,
});

const processEvents = async () => {
    try {
        const events = fs.readFileSync('events.jsonl', 'utf8').split('\n');
        const revenueChanges = {};

        for (const event of events) {
            const eventData = JSON.parse(event);
            const { userId, name, value } = eventData;

            let revenueChange = 0;
            if (name === 'add_revenue') {
                revenueChange = value;
            } else if (name === 'subtract_revenue') {
                revenueChange = -value;
            }

            if (!revenueChanges[userId]) {
                revenueChanges[userId] = revenueChange;
            } else {
                revenueChanges[userId] += revenueChange;
            }
        }

        const client = await pool.connect();
        for (const userId in revenueChanges) {
            if (revenueChanges.hasOwnProperty(userId)) {
                const revenueChange = revenueChanges[userId];
                await client.query('UPDATE users_revenue SET revenue = revenue + $1 WHERE user_id = $2', [revenueChange, userId]);
                console.log(`Updated revenue for user ${userId} by ${revenueChange}`);
            }
        }
        client.release();

        console.log('All events processed successfully');
    } catch (error) {
        console.error('Error processing events:', error);
    }
};

processEvents();