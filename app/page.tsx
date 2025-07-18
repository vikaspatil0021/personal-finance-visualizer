"use client"

import { useState } from "react"

import Sidebar from "@/components/sidebar";
import TransactionForm from "@/components/transaction-form";
import TransanctionTable from "@/components/transaction-table";

import MonthlyBarChart from "@/components/monthly-bar-chart";


const tabs = [
  "New transaction",
  "View transaction",
  "Dashboard (charts)"
];

export default function Home() {

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-10 relative mx-auto max-w-6xl ">
        <div className="md:col-span-1 h-fit bg-white rounded-lg">
          <Sidebar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="md:col-span-2">
          {activeTab === tabs[0] &&
            <TransactionForm
              type="new"
            />}

          {activeTab === tabs[1] &&
            <TransanctionTable />}

          {
            activeTab === tabs[2] &&
            <MonthlyBarChart />
          }
        </div>
      </div >
    </>
  )
}
