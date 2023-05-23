"use client";

import { useState } from "react";

export default function MyPage() {
  const [isTicketManager, setIsTicketManager] = useState(true);
  const [hasTicket, setHasTicket] = useState(true);

  return (
    <div className="flex flex-col items-center max-w-6xl w-full px-28 mx-auto py-5">
      {isTicketManager ? (
        <>
          <p className="font-bold text-xl text-main-purple self-start">
            Ticket Management
          </p>
          <div className="bg-gray-50 rounded-xl m-5 p-3 drop-shadow-md w-5/6 h-40 flex flex-col items-center justify-center">
            <p>concert name</p>
            <p>concert date</p>
            <p>concert price</p>
            <button className=" bg-yellow-200">Start selling</button>
          </div>
        </>
      ) : (
        <></>
      )}

      <p className="font-bold text-xl self-start">My Tickets</p>
      {hasTicket ? (
        <div className="bg-gray-50 rounded-xl m-5 p-3 drop-shadow-md w-5/6 h-40 flex flex-col items-center justify-center">
          <p>concert name</p>
          <p>concert date</p>
          <p>concert price</p>
        </div>
      ) : (
        <p className="text-gray-300 font-black text-2xl py-10">
          No tickets available
        </p>
      )}
    </div>
  );
}
