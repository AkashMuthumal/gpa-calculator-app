import { Subject } from "../models/subjectModel.js";

const subjectsList = [
    {
        name: "Programming Methodology",
        semester: 3,
        credit: 3,
        code: "CO222",
    },
    {
        name: "Digital Design",
        semester: 3,
        credit: 3,
        code: "CO221",
    },
    {
        name: "Computer Architecture",
        semester: 4,
        credit: 3,
        code: "CO224",
    },
    {
        name: "Computer Communication Networks I",
        semester: 3,
        credit: 3,
        code: "CO223",
    },
    {
        name: "Software Construction",
        semester: 4,
        credit: 3,
        code: "CO225",
    },
    {
        name: "Ordinary Differential Equations",
        semester: 3,
        credit: 2,
        code: "EM211",
    },
    {
        name: "Probability & Statistics",
        semester: 3,
        credit: 2,
        code: "EM213",
    },
    {
        name: "Discrete Mathematics",
        semester: 3,
        credit: 3,
        code: "EM214",
    },
    {
        name: "Network Analysis for Computer Engineering",
        semester: 3,
        credit: 3,
        code: "EE282",
    },
    {
        name: "Database Systems",
        semester: 4,
        credit: 3,
        code: "CO226",
    },
    {
        name: "Calculus II",
        semester: 4,
        credit: 2,
        code: "EM212",
    },
    {
        name: "Numerical Methods",
        semester: 4,
        credit: 3,
        code: "EM215",
    },
    {
        name: "Electronics I",
        semester: 4,
        credit: 3,
        code: "EE285",
    },
];

export async function seedSubjects () {
    try {
        await Subject.insertMany(subjectsList);
        console.log("Database seeded successfully");
    } catch (err) {
        console.error("Error seeding the database:", err);
    } 
}