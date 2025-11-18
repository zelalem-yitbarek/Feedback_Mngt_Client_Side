"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function FeedbackFormPage() {
  const [activeTab, setActiveTab] = useState<"org" | "emp">("org");

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 md:p-10">

          {/* TOP TABS */}
          <div className="flex justify-center space-x-14 border-b pb-3">
            <button
              onClick={() => setActiveTab("org")}
              className={`text-lg font-semibold pb-2 ${
                activeTab === "org"
                  ? "text-black border-b-4 border-[#C07D27]"
                  : "text-gray-600"
              }`}
            >
              Organization
            </button>

            <button
              onClick={() => setActiveTab("emp")}
              className={`text-lg font-semibold pb-2 ${
                activeTab === "emp"
                  ? "text-black border-b-4 border-[#C07D27]"
                  : "text-gray-600"
              }`}
            >
              Employee
            </button>
          </div>

          {/* FORM CONTENT */}
          {activeTab === "org" ? <OrganizationForm /> : <EmployeeForm />}
        </div>
      </div>

      <Footer />
    </>
  );
}

/* ---------------------------------------------------------
   ORGANIZATION FORM
--------------------------------------------------------- */
function OrganizationForm() {
  return (
    <form className="mt-6 space-y-6">

      {/* ORGANIZATION NAME */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Organization name
        </label>
        <input
          type="text"
          placeholder="Type organization name"
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* DATE + TYPE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Select Date</label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option>Date</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Type</label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option>Comment</option>
          </select>
        </div>
      </div>

      {/* SEVERITY */}
      <div>
        <label className="block text-sm font-medium mb-1">Severity Issue</label>
        <div className="flex flex-wrap gap-4 text-sm">
          <Checkbox label="Minor" />
          <Checkbox label="Moderate" />
          <Checkbox label="Major" />
          <Checkbox label="Critical" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium mb-1">Describe issue</label>
        <textarea
          rows={4}
          placeholder="Type here..."
          className="w-full border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* RATING */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Rate the service here please
        </label>
        <div className="flex flex-wrap gap-3 text-sm">
          {["5 star", "4 star", "3 star", "2 star", "1 star"].map((item) => (
            <Checkbox key={item} label={item} />
          ))}
        </div>
      </div>

      {/* CONTACT PREFERENCE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Preferred Contact Method
        </label>
        <div className="flex gap-4 text-sm">
          <Checkbox label="By Phone" />
          <Checkbox label="By Email" />
        </div>
      </div>

      {/* UPLOAD PROOF */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload any Proof</label>
        <div className="border border-dashed rounded-xl py-10 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 opacity-60">
              <Image src="/upload-icon.png" width={40} height={40} alt="Upload" />
            </div>
            <p className="text-sm text-gray-600">Capture the image</p>
            <button className="bg-[#C07D27] text-white text-sm px-4 py-2 rounded-md">
              Upload an image
            </button>
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button className="bg-[#C07D27] text-white px-6 py-2 rounded-md">
          Submit
        </button>
      </div>
    </form>
  );
}

/* ---------------------------------------------------------
   EMPLOYEE FORM (MATCHES YOUR UPLOADED DESIGN)
--------------------------------------------------------- */
function EmployeeForm() {
  return (
    <form className="mt-6 space-y-6">

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Employee Name" placeholder="Employee Name" />
        <Input label="Job Position" placeholder="Job Position" />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Organization Name" placeholder="Organization Name" />
        <Input label="Branch" placeholder="Branch" />
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Position" option="Select Branch" />
        <Select label="Type" option="Comment" />
      </div>

      {/* ROW 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Position" option="Select Branch" />
        <Select label="Type" option="Comment" />
      </div>

      {/* ROW 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Date of Issue" option="Select Date" />

        <div>
          <label className="block text-sm font-medium mb-1">Severity Issue</label>
          <div className="flex flex-wrap gap-4 text-sm">
            <Checkbox label="Minor" />
            <Checkbox label="Moderate" />
            <Checkbox label="Major" />
            <Checkbox label="Critical" />
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-medium mb-1">Describe issue</label>

        <div className="relative">
          <textarea
            rows={4}
            placeholder="Type here..."
            className="w-full border rounded-md px-3 py-2 pr-10 text-sm"
          />
          <div className="absolute bottom-2 right-3 opacity-40">
            <Image src="/mic-icon.png" width={20} height={20} alt="Mic" />
          </div>
        </div>
      </div>

      {/* STAR RATING */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Rate the service here please
        </label>
        <div className="flex flex-wrap gap-3 text-sm">
          {["5 star", "4 star", "3 star", "2 star", "1 star"].map((item) => (
            <Checkbox key={item} label={item} />
          ))}
        </div>
      </div>

      {/* CONTACT METHOD */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Preferred Contact Method
        </label>
        <div className="flex gap-4 text-sm">
          <Checkbox label="By Phone" />
          <Checkbox label="By Email" />
        </div>
      </div>

      {/* UPLOAD PROOF */}
      <div>
        <label className="block text-sm font-medium mb-1">Upload any Proof</label>
        <div className="border border-dashed rounded-xl py-10 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 opacity-60">
              <Image src="/upload-icon.png" width={40} height={40} alt="Upload" />
            </div>
            <p className="text-sm text-gray-600">Capture the image</p>
            <button className="bg-[#C07D27] text-white text-sm px-4 py-2 rounded-md">
              Upload an image
            </button>
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end">
        <button className="bg-[#C07D27] text-white px-6 py-2 rounded-md">
          Submit
        </button>
      </div>

    </form>
  );
}

/* ---------------------------------------------------------
   REUSABLE INPUT / SELECT / CHECKBOX COMPONENTS
--------------------------------------------------------- */
function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

function Select({ label, option }: { label: string; option: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select className="w-full border rounded-md px-3 py-2 text-sm">
        <option>{option}</option>
      </select>
    </div>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-1 cursor-pointer">
      <input type="checkbox" className="w-4 h-4" />
      {label}
    </label>
  );
}
