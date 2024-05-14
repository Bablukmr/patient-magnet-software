"use client"
import {
  LayoutDashboard,
  LogOut,
  Receipt,
  Settings,
  Stethoscope,
  TicketPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'


function SideNav() {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();
console.log(activeIndex);
  const menue = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutDashboard,
      route: "/dashboard",
    },
    {
      id: 2,
      name: "Appointment",
      icon: TicketPlus,
      route: "/appointment",
    },
    {
      id: 3,
      name: "Doctor",
      icon: Stethoscope,
      route: "/doctor",
    },
    {
      id: 4,
      name: "Billing",
      icon: Receipt,
      route: "/billing",
    },
    {
      id: 5,
      name: "Setting",
      icon: Settings,
      route: "/setting",
    },
    {
      id: 6,
      name: "Patient",
      icon: Users,
      route: "/patient",
    },
    {
      id: 7,
      name: "Logout",
      icon: LogOut,
      route: "/logout",
    },
  ];

  const handleClick = (index, route) => {
    setActiveIndex(index);
    router.push(route);
  };

  return (
    <div className="p-5 bg-white shadow-sm h-screen">
      <div>
        <Image src={"/Nextmeds1.png"} alt="Logo" width={170} height={80} />
      </div>
      <hr className="mt-7"></hr>
      <div className="mt-8">
        {menue.map((val, index) => (
          <div
            key={index}
            onClick={() => handleClick(index, val.route)}
            className={`group flex items-center mt-1 gap-3 p-3 text-[18px] text-gray-500 cursor-pointer
              hover:bg-primary hover:text-white rounded-md
              transition-all ease-in-out duration-200 ${
                activeIndex === index ? "bg-primary text-white" : ""
              }`}
          >
            <val.icon className="group-hover:animate-bounce" />
            <h2>{val.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
