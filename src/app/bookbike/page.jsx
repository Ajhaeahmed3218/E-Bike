"use client";
import React, { useState } from "react";

const BookBike = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const customers = [
        {
            id: 1,
            name: "Maher Ahmed",
            phone: "+8801793321319",
            age: 20,
        },
        {
            id: 2,
            name: "Nobin Chowdhury",
            phone: "+8801793321320",
            age: 24,
        },
        {
            id: 3,
            name: "Nuhash",
            phone: "+8801793321321",
            age: 18,
        },
        {
            id: 4,
            name: "Osama Bin Laden",
            phone: "+8801793321322",
            age: 30,
        },
        {
            id: 5,
            name: "Anwar Al Awlaki",
            phone: "+8801793321323",
            age: 24,
        },
    ];

    const handleCustomerChange = (e) => {
        const customerId = e.target.value;
        const customer = customers.find((cust) => cust.id === parseInt(customerId));
        setSelectedCustomer(customer);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const age = e.target.age.value;
        const date = e.target.date.value;
        const bikeNumber = e.target.bikeNumber.value;
        const fromTime = e.target.fromTime.value;
        const toTime = e.target.toTime.value;
        const amount = e.target.amount.value;

        const formData = {
            fullName,
            email,
            phone,
            age,
            date,
            bikeNumber,
            fromTime,
            toTime,
            amount,
        };

        console.log("Form Data Submitted:", formData);
        e.target.reset();
        setSelectedCustomer(null); // Optionally reset the selected customer
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Info</h2>
                <div>
                    {/* Customer Selector */}
                    {/* <label className="mb-1 font-medium text-gray-700">Select Customer</label> */}
                    <select
                        onChange={handleCustomerChange}
                        className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex justify-evenly w-full gap-6">
                    <div className="w-1/2">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={selectedCustomer ? selectedCustomer.name : ""}
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Full Name"
                            />
                            <label className="mb-1 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Email"
                            />
                            <label className="mb-1 font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={selectedCustomer ? selectedCustomer.phone : ""}
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Phone Number"
                            />
                            <label className="mb-1 font-medium text-gray-700">Age</label>
                            <input
                                type="text"
                                name="age"
                                value={selectedCustomer ? selectedCustomer.age : ""}
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Age"
                            />
                            <label className="mb-1 font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium text-gray-700">Bike Number</label>
                            <input
                                type="text"
                                name="bikeNumber"
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Bike Number"
                            />
                            <label className="mb-1 font-medium text-gray-700">From Time</label>
                            <input
                                type="time"
                                name="fromTime"
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            />
                            <label className="mb-1 font-medium text-gray-700">To Time</label>
                            <input
                                type="time"
                                name="toTime"
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                            />
                            <label className="mb-1 font-medium text-gray-700">Amount</label>
                            <input
                                type="text"
                                name="amount"
                                className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                placeholder="Amount"
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="border hover:scale-95 duration-300 relative group cursor-pointer text-sky-50 overflow-hidden h-16 w-64 rounded-md bg-sky-200 p-2 flex justify-center items-center font-extrabold"
                >
                    <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-sky-900"></div>
                    <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                    <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-sky-700"></div>
                    <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-sky-600"></div>
                    <p className="z-10">Book Now</p>
                </button>
            </form>
        </div>
    );
};

export default BookBike;
