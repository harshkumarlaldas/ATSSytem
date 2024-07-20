export const jobsTestData = [
    {
        "benefits": "ben",
        "experience": "JavaScript",
        "employmentType": "Master's Degree",
        "requirements": "req1",
        "jobTitle": "Software Developer",
        "jobLocation": "Texas",
        "jobDescriptions": "Jd",
        "salaryTo": "",
        "salaryFrom": "",
        "salaryCurrency": "USD",
        "responsibilities": "req2",
        "userEmail": "hipivot@gmail.com",
        "source": 0,
        "phoneScreen": 0,
        "applied": 0,
        "assessment": 0,
        "interview": 0,
        "offer": 0,
        "hired": 0
    },
    {
        "benefits": "401k",
        "experience": "Intermediate",
        "employmentType": "Freelance",
        "requirements": "Requirement 1",
        "jobTitle": "Data Analyst",
        "jobLocation": "Colorado",
        "jobDescriptions": "Jd4",
        "salaryTo": 71152,
        "salaryFrom": 47732,
        "salaryCurrency": "USD",
        "responsibilities": "Requirement 1",
        "userEmail": "hipivot@gmail.com",
        "source": 50,
        "phoneScreen": 59,
        "applied": 6,
        "assessment": 40,
        "interview": 60,
        "offer": 52,
        "hired": 2
    },
    {
        "benefits": "401k",
        "experience": "Intermediate",
        "employmentType": "Part-time",
        "requirements": "Requirement 3",
        "jobTitle": "Project Manager",
        "jobLocation": "Colorado",
        "jobDescriptions": "Jd3",
        "salaryTo": 102880,
        "salaryFrom": 29950,
        "salaryCurrency": "USD",
        "responsibilities": "Requirement 3",
        "userEmail": "hipivot@gmail.com",
        "source": 7,
        "phoneScreen": 11,
        "applied": 52,
        "assessment": 3,
        "interview": 95,
        "offer": 81,
        "hired": 98
    },
    {
        "benefits": "Paid Time Off",
        "experience": "Beginner",
        "employmentType": "Contract",
        "requirements": "Requirement 1",
        "jobTitle": "Data Engineer",
        "jobLocation": "New York",
        "jobDescriptions": "Jd2",
        "salaryTo": 156218,
        "salaryFrom": 66196,
        "salaryCurrency": "USD",
        "responsibilities": "Requirement 1",
        "userEmail": "hipivot@gmail.com",
        "source": 13,
        "phoneScreen": 45,
        "applied": 79,
        "assessment": 58,
        "interview": 25,
        "offer": 4,
        "hired": 16
    },
    {
        "benefits": "Vision",
        "experience": "Beginner",
        "employmentType": "Part-time",
        "requirements": "Requirement 3",
        "jobTitle": "Team Lead",
        "jobLocation": "Colorado",
        "jobDescriptions": "Jd3",
        "salaryTo": 132754,
        "salaryFrom": 35589,
        "salaryCurrency": "USD",
        "responsibilities": "Requirement 3",
        "userEmail": "hipivot@gmail.com",
        "source": 50,
        "phoneScreen": 66,
        "applied": 83,
        "assessment": 61,
        "interview": 88,
        "offer": 40,
        "hired": 90
    },
    {
        "benefits": "Dental",
        "experience": "Advanced",
        "employmentType": "Internship",
        "requirements": "Requirement 1",
        "jobTitle": "Backend Developer",
        "jobLocation": "New York",
        "jobDescriptions": "Jd3",
        "salaryTo": 187908,
        "salaryFrom": 78652,
        "salaryCurrency": "USD",
        "responsibilities": "Requirement 1",
        "userEmail": "hipivot@gmail.com",
        "source": 6,
        "phoneScreen": 63,
        "applied": 63,
        "assessment": 95,
        "interview": 71,
        "offer": 55,
        "hired": 6
    },
    {
        "benefits": "Dental",
        "experience": "Advanced",
        "employmentType": "Internship",
        "requirements": "Requirement 3",
        "jobTitle": "UX Designer",
        "jobLocation": "Georgia",
        "jobDescriptions": "Jd2",
        "salaryTo": 171380,
        "salaryFrom": 10616,
        "salaryCurrency": "USD",
        "responsibilities": "Requirement 3",
        "userEmail": "hipivot@gmail.com",
        "source": 25,
        "phoneScreen": 62,
        "applied": 48,
        "assessment": 45,
        "interview": 82,
        "offer": 99,
        "hired": 77
    }
]
const jsonData = {
    "jobs": [
        {
            "benefits": "ben",
            "experience": "JavaScript",
            "employmentType": "Master's Degree",
            "requirements": "req1",
            "jobTitle": "Software Developer",
            "jobLocation": "Texas",
            "jobDescriptions": "Jd",
            "salaryTo": "",
            "salaryFrom": "",
            "salaryCurrency": "USD",
            "responsibilities": "req2",
            "userEmail": "hipivot@gmail.com",
            "source": 0,
            "phoneScreen": 0,
            "applied": 0,
            "assessment": 0,
            "interview": 0,
            "offer": 0,
            "hired": 0
        }
    ]
};

function generateRandomJob() {
    const benefits = ["Healthcare", "Dental", "Vision", "401k", "Paid Time Off"];
    const experience = ["Beginner", "Intermediate", "Advanced", "Senior", "Lead", "Manager"];
    const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
    const requirements = ["Requirement 1", "Requirement 2", "Requirement 3", "Requirement 4"];
    const jobTitles = ["Software Developer", "Data Analyst", "Project Manager", "UX Designer", "Backend Engineer"];
    const jobLocations = ["Texas", "California", "New York", "Florida", "Georgia", "Colorado"];
    const jobDescriptions = ["Jd1", "Jd2", "Jd3", "Jd4"];

    const randomBenefits = benefits[Math.floor(Math.random() * benefits.length)];
    const randomExperience = experience[Math.floor(Math.random() * experience.length)];
    const randomEmploymentType = employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
    const randomRequirements = requirements[Math.floor(Math.random() * requirements.length)];
    const randomJobTitle = jobTitles[Math.floor(Math.random() * jobTitles.length)];
    const randomJobLocation = jobLocations[Math.floor(Math.random() * jobLocations.length)];
    const randomJobDescription = jobDescriptions[Math.floor(Math.random() * jobDescriptions.length)];

    const randomJob = {
        "benefits": randomBenefits,
        "experience": randomExperience,
        "employmentType": randomEmploymentType,
        "requirements": randomRequirements,
        "jobTitle": randomJobTitle,
        "jobLocation": randomJobLocation,
        "jobDescriptions": randomJobDescription,
        "salaryTo": Math.floor(Math.random() * 200000),
        "salaryFrom": Math.floor(Math.random() * 150000),
        "salaryCurrency": "USD",
        "responsibilities": randomRequirements,
        "userEmail": "hipivot@gmail.com",
        "source": Math.floor(Math.random() * 100),
        "phoneScreen": Math.floor(Math.random() * 100),
        "applied": Math.floor(Math.random() * 100),
        "assessment": Math.floor(Math.random() * 100),
        "interview": Math.floor(Math.random() * 100),
        "offer": Math.floor(Math.random() * 100),
        "hired": Math.floor(Math.random() * 100)
    };

    return randomJob;
}
for (var i = 0; i < 10; i++) {
    const randomJob = generateRandomJob();
    jsonData.jobs.push(randomJob);
}
console.log(jsonData);