import React from 'react';

const loading = () => {
    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <img
                src="https://media.giphy.com/media/WFZvB7VIXBgiz3oDXE/giphy.gif" // Replace with your bike GIF link if needed
                alt="E-Bike Animation"
                className="w-64 h-64"
            />
            <h1 className='md:text-6xl text-3xl'>Loading............</h1>
        </div>
    );
};

export default loading;