"use client";
import React, { useState } from 'react';
import { Edit3, Trash, CheckCircle, AlertCircle, Printer } from 'lucide-react';
import Image from 'next/image';

const patientsData = [
  { id: 1, name: 'John Doe', age: 30, billing: { dues: 200, paid: 100 }, problem: 'Flu' },
  { id: 2, name: 'Jane Smith', age: 25, billing: { dues: 150, paid: 150 }, problem: 'Back Pain' },
  { id: 3, name: 'Alice Johnson', age: 45, billing: { dues: 300, paid: 200 }, problem: 'Diabetes' },
  { id: 4, name: 'Bob Brown', age: 50, billing: { dues: 100, paid: 100 }, problem: 'Hypertension' },
  { id: 5, name: 'Charlie Green', age: 35, billing: { dues: 250, paid: 50 }, problem: 'Asthma' },
  { id: 6, name: 'Diana Prince', age: 28, billing: { dues: 0, paid: 0 }, problem: 'Healthy' },
  { id: 7, name: 'Edward Kenway', age: 38, billing: { dues: 400, paid: 350 }, problem: 'Arthritis' },
  { id: 8, name: 'Fiona Apple', age: 33, billing: { dues: 150, paid: 150 }, problem: 'Cold' },
  { id: 9, name: 'George Harrison', age: 40, billing: { dues: 200, paid: 100 }, problem: 'Allergies' },
  { id: 10, name: 'Hannah White', age: 22, billing: { dues: 300, paid: 250 }, problem: 'Migraine' },
  { id: 11, name: 'Ivan Drago', age: 32, billing: { dues: 200, paid: 200 }, problem: 'Flu' },
  { id: 12, name: 'Jessica Jones', age: 26, billing: { dues: 150, paid: 100 }, problem: 'Anxiety' },
  { id: 13, name: 'Kyle Reese', age: 31, billing: { dues: 250, paid: 50 }, problem: 'PTSD' },
  { id: 14, name: 'Laura Palmer', age: 29, billing: { dues: 100, paid: 100 }, problem: 'Insomnia' },
  { id: 15, name: 'Michael Scott', age: 41, billing: { dues: 300, paid: 200 }, problem: 'Stress' },
  { id: 16, name: 'Nancy Drew', age: 27, billing: { dues: 150, paid: 150 }, problem: 'Headache' },
  { id: 17, name: 'Oliver Twist', age: 35, billing: { dues: 400, paid: 300 }, problem: 'Malnutrition' },
  { id: 18, name: 'Pam Beesly', age: 30, billing: { dues: 250, paid: 200 }, problem: 'Pregnancy' },
  { id: 19, name: 'Quentin Tarantino', age: 45, billing: { dues: 100, paid: 50 }, problem: 'Hypertension' },
  { id: 20, name: 'Rachel Green', age: 28, billing: { dues: 300, paid: 250 }, problem: 'Depression' },
  { id: 21, name: 'Sam Winchester', age: 34, billing: { dues: 200, paid: 150 }, problem: 'Anxiety' },
  { id: 22, name: 'Tina Turner', age: 38, billing: { dues: 150, paid: 150 }, problem: 'Back Pain' },
  { id: 23, name: 'Ursula Buffay', age: 26, billing: { dues: 250, paid: 200 }, problem: 'Flu' },
  { id: 24, name: 'Victor Frankenstein', age: 40, billing: { dues: 100, paid: 100 }, problem: 'Arthritis' },
  { id: 25, name: 'Walter White', age: 50, billing: { dues: 300, paid: 200 }, problem: 'Cancer' },
  { id: 26, name: 'Xena Warrior', age: 32, billing: { dues: 200, paid: 150 }, problem: 'Wounds' },
  { id: 27, name: 'Yoda Jedi', age: 900, billing: { dues: 0, paid: 0 }, problem: 'Old Age' },
  { id: 28, name: 'Zelda Fitzgerald', age: 29, billing: { dues: 150, paid: 100 }, problem: 'Mental Health' },
  { id: 29, name: 'Arya Stark', age: 22, billing: { dues: 250, paid: 250 }, problem: 'Sword Injury' },
  { id: 30, name: 'Bilbo Baggins', age: 111, billing: { dues: 300, paid: 100 }, problem: 'Old Age' },
  { id: 31, name: 'Cersei Lannister', age: 42, billing: { dues: 400, paid: 300 }, problem: 'Alcoholism' },
  { id: 32, name: 'Daenerys Targaryen', age: 31, billing: { dues: 200, paid: 150 }, problem: 'Stress' },
  { id: 33, name: 'Eddard Stark', age: 48, billing: { dues: 150, paid: 100 }, problem: 'PTSD' },
  { id: 34, name: 'Frodo Baggins', age: 33, billing: { dues: 250, paid: 150 }, problem: 'Ring Burden' },
  { id: 35, name: 'Gandalf Grey', age: 2019, billing: { dues: 0, paid: 0 }, problem: 'Magic Exhaustion' },
  { id: 36, name: 'Harry Potter', age: 18, billing: { dues: 300, paid: 200 }, problem: 'Scar Pain' },
  { id: 37, name: 'Iron Man', age: 48, billing: { dues: 400, paid: 300 }, problem: 'Chest Pain' },
  { id: 38, name: 'Jack Sparrow', age: 40, billing: { dues: 200, paid: 150 }, problem: 'Pirate Wounds' },
  { id: 39, name: 'Katniss Everdeen', age: 25, billing: { dues: 150, paid: 100 }, problem: 'Trauma' },
  { id: 40, name: 'Legolas Greenleaf', age: 2931, billing: { dues: 0, paid: 0 }, problem: 'Elf Fatigue' },
  { id: 41, name: 'Minerva McGonagall', age: 85, billing: { dues: 300, paid: 250 }, problem: 'Magic Exhaustion' },
  { id: 42, name: 'Neo Matrix', age: 35, billing: { dues: 400, paid: 300 }, problem: 'Virtual Reality Syndrome' },
  { id: 43, name: 'Optimus Prime', age: 1000000, billing: { dues: 0, paid: 0 }, problem: 'Mechanical Issues' },
  { id: 44, name: 'Peter Parker', age: 21, billing: { dues: 200, paid: 150 }, problem: 'Spider Bite' },
  { id: 45, name: 'Quasimodo', age: 40, billing: { dues: 150, paid: 100 }, problem: 'Spinal Deformity' },
  { id: 46, name: 'Ragnar Lothbrok', age: 45, billing: { dues: 250, paid: 200 }, problem: 'Battle Wounds' },
  { id: 47, name: 'Sansa Stark', age: 23, billing: { dues: 100, paid: 100 }, problem: 'Depression' },
  { id: 48, name: 'Tyrion Lannister', age: 38, billing: { dues: 300, paid: 250 }, problem: 'Alcoholism' },
  { id: 49, name: 'Ultron', age: 5, billing: { dues: 200, paid: 200 }, problem: 'AI Malfunction' },
  { id: 50, name: 'Voldemort', age: 71, billing: { dues: 400, paid: 350 }, problem: 'Dark Magic' },
];

