require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Sample users
const users = [
    {
        firstName: "Admin",
        lastName: "User",
        age: "30",
        gender: "Male",
        contactNumber: "1234567890",
        email: "admin@articlehub.com",
        type: "admin",
        username: "admin",
        password: "admin123", // Will be hashed
        address: "123 Admin Street",
        isActive: true
    },
    {
        firstName: "John",
        lastName: "Editor",
        age: "28",
        gender: "Male",
        contactNumber: "0987654321",
        email: "editor@articlehub.com",
        type: "editor",
        username: "editor",
        password: "editor123", // Will be hashed
        address: "456 Editor Avenue",
        isActive: true
    },
    {
        firstName: "Jane",
        lastName: "Viewer",
        age: "25",
        gender: "Female",
        contactNumber: "5551234567",
        email: "viewer@articlehub.com",
        type: "viewer",
        username: "viewer",
        password: "viewer123", // Will be hashed
        address: "789 Viewer Road",
        isActive: true
    }
];

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing users (optional - comment out if you want to keep existing users)
        await User.deleteMany({});
        console.log('Cleared existing users');

        // Hash passwords and insert users
        const hashedUsers = await Promise.all(
            users.map(async (user) => {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                return {
                    ...user,
                    password: hashedPassword
                };
            })
        );

        await User.insertMany(hashedUsers);
        console.log(`Successfully seeded ${hashedUsers.length} users`);
        console.log('\nUser credentials:');
        users.forEach(user => {
            console.log(`- ${user.type}: ${user.username} / ${user.password}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
