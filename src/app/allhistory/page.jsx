"use client";
import React, { useState, useEffect } from "react";

const Allhistory = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/allhistory/api`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCustomers(data.bookings); // Assuming your API returns data in { bookings: [...] }
      } catch (error) {
        setError(error.message);
        return []
      } finally {
        setLoading(false);
        return []
      }
    };

    fetchData();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <div className='h-[100vh] flex justify-center items-center'>
    <img
        src="https://media.giphy.com/media/WFZvB7VIXBgiz3oDXE/giphy.gif" // Replace with your bike GIF link if needed
        alt="E-Bike Animation"
        className="w-64 h-64"
    />
    <h1 className='md:text-6xl text-3xl'>Loading............</h1>
</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12; // Convert 0 or 12 to 12 for 12-hour format
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div>
      <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">All Bookings</h2>
          <input
            type="text"
            placeholder="Search by Name, Phone, or Email"
            className="mt-2 px-3 py-2 lg:w-[270px] w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Phone</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">From Time</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">To Time</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Amount</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Bike Number</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Date</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Delete</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer, index) => (
                    <tr key={index} className="hover:bg-slate-400">
                      <td className="p-3 whitespace-nowrap">
                        <div className="font-medium text-gray-800   ">{customer.fullName}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{customer.phone}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{formatTime(customer.fromTime)}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{formatTime(customer.toTime)}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.amount}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left">{customer.bikeNumber}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-left font-bold">{customer.date}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-5 text-gray-500">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allhistory;
