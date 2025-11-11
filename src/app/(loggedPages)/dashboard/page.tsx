"use client";

import { useState } from "react";
import HeaderCard from "@/components/HeaderCard";

export default function Dashboard() {
  // Placeholder user data - this would come from your authentication system
  const [user] = useState({
    name: "Dr. Jane Smith",
    role: "Physician",
    department: "Cardiology",
  });

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard welcome card */}
        <HeaderCard
          mainTitle="Welcome to Alexandria Dashboard"
          subTitle="This is your main view, where you can manage your schedule, appointments and find statistics about your consultations"
        />
        {/* Quick actions card */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="mt-4 space-y-2">
              <button className="w-full px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700">
                New Patient
              </button>
              <button className="w-full px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Schedule Appointment
              </button>
              <button className="w-full px-4 py-2 text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700">
                View Patient Records
              </button>
            </div>
          </div>
        </div>

        {/* Statistics card */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Today&apos;s Statistics
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Appointments
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">
                  12
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  New Patients
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">3</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pending Reports
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-blue-600">5</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Recent activity card */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
            <div className="mt-4 flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  {
                    id: 1,
                    patient: "John Doe",
                    action: "Medical checkup",
                    time: "10:30 AM",
                  },
                  {
                    id: 2,
                    patient: "Jane Smith",
                    action: "Lab results review",
                    time: "11:45 AM",
                  },
                  {
                    id: 3,
                    patient: "Robert Johnson",
                    action: "Prescription renewal",
                    time: "2:15 PM",
                  },
                  {
                    id: 4,
                    patient: "Emily Davis",
                    action: "New appointment",
                    time: "3:30 PM",
                  },
                ].map((item) => (
                  <li key={item.id} className="py-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.patient}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {item.action}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                        {item.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
