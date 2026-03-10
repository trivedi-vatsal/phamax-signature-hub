import React from 'react';
import type { SignatureData } from '../types';
import { Eraser, RefreshCw } from 'lucide-react';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
  onClear: () => void;
  onLoadDefaults: () => void;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({ data, onChange, onClear, onLoadDefaults }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const inputClasses = "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 w-full mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium flex items-center text-gray-800">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          Signature Details
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onLoadDefaults}
            className="flex items-center justify-center p-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
            title="Load Default Placeholder Data"
          >
            <RefreshCw size={16} className="mr-1.5" />
            Load Defaults
          </button>
          <button
            onClick={onClear}
            className="flex items-center justify-center p-2 text-sm bg-white border border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-gray-700 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            title="Clear All Fields"
          >
            <Eraser size={16} className="mr-1.5" />
            Clear All
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Signature Template Region</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="templateType" 
              value="India" 
              checked={data.templateType === "India"} 
              onChange={handleChange} 
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-sm text-gray-700">India (Bengaluru)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="radio" 
              name="templateType" 
              value="International" 
              checked={data.templateType === "International"} 
              onChange={handleChange} 
              className="text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <span className="text-sm text-gray-700">International (Swiss)</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClasses}>Full Name <span className="text-red-500 ml-0.5">*</span></label>
          <input type="text" name="fullName" value={data.fullName} onChange={handleChange} className={inputClasses} placeholder="John Doe" required />
        </div>
        <div>
          <label className={labelClasses}>Designation <span className="text-red-500 ml-0.5">*</span></label>
          <input type="text" name="designation" value={data.designation} onChange={handleChange} className={inputClasses} placeholder="Software Engineer" required />
        </div>
        <div>
          <label className={labelClasses}>Email <span className="text-red-500 ml-0.5">*</span></label>
          <input type="email" name="email" value={data.email} onChange={handleChange} className={inputClasses} placeholder="john@example.com" required />
        </div>
        {data.templateType === "International" && (
          <div>
            <label className={labelClasses}>Phone <span className="text-red-500 ml-0.5">*</span></label>
            <input type="text" name="phone" value={data.phone} onChange={handleChange} className={inputClasses} placeholder="+41 - (0) 41 710 2092" required />
          </div>
        )}
        <div>
          <label className={labelClasses}>Mobile <span className="text-red-500 ml-0.5">*</span></label>
          <input type="text" name="mobile" value={data.mobile} onChange={handleChange} className={inputClasses} placeholder="+1 234 567 890" required />
        </div>
        <div>
          <label className={labelClasses}>Teams Email / Link <span className="text-red-500 ml-0.5">*</span></label>
          <input type="text" name="teams" value={data.teams} onChange={handleChange} className={inputClasses} placeholder="john.doe@company.com" required />
        </div>
      </div>
    </div>
  );
}
