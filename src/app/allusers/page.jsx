"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const Allusers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state

  // get data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getallusers/api`);
        setCustomers(response.data.users); 
        console.log(response.data.users);
        // Assuming the data comes in the response's `data` property
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter customers based on the search term
  const filteredCustomers = customers?.filter((customer) =>
    customer?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer?.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredCustomers);

  const handleAddMember = async (e) => {
    e.preventDefault(); // Prevent page reload
    const fullName = e.target.fullName.value;
    const age = e.target.age.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const role = e.target.role.value;
    const newUser = { fullName, age, email, phone, role };

    // Using fetch to POST data
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/allusers/api`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json", // Correct header for JSON data
      },
    });

    if (resp.status === 200) {
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'New User Added Successfully!',
        text: 'Your new user has been successfully added.',
      });
      setShowModal(false);
      e.target.reset();
    } else {
      // Show error alert if request fails
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200 lg:my-0 my-6">
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between">
        <div>
          <h2 className="font-semibold text-gray-800">All Users</h2>
          <input
            type="text"
            placeholder="Search by Name, Email, or Role"
            className="mt-2 px-3 py-2 lg:w-[270px] w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Add Member button */}
        <div>
          <button
            className="border p-2 font-bold bg-[#44576D] text-[#AAC7D8] rounded-lg flex gap-2 justify-center items-center"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <IoPersonAddSharp /> Add Member
          </button>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Member</h2>
            <form className="space-y-4" onSubmit={handleAddMember}>
              <input
                type="text"
                required
                name="fullName"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="number"
                required
                name="age"
                placeholder="Age"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="email"
                required
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
              <input
                type="text"
                required
                name="phone"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
              <select
                name="role"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Phone</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Edit</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Delete</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-slate-400">
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{customer.fullName}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-left">{customer.role}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-left">{customer.phone}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-left">{customer.email}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
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
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
