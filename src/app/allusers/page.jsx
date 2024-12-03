"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const Allusers = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Add member modal state
  const [editUser, setEditUser] = useState(null); // Edit user state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // get data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      setError(null); // Reset any previous error
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/getallusers/api`);
        setCustomers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the fetch operation completes
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

  // Handle add member
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
      router.push('/bookbike');
    } else {
      // Show error alert if request fails
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditUser(user); // Set the user details to be edited
    setShowModal(true); // Open the modal for editing
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      fullName: e.target.fullName.value,
      age: e.target.age.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateuser/${editUser._id}`,
        updatedUser
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'User Updated Successfully!',
          text: 'The user details have been updated.',
        });

        // Update the state to reflect the changes
        setCustomers(customers.map((customer) => (customer._id === editUser._id ? { ...customer, ...updatedUser } : customer)));
        setShowModal(false);
        setEditUser(null); // Clear the edit user state
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while updating the user.',
      });
    }
  };

  // Delete user function
  const handleDeleteUser = async (customerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteuser/${customerId}`);
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            setCustomers(customers.filter(customer => customer._id !== customerId));  // Remove deleted user from state
          }
        } catch (error) {
          console.error("Error deleting user:", error.data);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while deleting the user.',
          });
        }
      }
    });
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

      {/* Add/Edit User Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">{editUser ? "Edit User" : "Add New Member"}</h2>
            <form className="space-y-4" onSubmit={editUser ? handleUpdateUser : handleAddMember}>
              <input
                type="text"
                required
                name="fullName"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                defaultValue={editUser?.fullName || ''}
              />
              <input
                type="number"
                required
                name="age"
                placeholder="Age"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                defaultValue={editUser?.age || ''}
              />
              <input
                type="email"
                required
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                defaultValue={editUser?.email || ''}
              />
              <input
                type="text"
                required
                name="phone"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                defaultValue={editUser?.phone || ''}
              />
              <select
                name="role"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
                defaultValue={editUser?.role || ''}
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {editUser ? "Update User" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table of Users */}
      <div className="overflow-x-auto px-5 py-3">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Edit</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="5" className="text-center py-4">{error}</td></tr>
            ) : (
              filteredCustomers?.map((customer) => (
                <tr key={customer?._id}>
                  <td className="px-4 py-2">{customer?.fullName}</td>
                  <td className="px-4 py-2">{customer?.email}</td>
                  <td className="px-4 py-2">{customer?.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditUser(customer)}
                      className="text-blue-500 hover:underline px-2 py-1"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(customer._id)}
                      className="text-red-500 hover:underline px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allusers;
