"use client"
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email via EmailJS
    emailjs
      .sendForm(
        'your_service_id', // Replace with your EmailJS service ID
        'your_template_id', // Replace with your EmailJS template ID
        e.target,
        'your_user_id' // Replace with your EmailJS user ID (public key)
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.log('Error sending email:', error);
          alert('Failed to send the message.');
        }
      );

    // Reset form after submit
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10 px-4 lg:px-20">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Contact Us</h1>

        {/* Bike GIF Section */}
        <div className="flex justify-center mb-10">
          <img
            src="https://media.giphy.com/media/WFZvB7VIXBgiz3oDXE/giphy.gif" // Replace with your bike GIF link if needed
            alt="E-Bike Animation"
            className="w-64 h-64"
          />
        </div>

        <p className="text-lg text-gray-600 text-center mb-8">
          Have questions about our E-Bikes? Were here to help! Contact us for product inquiries, technical support, or partnership opportunities.
        </p>

        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-lg p-6 lg:w-2/3 mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email address"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Type your message here"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>

        {/* Additional Contact Information */}
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
          <p className="text-gray-600 mt-2">
            Phone: <a href="tel:+880123456789" className="text-blue-600">+880123456789</a>
          </p>
          <p className="text-gray-600">
            Email: <a href="mailto:info@ebike.com" className="text-blue-600">info@ebike.com</a>
          </p>
          <p className="text-gray-600">
            Address: 123 E-Bike Lane, Sylhet, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
