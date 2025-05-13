import React, { useEffect, useState } from "react";
import "./App.css";

const endpoint = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`;
const pageSize = 10;

function App() {
  // Employee data state variable
  const [employeeData, setEmployeeData] = useState([]);

  // Pagination state variable
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(employeeData.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = employeeData.slice(startIndex, endIndex);

  // Prev button handler: only works if page is greater than 1
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Next button handler: only works if page is smaller than totalPages
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        console.log("Error fetching employee data: ", error);
      }
    };
    fetchEmployeeData();
  }, []);
  return (
    <div className="app-container">
      <h1 className="header">Employee Data Table</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination Logic */}
      <div className="pagination-controls">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Prev
        </button>
        <span className="pagination-btn">{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
