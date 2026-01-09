require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');

// Import articles from client
const articles = [
    {
        name: "streaming-wars-2026",
        title: "The Streaming Wars: Who's Winning in 2026?",
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80",
        content: [
            "The battle for streaming supremacy continues to heat up in 2026, with major players adapting their strategies to retain subscribers.",
            "Netflix has introduced a new tier system focusing on interactive content, while Disney+ leverages its massive franchise library with exclusive releases.",
            "Amazon Prime Video is making waves with its original series investments, particularly in the sci-fi and fantasy genres.",
            "The market has become increasingly fragmented, with viewers subscribing to an average of 3.5 streaming services."
        ]
    },
    {
        name: "indie-music-revolution",
        title: "The Indie Music Revolution: Independent Artists Taking Over",
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Independent musicians are reshaping the music industry, bypassing traditional record labels through digital platforms.",
            "Platforms like Spotify, SoundCloud, and Bandcamp have empowered artists to reach global audiences directly.",
            "Social media has become the new A&R department, with TikTok and Instagram driving viral music discovery.",
            "The financial model is evolving, with artists earning more from live performances and merchandise than streaming royalties."
        ]
    },
    {
        name: "remote-work-productivity",
        title: "Maximizing Productivity in Remote Work Environments",
        category: "Business & Growth",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Remote work has transformed from a temporary solution to a permanent workplace model for millions of professionals.",
            "Establishing clear boundaries between work and personal life is crucial for maintaining productivity and mental health.",
            "Tools like Slack, Zoom, and project management software have become essential for team collaboration.",
            "Companies are investing in asynchronous communication practices to accommodate distributed teams across time zones."
        ]
    },
    {
        name: "startup-funding-2026",
        title: "Startup Funding Trends: What Investors Want in 2026",
        category: "Business & Growth",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Venture capital firms are prioritizing sustainable and socially responsible startups in their investment portfolios.",
            "AI and machine learning companies continue to attract the largest funding rounds, but competition is fierce.",
            "Investors are looking for startups with clear paths to profitability rather than growth-at-all-costs models.",
            "Climate tech and healthcare innovations are emerging as the hottest sectors for new investments."
        ]
    },
    {
        name: "ai-transformation",
        title: "AI Revolution: How Artificial Intelligence is Reshaping Industries",
        category: "Tech & Future",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Artificial intelligence has moved beyond the hype phase and is now delivering tangible value across industries.",
            "Healthcare providers are using AI for early disease detection, improving patient outcomes significantly.",
            "Manufacturing companies are implementing AI-powered predictive maintenance, reducing downtime by up to 40%.",
            "The ethical implications of AI deployment remain a critical consideration for organizations and governments."
        ]
    },
    {
        name: "quantum-computing-breakthrough",
        title: "Quantum Computing Breakthrough: What It Means for the Future",
        category: "Tech & Future",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Recent advances in quantum computing have brought us closer to practical applications that were once purely theoretical.",
            "IBM and Google are leading the race, with their quantum processors solving complex problems in minutes that would take classical computers years.",
            "Quantum computing promises to revolutionize fields like cryptography, drug discovery, and financial modeling.",
            "Experts predict that quantum advantage will be achieved in specific domains within the next 3-5 years."
        ]
    },
    {
        name: "sustainable-fashion",
        title: "Sustainable Fashion: The Industry's Green Transformation",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
        content: [
            "The fashion industry is undergoing a radical transformation as consumers demand more sustainable and ethical practices.",
            "Major brands are investing in recycled materials and circular economy models to reduce waste.",
            "Fast fashion is facing increasing scrutiny, with consumers shifting toward quality over quantity.",
            "Technology is enabling transparency in supply chains, allowing customers to trace the journey of their garments."
        ]
    },
    {
        name: "mental-health-workplace",
        title: "Mental Health in the Workplace: Breaking the Stigma",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Organizations are recognizing mental health as a critical component of employee wellbeing and productivity.",
            "Companies are implementing comprehensive mental health programs, including counseling services and wellness apps.",
            "The conversation around work-life balance has shifted from a perk to a fundamental right.",
            "Studies show that investing in employee mental health reduces absenteeism and increases retention rates."
        ]
    },
    {
        name: "esports-mainstream",
        title: "eSports Goes Mainstream: The Rise of Competitive Gaming",
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Competitive gaming has evolved from niche hobby to a billion-dollar industry with massive global audiences.",
            "Major sports networks are broadcasting eSports tournaments, legitimizing gaming as a professional sport.",
            "Universities are offering eSports scholarships, creating pathways for talented gamers to pursue professional careers.",
            "The integration of virtual and augmented reality is pushing the boundaries of competitive gaming experiences."
        ]
    },
    {
        name: "cryptocurrency-adoption",
        title: "Cryptocurrency Adoption: Beyond the Hype",
        category: "Business & Growth",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Cryptocurrency has matured from speculative asset to a legitimate component of diversified investment portfolios.",
            "Major financial institutions are now offering crypto services, signaling mainstream acceptance.",
            "Regulatory frameworks are evolving globally, providing clarity and protection for investors.",
            "Blockchain technology underlying cryptocurrencies is being adopted across industries for secure, transparent transactions."
        ]
    },
    {
        name: "space-exploration-2026",
        title: "The New Space Race: Private Companies Leading the Way",
        category: "Tech & Future",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Private space companies are accelerating humanity's journey beyond Earth with unprecedented innovation.",
            "SpaceX's Mars colonization plans are progressing, with test missions scheduled for the late 2020s.",
            "Space tourism is becoming a reality, with multiple companies offering suborbital flights to paying customers.",
            "The commercialization of space is opening new industries, from asteroid mining to orbital manufacturing."
        ]
    },
    {
        name: "plant-based-revolution",
        title: "The Plant-Based Revolution: Changing How We Eat",
        category: "Lifestyle",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
        content: [
            "Plant-based diets are transitioning from alternative lifestyle to mainstream choice for health and environmental reasons.",
            "Food technology companies are creating plant-based products that rival traditional meat in taste and texture.",
            "Restaurants and fast-food chains are expanding their plant-based menus to meet growing consumer demand.",
            "The shift toward plant-based eating is contributing to reduced carbon emissions and improved public health outcomes."
        ]
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing articles
        await Article.deleteMany({});
        console.log('Cleared existing articles');

        // Insert new articles
        await Article.insertMany(articles);
        console.log(`Successfully seeded ${articles.length} articles`);

        // Disconnect
        await mongoose.disconnect();
        console.log('Database seeding completed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
