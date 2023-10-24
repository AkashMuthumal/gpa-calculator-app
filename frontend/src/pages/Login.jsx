import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import axios from "../api/axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    // For login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // For registration
    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [specialization, setSpecialization] = useState(0);
    const [dateOfAdmission, setDateOfAdmission] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [regNo, setRegNo] = useState("");

    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();
        const data = {
            name: username,
            password,
        };
        axios
            .post(`/auth/login`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("userName", response.data.username);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleRegister(event) {
        event.preventDefault();

        let selectSpecial;

        switch (specialization) {
            case 1:
                selectSpecial = "cs";
                break;
            case 2:
                selectSpecial = "mec";
                break;
            case 3:
                selectSpecial = "civil";
                break;
            case 4:
                selectSpecial = "manu";
                break;
            case 5:
                selectSpecial = "chem";
                break;
            case 6:
                selectSpecial = "elec";
                break;
            default:
                selectSpecial = "non";
                break;
        }

        const data = {
            name,
            dateOfBirth,
            specialization: selectSpecial,
            password: newPassword,
            dateOfAdmission,
            regNo,
        };

        console.log(data);

        axios
            .post(`/auth/register`, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => {
                console.log("Registration successful");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="m-4">
            <h1 className="text-primary text-center">
                Welcome to GPA Calculator App
            </h1>

            <Container>
                <Row>
                    <Col className="mx-5 my-5">
                        <Form>
                            <h2 className="text-center pb-4">LOGIN</h2>
                            <FloatingLabel
                                controlId="floatingInput1"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="user"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingPassword1"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                            <div className="d-grid">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="lg"
                                    onClick={handleLogin}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>

                    <Col className="mx-5 my-5">
                        <Form>
                            <h2 className="text-center pb-4">REGISTER</h2>
                            <FloatingLabel
                                controlId="floatingInput2"
                                label="Username"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="user"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput3"
                                label="Date of Birth"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="date"
                                    placeholder="user"
                                    value={
                                        dateOfBirth
                                            ? dateOfBirth
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setDateOfBirth(new Date(e.target.value))
                                    }
                                />
                            </FloatingLabel>
                            <select
                                className="mb-3 form-select"
                                aria-label="Default select example"
                                value={specialization}
                                onChange={(e) =>
                                    setSpecialization(e.target.value)
                                }
                            >
                                <option value="Specialization">
                                    Specialization
                                </option>
                                <option value="1">Computer Engineering</option>
                                <option value="2">Mechanical</option>
                                <option value="3">Civil Engineering</option>
                                <option value="4">
                                    Manufacturing Engineering
                                </option>
                                <option value="5">Chemical Engineering</option>
                                <option value="6">
                                    Electrical Engineering
                                </option>
                            </select>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Date of Admission"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="date"
                                    placeholder="user"
                                    value={
                                        dateOfAdmission
                                            ? dateOfAdmission
                                                  .toISOString()
                                                  .split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setDateOfAdmission(
                                            new Date(e.target.value)
                                        )
                                    }
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingPassword2"
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput4"
                                label="Registration Number"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="reg no"
                                    value={regNo}
                                    onChange={(e) => setRegNo(e.target.value)}
                                />
                            </FloatingLabel>
                            <div className="d-grid">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    size="lg"
                                    onClick={handleRegister}
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
