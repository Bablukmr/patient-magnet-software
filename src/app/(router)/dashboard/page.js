import { ChevronUp, IndianRupee, MoveUp, Wallet } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <div className="p-4 flex items-center gap-4">
      <div className="h-36 w-44 p-5 bg-white rounded-md shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Wallet className="text-blue-500" />
          <h2 className="text-lg font-medium text-slate-800">Earning</h2>
        </div>
        <div className="flex items-center">
          <IndianRupee />
          <h2 className="text-lg font-medium text-slate-800">4444</h2>
        </div>
        <div className="flex items-center gap-4">
          Today{" "}
          <div className="flex items-center text-green-700">
          <MoveUp  className=""/>
            <p>144</p>
          </div>
        </div>
      </div>
      <div className="h-36 w-44 p-5 bg-white rounded-md shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Wallet className="text-blue-500" />
          <h2 className="text-lg font-medium text-slate-800">Earning</h2>
        </div>
        <div className="flex items-center">
          <IndianRupee />
          <h2 className="text-lg font-medium text-slate-800">4444</h2>
        </div>
      </div>
      <div className="h-36 w-44 p-5 bg-white rounded-md shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Wallet className="text-blue-500" />
          <h2 className="text-lg font-medium text-slate-800">Earning</h2>
        </div>
        <div className="flex items-center">
          <IndianRupee />
          <h2 className="text-lg font-medium text-slate-800">4444</h2>
        </div>
      </div>
      <div className="h-36 w-44 p-5 bg-white rounded-md shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Wallet className="text-blue-500" />
          <h2 className="text-lg font-medium text-slate-800">Earning</h2>
        </div>
        <div className="flex items-center">
          <IndianRupee />
          <h2 className="text-lg font-medium text-slate-800">4444</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
