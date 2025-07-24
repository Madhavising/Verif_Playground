// src/pages/DemoRequestPage.jsx
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { baseUrl } from "../api"; // baseUrl = http://localhost:5000

const DemoRequestPage = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !company) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const fullName = `${firstName} ${
      middleName ? middleName + " " : ""
    }${lastName}`;
    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim(),
      demoDetails: message.trim(),
    };

    try {
      const response = await fetch(`${baseUrl}/api/request-demo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      toast.success("Demo request submitted!");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <Toaster position="top-right" />
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-2xl rounded-3xl p-10 space-y-6">
        {isSubmitted ? (
          <div className="text-center py-16 px-6 bg-white rounded-3xl shadow-xl border border-gray-200 space-y-6 animate-fadeIn">
            <div className="flex justify-center">
              <div className="bg-green-100 text-green-600 rounded-full p-4">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-semibold text-gray-800">
              Thank you for your submission
            </h2>

            <p className="text-gray-600 text-base max-w-xl mx-auto">
              Your demo request has been received. Our team will review your
              details and reach out to schedule your personalized session.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold text-gray-800">
                Request a Demo
              </h2>
              <p className="text-gray-600">
                Select a feature and share your details — we’ll schedule a
                personalized demo for you.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                  <input
                    type="text"
                    placeholder="Middle Name (Optional)"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  placeholder="+91-1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company / Project *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What would you like to see in the demo?
                </label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  placeholder="Share your use case or expectations..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default DemoRequestPage;
