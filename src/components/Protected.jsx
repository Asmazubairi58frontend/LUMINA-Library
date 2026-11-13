import React from "react";
import { Navigate } from "react-router-dom";
export default function Protected({children}) { return localStorage.getItem("lumora-session")==="active" ? children : <Navigate to="/login" replace/>; }