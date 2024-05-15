"use client"
import React, { useState } from "react";
import { Edit3, Trash, CheckCircle, AlertCircle, Printer, MessageSquare } from "lucide-react";
import Image from "next/image";
import { saveAs } from "file-saver";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Table, TableHeader, TableCell, TableBody, DataTableCell } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  }
});

const patientsData = [
  { id: 1, name: 'John Doe', age: 30, mobile: '1234567890', billing: { dues: 200, paid: 100 }, problem: 'Flu' },
  { id: 2, name: 'Jane Smith', age: 25, mobile: '2345678901', billing: { dues: 150, paid: 150 }, problem: 'Back Pain' },
  { id: 3, name: 'Alice Johnson', age: 45, mobile: '3456789012', billing: { dues: 300, paid: 200 }, problem: 'Diabetes' },
  { id: 4, name: 'Bob Brown', age: 50, mobile: '4567890123', billing: { dues: 100, paid: 100 }, problem: 'Hypertension' },
  { id: 5, name: 'Charlie Green', age: 35, mobile: '5678901234', billing: { dues: 250, paid: 50 }, problem: 'Asthma' },
  { id: 6, name: 'Diana Prince', age: 28, mobile: '6789012345', billing: { dues: 0, paid: 0 }, problem: 'Healthy' },
  { id: 7, name: 'Edward Kenway', age: 38, mobile: '7890123456', billing: { dues: 400, paid: 350 }, problem: 'Arthritis' },
  { id: 8, name: 'Fiona Apple', age: 33, mobile: '8901234567', billing: { dues: 150, paid: 150 }, problem: 'Cold' },
  { id: 9, name: 'George Harrison', age: 40, mobile: '9012345678', billing: { dues: 200, paid: 100 }, problem: 'Allergies' },
  { id: 10, name: 'Hannah White', age: 22, mobile: '0123456789', billing: { dues: 300, paid: 250 }, problem: 'Migraine' },
  { id: 11, name: 'Ivan Drago', age: 32, mobile: '9876543210', billing: { dues: 200, paid: 200 }, problem: 'Flu' },
  { id: 12, name: 'Jessica Jones', age: 26, mobile: '8765432109', billing: { dues: 150, paid: 100 }, problem: 'Anxiety' },
  { id: 13, name: 'Kyle Reese', age: 31, mobile: '7654321098', billing: { dues: 250, paid: 50 }, problem: 'PTSD' },
  { id: 14, name: 'Laura Palmer', age: 29, mobile: '6543210987', billing: { dues: 100, paid: 100 }, problem: 'Insomnia' },
  { id: 15, name: 'Michael Scott', age: 41, mobile: '5432109876', billing: { dues: 300, paid: 200 }, problem: 'Stress' },
  { id: 16, name: 'Nancy Drew', age: 27, mobile: '4321098765', billing: { dues: 150, paid: 150 }, problem: 'Headache' },
  { id: 17, name: 'Oliver Twist', age: 35, mobile: '3210987654', billing: { dues: 400, paid: 300 }, problem: 'Malnutrition' },
  { id: 18, name: 'Pam Beesly', age: 30, mobile: '2109876543', billing: { dues: 250, paid: 200 }, problem: 'Pregnancy' },
  { id: 19, name: 'Quentin Tarantino', age: 45, mobile: '1098765432', billing: { dues: 100, paid: 50 }, problem: 'Hypertension' },
  { id: 20, name: 'Rachel Green', age: 28, mobile: '0987654321', billing: { dues: 300, paid: 250 }, problem: 'Depression' },
  { id: 21, name: 'Sam Winchester', age: 34, mobile: '9876543210', billing: { dues: 200, paid: 150 }, problem: 'Anxiety' },
  { id: 22, name: 'Tina Turner', age: 38, mobile: '8765432109', billing: { dues: 150, paid: 150 }, problem: 'Back Pain' },
  { id: 23, name: 'Ursula Buffay', age: 26, mobile: '7654321098', billing: { dues: 250, paid: 200 }, problem: 'Flu' },
  { id: 24, name: 'Victor Frankenstein', age: 40, mobile: '6543210987', billing: { dues: 100, paid: 100 }, problem: 'Arthritis' },
  { id: 25, name: 'Walter White', age: 50, mobile: '5432109876', billing: { dues: 300, paid: 200 }, problem: 'Cancer' },
  { id: 26, name: 'Xena Warrior', age: 32, mobile: '4321098765', billing: { dues: 200, paid: 150 }, problem: 'Wounds' },
  { id: 27, name: 'Yoda Jedi', age: 900, mobile: '3210987654', billing: { dues: 0, paid: 0 }, problem: 'Old Age' },
  { id: 28, name: 'Zelda Fitzgerald', age: 29, mobile: '2109876543', billing: { dues: 150, paid: 100 }, problem: 'Mental Health' },
  { id: 29, name: 'Arya Stark', age: 22, mobile: '1098765432', billing: { dues: 250, paid: 250 }, problem: 'Sword Injury' },
  { id: 30, name: 'Bilbo Baggins', age: 111, mobile: '0987654321', billing: { dues: 300, paid: 100 }, problem: 'Old Age' },
  { id: 31, name: 'Cersei Lannister', age: 42, mobile: '9876543210', billing: { dues: 400, paid: 300 }, problem: 'Alcoholism' },
  { id: 32, name: 'Daenerys Targaryen', age: 31, mobile: '8765432109', billing: { dues: 200, paid: 150 }, problem: 'Stress' },
  { id: 33, name: 'Eddard Stark', age: 48, mobile: '7654321098', billing: { dues: 150, paid: 100 }, problem: 'PTSD' },
  { id: 34, name: 'Frodo Baggins', age: 33, mobile: '6543210987', billing: { dues: 250, paid: 150 }, problem: 'Ring Burden' },
  { id: 35, name: 'Gandalf Grey', age: 2019, mobile: '5432109876', billing: { dues: 0, paid: 0 }, problem: 'Magic Exhaustion' },
  { id: 36, name: 'Harry Potter', age: 18, mobile: '4321098765', billing: { dues: 300, paid: 200 }, problem: 'Scar Pain' },
  { id: 37, name: 'Iron Man', age: 48, mobile: '3210987654', billing: { dues: 400, paid: 300 }, problem: 'Chest Pain' },
  { id: 38, name: 'Jack Sparrow', age: 40, mobile: '2109876543', billing: { dues: 200, paid: 150 }, problem: 'Pirate Wounds' },
  { id: 39, name: 'Katniss Everdeen', age: 25, mobile: '1098765432', billing: { dues: 150, paid: 100 }, problem: 'Trauma' },
  { id: 40, name: 'Legolas Greenleaf', age: 2931, mobile: '0987654321', billing: { dues: 0, paid: 0 }, problem: 'Elf Fatigue' },
];

