import React from 'react';

const Allhistory = () => {
    const customers = [
        {
            age: "20",
            amount: "100",
            bikeNumber: "3",
            date: "2024-11-25",
            email: "maher@gmail.com",
            fromTime: "17:55",
            fullName: "Maher Ahmed",
            phone: "+8801793321319",
            toTime: "18:55"
        },
        {
            age: "25",
            amount: "150",
            bikeNumber: "2",
            date: "2024-11-24",
            email: "sarah@gmail.com",
            fromTime: "09:00",
            fullName: "Sarah Ali",
            phone: "+8801793321320",
            toTime: "10:00"
        },
        {
            age: "30",
            amount: "200",
            bikeNumber: "1",
            date: "2024-11-23",
            email: "jake@gmail.com",
            fromTime: "12:15",
            fullName: "Jake Doe",
            phone: "+8801793321321",
            toTime: "13:15"
        },
        {
            age: "22",
            amount: "120",
            bikeNumber: "4",
            date: "2024-11-22",
            email: "mary@gmail.com",
            fromTime: "14:30",
            fullName: "Mary Smith",
            phone: "+8801793321322",
            toTime: "15:30"
        },
        {
            age: "28",
            amount: "180",
            bikeNumber: "5",
            date: "2024-11-21",
            email: "john@gmail.com",
            fromTime: "16:00",
            fullName: "John Wick",
            phone: "+8801793321323",
            toTime: "17:00"
        },
        {
            age: "24",
            amount: "110",
            bikeNumber: "6",
            date: "2024-11-20",
            email: "emily@gmail.com",
            fromTime: "08:30",
            fullName: "Emily Brown",
            phone: "+8801793321324",
            toTime: "09:30"
        },
        {
            age: "21",
            amount: "130",
            bikeNumber: "7",
            date: "2024-11-19",
            email: "oliver@gmail.com",
            fromTime: "10:45",
            fullName: "Oliver Taylor",
            phone: "+8801793321325",
            toTime: "11:45"
        }
    ];

    return (
        <div>
            <div className="w-full  mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">All Bookins</h2>
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
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {customers.map((customer, index) => (
                                    <tr key={index}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="font-medium text-gray-800">{customer.fullName}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{customer.phone}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{customer.fromTime}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{customer.toTime}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left font-medium text-green-500">
                                                {customer.amount}
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{customer.bikeNumber}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Allhistory;
