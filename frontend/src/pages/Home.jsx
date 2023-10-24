import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "../api/axios";
import Spinner from "react-bootstrap/Spinner";
import NavigationBar from "../components/NavigationBar";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const [userName, setUserName] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [enrolls, setEnrolls] = useState([]);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [gpa, setGpa] = useState(0);

    const navigate = useNavigate();

    const grades = {
        "A+": 4.0,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        "C+": 2.3,
        C: 2,
        "C-": 1.7,
        "D+": 1.3,
        D: 1,
        E: 0,
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    async function getUser(userName) {
        try {
            const userId = localStorage.getItem("userId");
            const response = await axios.get(
                `/users/${userId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            return response.data[0];
        } catch (error) {
            console.error("Error fetching user data: ", error);
            navigate("/login");
        }
    }

    async function getEnrolls(userId) {
        try {
            const response = await axios.get(
                `/enrolls/user/${userId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Error fetching subject data: ", error);
        }
    }

    async function getSubject(subjectId) {
        try {
            const response = await axios.get(
                `/subjects/${subjectId}`,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching subject data: ", error);
        }
    }

    function handleChange(event) {
        const { value } = event.target;
        setUserName(value);
    }

    async function handleSubmit() {
        setLoading(true);
        setGpa(0);
        // event.preventDefault();

        const userId = localStorage.getItem("userId");
        const enrolls = await getEnrolls(userId);
        setEnrolls(enrolls);

        const subjectPromises = enrolls.map(async (enroll) => {
            const subject = await getSubject(enroll.subjectId);
            return { subject, grade: enroll.grade };
        });

        Promise.all(subjectPromises)
            .then((subjectData) => {
                setSubjects(subjectData);
                setLoading(false);
                const gpa = gpaCalculate(subjectData);
                setGpa(gpa);
            })
            .catch((error) => {
                console.error("Error fetching subject data:", error);
                setLoading(false);
            });
    }

    function gpaCalculate(results) {
        let totalCredit = 0;
        let totalValue = 0;

        for (let i = 0; i < results.length; i++) {
            totalCredit += results[i].subject.credit;
            totalValue += grades[results[i].grade] * results[i].subject.credit;
        }

        const gpa = totalValue / totalCredit;

        console.log(`Total Credits : ${totalCredit}`);
        console.log(`Total Value : ${totalValue}`);
        console.log(`GPA : ${gpa}`);

        return gpa;
    }

    return (
        <div>
            <NavigationBar />
            <Table striped bordered hover className="m-4">
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Semester</th>
                        <th>Credit</th>
                        <th>Code</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ? (
                        subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>{subject.subject.name}</td>
                                <td>{subject.subject.semester}</td>
                                <td>{subject.subject.credit}</td>
                                <td>{subject.subject.code}</td>
                                <td>{subject.grade}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                <Spinner animation="border" variant="primary" />
                            </td>
                            <td>
                                <Spinner animation="border" variant="primary" />
                            </td>
                            <td>
                                <Spinner animation="border" variant="primary" />
                            </td>
                            <td>
                                <Spinner animation="border" variant="primary" />
                            </td>
                            <td>
                                <Spinner animation="border" variant="primary" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <h1 className="mx-4">GPA : {gpa}</h1>
        </div>
    );
};

export default Home;
