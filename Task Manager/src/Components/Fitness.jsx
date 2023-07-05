import React from "react";
import { useState, useEffect } from 'react';
import TaskList from "../Functions/TaskList";
import TaskForm from "../Functions/TaskForm";

const Fitness = () => {
    const [fitnessTasks, setFitnessTasks] = useState([]);
  
    useEffect(() => {
      const fetchFitnessTasks = async () => {
        try {
          const response = await fetch('http://localhost:3000/categories');
          const categories = await response.json();
          const fitnessCategory = categories.find(
            (category) => category.name === 'Fitness'
          );
          if (fitnessCategory) {
            setFitnessTasks(fitnessCategory.tasks);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchFitnessTasks();
    }, []);
  
    const handleTaskComplete = (taskId) => {
      setFitnessTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    const handleAddTask = async (newTask) => {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        completed: false,
      };
  
      try {
        await fetch('http://localhost:3000/categories/2/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTaskObj),
        });
  
        setFitnessTasks((prevTasks) => [...prevTasks, newTaskObj]);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <h1>Fitness Tasks</h1>
        <TaskList tasks={fitnessTasks} onTaskComplete={handleTaskComplete} />
        <TaskForm onAddTask={handleAddTask} />
      </div>
    );
  };
  
  export default Fitness;