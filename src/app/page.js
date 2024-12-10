"use client";
export const dynamic = 'force-dynamic';
import { RiEBikeLine } from "react-icons/ri";
import { IoIosBookmarks } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import TopUsers from "@/components/TopUsers";
import { useEffect, useState } from "react";

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('API URL:', process.env.NEXT_PUBLIC_BASE_URL); // চেক করুন API URL লোড হচ্ছে কিনা
        const [historyResponse, usersResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/allhistory/api`),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/getallusers/api`),
        ]);
        if (!historyResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data from one or both APIs");
        }
        const historyData = await historyResponse.json();
        const usersData = await usersResponse.json();
        console.log(usersData.users);
  
        // Get today's date in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split("T")[0];
  
        // Filter usersData to include only today's users
        const todaysUsers = usersData.users.filter(user => {
          // Assuming the 'user.date' is a valid date string or timestamp
          const userDate = new Date(user?.date).toISOString().split("T")[0]; // Format the user's date to 'YYYY-MM-DD'
          return userDate === today; // Compare with today's date
        });
        
        console.log(todaysUsers);
  
        // Filter bookings to include only today's bookings
        const todaysBookings = historyData.bookings.filter(booking => {
          const bookingDate = new Date(booking.date).toISOString().split("T")[0]; // Adjust field name if necessary
          return bookingDate === today;
        });
  
        // today's sum of the amount
        const totalSum = todaysBookings
          .map(rent => parseFloat(rent.amount)) // Convert amounts to numbers
          .reduce((sum, current) => sum + current, 0); // Sum up the amounts
  
        const todaysBooking = {
          todayAount: totalSum,
          todayusers: todaysBookings.length,
          newUser : todaysUsers
        }
  
        setCustomers(todaysBooking);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) return <div className='h-[100vh] flex justify-center items-center'>
    <img
      src="https://media.giphy.com/media/WFZvB7VIXBgiz3oDXE/giphy.gif" // Replace with your bike GIF link if needed
      alt="E-Bike Animation"
      className="w-64 h-64"
    />
    <h1 className='md:text-6xl text-3xl'>Loading............</h1>
  </div>;
  if (error) return <div>Error: {error}</div>;


  //Today's tolal sell, Today's Booking

  console.log(customers);



  return (
    <div className=' grid grid-cols-12 gap-4 justify-center '>

      <div className="mt-12 col-span-12">
        <div className='my-2 mb-10'>
          <h1 className='text-2xl font-bold '>Website Overview</h1>
          <p>Update Summery</p>
        </div>
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd"></path>
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                {`Today's Money`}</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{customers.todayAount} TK</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">+55%</strong>&nbsp;than last week
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{`Today's Bookings`}</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{customers.todayusers}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">+3%</strong>&nbsp;than last month
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">New Clients</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{customers?.newUser.length}</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-red-500">-2%</strong>&nbsp;than yesterday
              </p>
            </div>
          </div>

          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.035 0 1.875.839 1.875 1.875v9.75c0 1.035-.84 1.875-1.875 1.875h-.75c-1.035 0-1.875-.84-1.875-1.875v-9.75zM5.625 9c-.688 0-1.25.562-1.25 1.25v9.5c0 .688.562 1.25 1.25 1.25h.75c.688 0 1.25-.562 1.25-1.25v-9.5c0-.688-.562-1.25-1.25-1.25h-.75z"></path>
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{`Today's Sales`}</p>
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">$2,400</h4>
            </div>
            <div className="border-t border-blue-gray-50 p-4">
              <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                <strong className="text-green-500">+10%</strong>&nbsp;than last week
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className='rounded-xl dark:bg-[#1a1a1a] bg-white pt-3 pb-4 px-4 lg:col-span-8 col-span-12 h-[310px]'>
        {/* <div className='my-2 mb-4'>
          <h1 className='text-2xl font-bold '>Website Overview</h1>
          <p>Update Summery</p>
        </div> */}
        <div className='lg:flex md:flex grid grid-cols-2 lg:gap-3 gap-2  '>

          <div className=' w-full lg:h-[200px] md:h-[150px] h-[100px] bg-[#ffe2e6] lg:p-8 md:p-6 p-2 lg:pl-6  md:pl-4 pl-2 rounded-xl space-y-1'>
            <div className=' bg-[#fa5a7e] rounded-full lg:w-[50px] w-[30px]  lg:h-[50px] h-[30px] flex justify-center items-center'>
              <IoIosBookmarks className='lg:text-2xl md:text-xl text-white' />
            </div>
            <h1 className='lg:text-2xl  text-xl font-bold dark:text-black'>{12}</h1>
            <p className='text-gray-500 lg:font-bold md:font-medium'>Today&lsquo; Booking</p>
          </div>

          <div className=' w-full lg:h-[200px] md:h-[150px] h-[100px] bg-[#fff4de] lg:p-8 md:p-6 p-2 lg:pl-6  md:pl-4 pl-2 rounded-xl space-y-1'>
            <div className=' bg-[#fe947a] rounded-full lg:w-[50px] w-[30px]  lg:h-[50px] h-[30px] flex justify-center items-center'>
              <RiEBikeLine className='lg:text-2xl md:text-xl text-white' />
            </div>
            <h1 className='lg:text-2xl text-xl font-bold dark:text-black'>{4}</h1>
            <p className='text-gray-500 lg:font-bold md:font-medium'>Total Bikes</p>
          </div>

          <div className=' w-full lg:h-[200px] md:h-[150px] h-[100px] bg-[#dcfce7] lg:p-8 md:p-6 p-2 lg:pl-6  md:pl-4 pl-2 rounded-xl space-y-1'>
            <div className=' bg-[#3cd757] rounded-full lg:w-[50px] w-[30px]  lg:h-[50px] h-[30px] flex justify-center items-center'>
              <MdOutlinePendingActions className='lg:text-2xl md:text-xl text-white' />
            </div>
            <h1 className='lg:text-2xl text-xl font-bold dark:text-black'>{25}</h1>
            <p className='text-gray-500 lg:font-bold md:font-medium'>Bike On The Go</p>
          </div>

          <div className='w-full lg:h-[200px] md:h-[150px] h-[100px] bg-[#f4e8ff] lg:p-8 md:p-6 p-2 lg:pl-6  md:pl-4 pl-2 rounded-xl space-y-1'>
            <div className=' bg-[#bf83ff] rounded-full lg:w-[50px] w-[30px]  lg:h-[50px] h-[30px] flex justify-center items-center'>
              <FaUserFriends className='lg:text-2xl md:text-xl text-white' />
            </div>
            <h1 className='lg:text-2xl text-xl font-bold dark:text-black'>{50}</h1>
            <p className='text-gray-500 lg:font-bold md:font-medium'>Total Users</p>
          </div>

        </div>
      </div>
      <div className="lg:col-span-4 col-span-12">
        <TopUsers />
      </div>



    </div>
  );
}
