"use client";

import { Dispatch, SetStateAction } from "react";

import { ChevronRight } from "lucide-react";


export default function Sidebar({
  tabs,
  activeTab,
  setActiveTab
}: {
  tabs: string[],
  activeTab: string,
  setActiveTab: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="m-4 rounded-lg overflow-hidden border">
      {
        tabs.map((each_tab: string, idx: number) => {
          return (
            <div key={idx}
              className={`flex justify-between px-3 py-2 hover:bg-[#999]/30 cursor-pointer ${activeTab === each_tab && "bg-[#999]/30"} ${idx !== 2 && "border-b"}`}
              onClick={() => setActiveTab(each_tab)}
            >
              {each_tab}
              <ChevronRight className="h-5" />
            </div>
          )
        })
      }
    </div>
  );
}