function Patient() {
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    minDues: 0,
    maxDues: Infinity,
    paidOnly: false,
    dueOnly: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patientsPerPage = 10;

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      patient.billing.dues >= filter.minDues &&
      patient.billing.dues <= filter.maxDues &&
      (filter.paidOnly
        ? patient.billing.paid === patient.billing.dues
        : true) &&
      (filter.dueOnly ? patient.billing.paid < patient.billing.dues : true)
  );

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : parseInt(value, 10);
    setFilter((prevFilter) => ({ ...prevFilter, [name]: newValue }));
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

  const handleExportPDF = () => {
    const patientsDataForPDF = filteredPatients.map(patient => ({
      ID: patient.id,
      Name: patient.name,
      Age: patient.age,
      Mobile: patient.mobile,
      Problem: patient.problem,
      Dues: `Rs ${patient.billing.dues}`,
      Paid: `Rs ${patient.billing.paid}`,
      Status: patient.billing.dues > patient.billing.paid ? "Due" : "Paid"
    }));

    const PDFDocument = (
      <Document>
        <Page>
          <View>
            <Text style={styles.title}>Patient List</Text>
            <Table data={patientsDataForPDF}>
              <TableHeader>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Dues</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Status</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell getContent={(row) => row.ID} />
                <DataTableCell getContent={(row) => row.Name} />
                <DataTableCell getContent={(row) => row.Age} />
                <DataTableCell getContent={(row) => row.Mobile} />
                <DataTableCell getContent={(row) => row.Problem} />
                <DataTableCell getContent={(row) => row.Dues} />
                <DataTableCell getContent={(row) => row.Paid} />
                <DataTableCell getContent={(row) => row.Status} />
              </TableBody>
            </Table>
          </View>
        </Page>
      </Document>
    );

    const pdfBlob = PDFBlob(PDFDocument);
    saveAs(pdfBlob, "patient_list.pdf");
  };

  const handleExportCSV = () => {
    const csvData = filteredPatients.map(patient => ({
      ID: patient.id,
      Name: patient.name,
      Age: patient.age,
      Mobile: patient.mobile,
      Problem: patient.problem,
      Dues: `Rs ${patient.billing.dues}`,
      Paid: `Rs ${patient.billing.paid}`,
      Status: patient.billing.dues > patient.billing.paid ? "Due" : "Paid"
    }));
    const headers = Object.keys(csvData[0]);
    const csvString = [
      headers.join(","),
      ...csvData.map(item => headers.map(header => item[header]).join(","))
    ].join("\n");

    const csvBlob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(csvBlob, "patient_list.csv");
  };

  const handleExportExcel = () => {
    const excelData = filteredPatients.map(patient => ({
      ID: patient.id,
      Name: patient.name,
      Age: patient.age,
      Mobile: patient.mobile,
      Problem: patient.problem,
      Dues: `Rs ${patient.billing.dues}`,
      Paid: `Rs ${patient.billing.paid}`,
      Status: patient.billing.dues > patient.billing.paid ? "Due" : "Paid"
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Patient List");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelBlob, "patient_list.xlsx");
  };

  const sendSMS = (mobileNumber) => {
    const message = "Your message here"; // Customize your SMS message
    const apiKey = "YOUR_API_KEY"; // Replace with your SMS service provider API key
    const apiUrl = "SMS_PROVIDER_API_URL"; // Replace with the API endpoint provided by your SMS service provider

    // Code to send SMS using the API
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Patient Records</h1>
        <input
          type="text"
          className="border px-3 py-1 rounded-md"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Problem</th>
              <th className="px-4 py-2">Dues</th>
              <th className="px-4 py-2">Paid</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="border px-4 py-2">{patient.id}</td>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.age}</td>
                <td className="border px-4 py-2">{patient.mobile}</td>
                <td className="border px-4 py-2">{patient.problem}</td>
                <td className="border px-4 py-2">{`Rs ${patient.billing.dues}`}</td>
                <td className="border px-4 py-2">{`Rs ${patient.billing.paid}`}</td>
                <td className="border px-4 py-2">{patient.billing.dues > patient.billing.paid ? "Due" : "Paid"}</td>
                <td className="border px-4 py-2">
                  <Edit3
                    className="cursor-pointer text-blue-500 mr-2"
                    size={20}
                    onClick={() => handleEdit(patient.id)}
                  />
                  <Trash
                    className="cursor-pointer text-red-500 mr-2"
                    size={20}
                    onClick={() => handleDelete(patient.id)}
                  />
                  <Printer
                    className="cursor-pointer text-green-500 mr-2"
                    size={20}
                    onClick={() => handlePrint(patient)}
                  />
                  <MessageSquare
                    className="cursor-pointer text-blue-500"
                    size={20}
                    onClick={() => sendSMS(patient.mobile)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={handleExportPDF}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Export PDF
        </button>
        <CSVLink data={filteredPatients} onClick={handleExportCSV}>
          <button className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white">
            Export CSV
          </button>
        </CSVLink>
        <button
          onClick={handleExportExcel}
          className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Export Excel
        </button>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <div>
          <button
            onClick={handlePrevious}
            className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Previous
          </button>
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNext}
            className="px-3 py-1 border rounded-md bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            Next
          </button>
        </div>
        <select
          name="perPage"
          id="perPage"
          className="border px-2 py-1 rounded-md"
          onChange={handleFilterChange}
          value={patientsPerPage}
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>
  );
}

export default Patient;
