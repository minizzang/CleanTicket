"use client";

import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register() {
  const [isManagerRegModalOpen, setIsManagerRegModalOpen] = useState(false);
  const [isTicketRegModalOpen, setIsTicketRegModalOpen] = useState(false);
  const [isTicketManager, setIsTicketManager] = useState(undefined);

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [btnActive, setBtnActive] = useState(false);

  const router = useRouter();
  const tempWallet = "test";

  const checkIsManager = async () => {
    await axios.get(`/register/${tempWallet}`).then((res) => {
      if (res.data.checkIsManager.isAccepted) {
        setIsTicketManager(true);
      } else {
        setIsTicketManager(false);
      }
    });
  };

  const requestAsManager = async () => {
    const data = {
      wallet: Math.random().toString(), // TODO. wallet 주소 자동으로 받는 법
      name: contactName,
      company: companyName,
      phone: phoneNum,
    };
    await axios
      .post("/register/route", {
        data,
      })
      .then((res) => {
        console.log("requestAsManager", res);
      })
      .catch((err) => console.log("errororo")); // TODO. 이미 등록된 주소면 alert
  };

  useEffect(() => {
    checkIsManager();
    setBtnActive(companyName != "" && contactName != "" && phoneNum != "");
  }, [companyName, contactName, phoneNum]);

  return (
    <>
      {isTicketManager != undefined && (
        <>
          {!isTicketManager ? (
            <div className="flex flex-col items-center mt-10 w-[30%]">
              <p className="font-bold text-xl mb-5">
                Ticket Manager registration
              </p>
              <h1>If you want to sell tickets,</h1>
              <div className="flex flex-row">
                <h1 className="font-bold">Ticket Manager&nbsp;</h1>
                <h1 className="mb-10">registration is required</h1>
              </div>

              <div className="flex flex-row mb-10 w-full">
                <ul className="mr-5 w-full">
                  <li className="mb-3 pb-2 border-b-[1px] border-black flex">
                    Company name
                    <input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="ml-4 grow"
                    />
                  </li>
                  <li className="mb-3 pb-2 border-b-[1px] border-black flex">
                    Contact name
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="ml-4 grow"
                    />
                  </li>
                  <li className="mb-3 pb-2 border-b-[1px] border-black flex">
                    Cell phone
                    <input
                      type="tel"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      placeholder="010 1234 5678"
                      className="ml-4 grow"
                    />
                  </li>
                </ul>
              </div>

              <button
                disabled={!btnActive}
                onClick={() => {
                  setIsManagerRegModalOpen(true);
                  requestAsManager();
                }}
                className={[
                  ` text-white w-full h-12 rounded-full font-bold ${
                    btnActive
                      ? "bg-main-purple hover:bg-dark-purple"
                      : "bg-gray-400"
                  }`,
                ]}
              >
                Registration Request
              </button>

              <ReactModal
                isOpen={isManagerRegModalOpen}
                ariaHideApp={false}
                style={{
                  content: {
                    top: "35%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30%",
                    height: "35%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  },
                }}
              >
                <p>
                  Your ticket manager registration
                  <br />
                  has been completed.
                </p>
                <p>It will be approved after review.</p>

                <button
                  className="bg-main-purple hover:bg-dark-purple rounded-full text-white w-4/5 h-12 font-bold mt-10"
                  onClick={() => setIsManagerRegModalOpen(false)}
                >
                  Confirm
                </button>
              </ReactModal>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-10">
              <p className="font-bold text-xl mb-5">Ticket registration</p>
              <h1 className="mb-10 text-center">
                Please enter information
                <br />
                about the ticket you want to sell.
              </h1>

              <div className="flex flex-row mb-10">
                <ul className="mr-5">
                  <li className="mb-3">Event title</li>
                  <li className="mb-3">Category</li>
                  <li className="mb-3">Date</li>
                  <li className="mb-3">Time</li>
                  <li className="mb-3">Venue</li>
                  <li className="mb-3">Run time</li>
                  <li className="mb-3">Price</li>
                  <li className="mb-3">
                    Poster Image
                    <br />
                    (optional)
                  </li>
                </ul>
                <ul>
                  <li className="mb-3">
                    <input />
                  </li>
                  <li className="mb-3">
                    <input
                      type="radio"
                      name="category"
                      id="musical"
                      value="musical"
                      className="mr-1"
                    />
                    <label htmlFor="musical" className="mr-3">
                      Musical
                    </label>
                    <input
                      type="radio"
                      name="category"
                      id="concert"
                      value="concert"
                      className="mr-1"
                    />
                    <label htmlFor="concert" className="mr-3">
                      Concert
                    </label>
                    <input
                      type="radio"
                      name="category"
                      id="play"
                      value="play"
                      className="mr-1"
                    />
                    <label htmlFor="play" className="mr-3">
                      Play
                    </label>
                    <input
                      type="radio"
                      name="category"
                      id="sports"
                      value="sports"
                      className="mr-1"
                    />
                    <label htmlFor="sports" className="mr-3">
                      Sports
                    </label>
                    <input
                      type="radio"
                      name="category"
                      id="exhibitions"
                      value="exhibitions"
                      className="mr-1"
                    />
                    <label htmlFor="exhibitions" className="mr-3">
                      Exhibitions
                    </label>
                  </li>
                  <li className="mb-3 flex flex-row">
                    <p className="mr-2">from</p>
                    <input type="date" className="mr-4" />
                    <p className="mr-2">to</p>
                    <input type="date" />
                  </li>
                  <li className="mb-3">
                    <input type="time" />
                  </li>
                  <li className="mb-3">
                    <input />
                  </li>
                  <li className="mb-3 flex flex-row">
                    <input type="number" className="mr-2" />
                    <p>minutes</p>
                  </li>
                  <li className="mb-3 flex flex-row">
                    <input type="number" className="mr-2" />
                    <p>won</p>
                  </li>
                  <li className="mb-3">
                    <input type="file" accept="image/*" />
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setIsTicketRegModalOpen(true)}
                className="bg-main-purple text-white w-full h-12 rounded-full font-bold hover:bg-dark-purple"
              >
                Registraion Request
              </button>

              <ReactModal
                isOpen={isTicketRegModalOpen}
                ariaHideApp={false}
                style={{
                  content: {
                    top: "35%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "30%",
                    height: "35%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  },
                }}
              >
                <p>
                  Your ticket registration
                  <br />
                  has been completed.
                </p>
                <p>You can manage ticket sales in MyPage!</p>

                <button
                  className="bg-main-purple hover:bg-dark-purple rounded-full text-white w-4/5 h-12 font-bold mt-10"
                  onClick={() => {
                    setIsTicketRegModalOpen(false);
                    router.push("/mypage");
                  }}
                >
                  Go to MyPage
                </button>
              </ReactModal>
            </div>
          )}
        </>
      )}
    </>
  );
}
