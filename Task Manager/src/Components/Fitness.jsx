import React from "react";
import { useState, useEffect } from 'react';
import TaskList from "../Functions/TaskList";

const Fitness = () => {
    const [fitnessTasks, setFitnessTasks] = useState([]);

    useEffect(() => {
        const fetchFitnessTasks = asynch () => {
            const response = await fetch("http://localhost:3000/categories");
        }
    })
}