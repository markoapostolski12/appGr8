const axios = require('axios');
const fs = require('fs');

const events = fs.readFileSync('events.jsonl', 'utf8').split('\n');

const sendEventsToServer = async () => {
    for (const event of events) {
        try {
            await axios.post('http://localhost:8000/liveEvent', JSON.parse(event), {
                headers: {
                    'Authorization': 'secret'
                }
            });
            console.log('Event sent successfully');
        } catch (error) {
            console.error('Error sending event:', error.message);
        }
    }
};

sendEventsToServer();