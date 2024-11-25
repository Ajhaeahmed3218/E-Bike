import { RiEBikeLine } from "react-icons/ri";
import { IoIosBookmarks } from "react-icons/io";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import TopUsers from "@/components/TopUsers";
export default function Home() {
  return (
    <div className=' grid grid-cols-12 gap-4 justify-center '>
      <div className='rounded-xl dark:bg-[#1a1a1a] bg-white pt-3 pb-4 px-4 lg:col-span-8 col-span-12 h-[310px]'>
        <div className='my-2 mb-4'>
          <h1 className='text-2xl font-bold '>Website Overview</h1>
          <p>Update Summery</p>
        </div>
        <div className='lg:flex md:flex grid grid-cols-2 lg:gap-3 gap-2  '>

          <div className=' w-full lg:h-[200px] md:h-[150px] h-[100px] bg-[#ffe2e6] lg:p-8 md:p-6 p-2 lg:pl-6  md:pl-4 pl-2 rounded-xl space-y-1'>
            <div className=' bg-[#fa5a7e] rounded-full lg:w-[50px] w-[30px]  lg:h-[50px] h-[30px] flex justify-center items-center'>
              <IoIosBookmarks className='lg:text-2xl md:text-xl text-white' />
            </div>
            <h1 className='lg:text-2xl  text-xl font-bold dark:text-black'>{12}</h1>
            <p className='text-gray-500 lg:font-bold md:font-medium'>Today's Booking</p>
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
