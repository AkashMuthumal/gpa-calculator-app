import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import NavigationBar from "../components/NavigationBar";

const Subject = () => {
    const [loading, setLoading] = useState(true);
    const [subjects, setSubjects] = useState([]);
    const [show, setShow] = useState(false);
    const [grade, setGrade] = useState(0);
    const [subjectId, setSubjectId] = useState("");

    useEffect(() => {
        setLoading(true);
        axios
            .get("/subjects", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => {
                setSubjects(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = (subjectId) => {
        setSubjectId(subjectId);
        setShow(true);
    };

    const handleSubscription = () => {
        const userId = localStorage.getItem("userId");
        const data = {
            userId: userId,
            subjectId: subjectId,
            grade: grade,
        };

        axios
            .post("/enrolls", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => {
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                        <th>subscribe</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading ? (
                        subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>{subject.name}</td>
                                <td>{subject.semester}</td>
                                <td>{subject.credit}</td>
                                <td>{subject.code}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(subject._id)}
                                    >
                                        Subscribe
                                    </Button>
                                </td>
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
                            <td>
                                <Spinner animation="border" variant="primary" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Subject Subscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <select
                        className="mb-3 form-select"
                        aria-label="Default select example"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="0" disabled>Grade</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="B-">B-</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="C-">C-</option>
                        <option value="D+">D+</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubscription}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Subject;
