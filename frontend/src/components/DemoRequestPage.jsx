import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const features = [
  'Register Definition & Conversion',
  'Smarter Test Planning',
  'Smart Design Document',
  'Python-Based AI API',
  'ASIC Regression Data Management',
];

const DemoRequestPage = () => {
  const [selectedFeature, setSelectedFeature] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !selectedFeature) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success('Demo request submitted!');
      setSelectedFeature('');
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      setFile(null);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="h-screen w-full bg-white overflow-hidden flex items-center justify-center px-4 py-6">

      <Toaster position="top-right" />
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl rounded-3xl p-8 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Request a Demo</h2>
        <p className="text-gray-600">
          Select a Verif Playground feature and tell us about your interest. We’ll schedule a personalized demo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Feature Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Feature *</label>
            <select
              value={selectedFeature}
              onChange={(e) => setSelectedFeature(e.target.value)}
              required
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a feature --</option>
              {features.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Company / Project (optional)</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">What would you like to see in the demo?</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Share your use case or any specific expectations..."
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Attach a sample spec (optional)</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
            {file && <p className="text-sm text-gray-500 mt-1">Selected: {file.name}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending Request...' : 'Submit Demo Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemoRequestPage;
