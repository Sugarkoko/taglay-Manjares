require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const debugUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected\n');
        console.log('Database name:', mongoose.connection.name);
        console.log('Connection string:', process.env.MONGO_URI.replace(/:[^:]*@/, ':****@'), '\n');

        const users = await User.find({});
        console.log(`Found ${users.length} users:\n`);
        
        users.forEach(user => {
            console.log(`ID: ${user._id}`);
            console.log(`Email: ${user.email}`);
            console.log(`Username: ${user.username}`);
            console.log(`Type: ${user.type}`);
            console.log(`Active: ${user.isActive}`);
            console.log('---');
        });

        // Test finding by email
        const testUser = await User.findOne({ email: 'admin@articlehub.com' });
        console.log('\nTesting findOne with email "admin@articlehub.com":');
        console.log(testUser ? 'Found!' : 'Not found!');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debugUsers();
