require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const testUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected\n');

        const users = await User.find({});
        console.log(`Found ${users.length} users in database:\n`);
        
        users.forEach(user => {
            console.log(`- ${user.type}: ${user.email} (username: ${user.username})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

testUsers();
