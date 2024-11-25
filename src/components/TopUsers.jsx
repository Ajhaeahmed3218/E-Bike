import React from "react";

const TopUsers = () => {
  // Sort customers by totalBooked (high to low)
  const sortedCustomers = [...customers].sort((a, b) => b.totalBooked - a.totalBooked);

  return (
    <div>
      <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Top Customers</h2>
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
                    <div className="font-semibold text-left">Total Booked</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Img</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {sortedCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{customer.name}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.phone}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {customer.totalBooked}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex justify-center">
                        <img
                          className="rounded-full"
                          src={customer.img}
                          alt={customer.name}
                          width="40"
                          height="40"
                        />
                      </div>
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

const customers = [
  {
    id: 1,
    name: "Alex Shatov",
    phone: "+8801793321319",
    totalBooked: 30,
    img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg",
  },
  {
    id: 2,
    name: "Philip Harbach",
    phone: "+8801793321320",
    totalBooked: 25,
    img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg",
  },
  {
    id: 3,
    name: "Mirko Fisuk",
    phone: "+8801793321321",
    totalBooked: 40,
    img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg",
  },
  {
    id: 4,
    name: "Olga Semklo",
    phone: "+8801793321322",
    totalBooked: 15,
    img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-07.jpg",
  },
  {
    id: 5,
    name: "Burak Long",
    phone: "+8801793321323",
    totalBooked: 20,
    img: "https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg",
  },
];

export default TopUsers;
