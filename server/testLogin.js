require('dotenv').config();
const axios = require('axios');

const testLogin = async () => {
    try {
        console.log('Testing login API...\n');
        
        const response = await axios.post('http://localhost:8000/api/users/login', {
            email: 'admin@articlehub.com',
            password: 'admin123'
        });
        
        console.log('✅ Login successful!');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('❌ Login failed!');
        console.error('Error:', error.response?.data || error.message);
    }
};

testLogin();