function Patient() {
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({ minDues: 0, maxDues: Infinity });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patientsPerPage = 10;

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    patient.billing.dues >= filter.minDues &&
    patient.billing.dues <= filter.maxDues
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, [name]: value ? parseInt(value, 10) : value }));
    setCurrentPage(1); // Reset to first page on new filter
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEdit = (id) => {
    // Handle edit functionality here
    console.log(`Edit patient with id ${id}`);
  };

  const handleDelete = (id) => {
    // Handle delete functionality here
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const handlePrint = (patient) => {
    setSelectedPatient(patient);
    setTimeout(() => {
      window.print();
      setSelectedPatient(null);
    }, 500);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Patient List</h1>
      
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md"
        />
        <div className="flex gap-2">
          <input
            type="number"
            name="minDues"
            placeholder="Min Dues"
            value={filter.minDues}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            name="maxDues"
            placeholder="Max Dues"
            value={filter.maxDues === Infinity ? '' : filter.maxDues}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Age</th>
            <th className="py-2 px-4 border">Problem</th>
            <th className="py-2 px-4 border">Dues</th>
            <th className="py-2 px-4 border">Paid</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border">{patient.id}</td>
              <td className="py-2 px-4 border">{patient.name}</td>
              <td className="py-2 px-4 border">{patient.age}</td>
              <td className="py-2 px-4 border">{patient.problem}</td>
              <td className="py-2 px-4 border">Rs {patient.billing.dues}</td>
              <td className="py-2 px-4 border">Rs {patient.billing.paid}</td>
              <td className="py-2 px-4 border">
                {patient.billing.dues > patient.billing.paid ? (
                  <AlertCircle className="text-red-500 inline" />
                ) : (
                  <CheckCircle className="text-green-500 inline" />
                )}
              </td>
              <td className="py-2 px-4 border flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(patient.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit3 />
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash />
                </button>
                <button
                  onClick={() => handlePrint(patient)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Printer />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {selectedPatient && (
        <div id="bill-modal" className="print-only fixed inset-0 flex items-center justify-center bg-white">
          <div className="p-5 border rounded-md bg-white shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Image src="/medinext.png" alt="Hospital Logo" width={60} height={30} />
                <h2 className="text-xl font-bold">City Hospital</h2>
                <p>123 Main St, City, Country</p>
              </div>
              <div>
                <p>Date: {new Date().toLocaleDateString()}</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Patient Bill</h3>
            <p><strong>Patient Name:</strong> {selectedPatient.name}</p>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>Problem:</strong> {selectedPatient.problem}</p>
            <p><strong>Dues:</strong> Rs {selectedPatient.billing.dues}</p>
            <p><strong>Paid:</strong> Rs {selectedPatient.billing.paid}</p>
            <p><strong>Balance:</strong> Rs {selectedPatient.billing.dues - selectedPatient.billing.paid}</p>
            <div className="mt-4 text-center">
              <button onClick={() => setSelectedPatient(null)} className="px-3 py-1 border rounded-md bg-blue-500 text-white hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patient;
