import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import Spinner from "react-bootstrap/Spinner";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios
            .get("/auth/logout", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => {
                console.log("logout successful");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <div>{loading ? <Spinner /> : ""}</div>;
};

export default Logout;
