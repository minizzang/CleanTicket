"use client";

import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAccount, useWalletClient, useBalance } from "wagmi";
import { writeContract } from "@wagmi/core";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "../../lib/TicketNFTFactory";
import pinata from "../pinata";
import WalletConnectInfo from "../WalletConnectInfo";

export default function Register() {
  const { isConnected, address } = useAccount();
  const [connected, setConnected] = useState(null);

  const [isManagerRegModalOpen, setIsManagerRegModalOpen] = useState(false);
  const [isTicketRegModalOpen, setIsTicketRegModalOpen] = useState(false);
  const [isTicketManager, setIsTicketManager] = useState(undefined);

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [btnActive, setBtnActive] = useState(false);

  const [evTitle, setEvTitle] = useState("");
  const [evCategory, setEvCategory] = useState("");
  const [evDate, setEvDate] = useState("");
  const [evTime, setEvTime] = useState("");
  const [evVenue, setEvVenue] = useState("");
  const [evAmount, setEvAmount] = useState(1);
  const [evPrice, setEvPrice] = useState(0);
  const [evImageURL, setEvImageURL] = useState("");

  const [btnActiveManager, setBtnActiveManager] = useState(false);

  const router = useRouter();

  const checkIsManager = async () => {
    await axios.get(`/register/${address}`).then((res) => {
      if (
        res.data.checkIsManager != null &&
        res.data.checkIsManager.isAccepted
      ) {
        setIsTicketManager(true);
      } else {
        setIsTicketManager(false);
      }
    });
  };

  const requestAsManager = async () => {
    const data = {
      wallet: address,
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

  // Create TicketNFT contract
  const requestTicketCreation = async () => {
    // ERC-721 metadata json form
    const metadata = {
      name: evTitle, // concertName
      description: evTitle, // description
      image: evImageURL, // URI of imagefile - How to get image uri?~?
      attributes: [
        {
          trait_type: "concertName",
          value: evTitle,
        },
        {
          trait_type: "concertDate",
          value: evDate,
        },
        {
          trait_type: "startTime",
          value: evTime,
        },
        {
          trait_type: "maxTicketCount",
          value: evAmount,
        },
        {
          trait_type: "ticketPrice",
          value: parseInt(evPrice),
        },
        {
          trait_type: "category",
          value: evCategory,
        },
        {
          trait_type: "location",
          value: evVenue,
        },
      ],
    };

    // Optional pinata metadata
    const options = {
      pinataMetadata: {
        name: metadata.name,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };

    const pinataResponse = await pinata.pinJSONToIPFS(metadata, options);
    const tokenURI = `https://gateway.pinata.cloud/ipfs/${pinataResponse.IpfsHash}`;
    await writeContract({
      address: TicketNFTFactoryAddress,
      abi: TicketNFTFactoryAbi,
      functionName: "createTicketNFT",
      args: [
        metadata.name,
        metadata.attributes[3].value,
        metadata.attributes[4].value,
        tokenURI,
      ],
    }).then(() => {
      setIsTicketRegModalOpen(true);
    });
  };

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    checkIsManager();
    setBtnActive(companyName != "" && contactName != "" && phoneNum != "");
    setBtnActiveManager(
      evTitle != "" &&
        evCategory != "" &&
        evDate != "" &&
        evTime != "" &&
        evVenue != "" &&
        evAmount != "" &&
        evPrice != "" &&
        evAmount >= 1 &&
        evPrice >= 0
    );
  }, [
    companyName,
    contactName,
    phoneNum,
    evTitle,
    evCategory,
    evDate,
    evTime,
    evVenue,
    evAmount,
    evPrice,
  ]);

  if (connected == false) return <WalletConnectInfo />;
  else if (connected == true)
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
                <h1 className="mb-5 text-center">
                  Please enter information
                  <br />
                  about the ticket you want to sell.
                </h1>

                <div className="flex flex-row mb-3">
                  <ul className="mr-5">
                    <li className="mb-3 pb-2">Event title</li>
                    <li className="mb-3 pb-2">Category</li>
                    <li className="mb-3 pb-2">Date</li>
                    <li className="mb-3 pb-2">Time</li>
                    <li className="mb-3 pb-2">Venue</li>
                    <li className="mb-3 pb-2">Ticket Amounts</li>
                    <li className="mb-3 pb-2">Price</li>
                    <li className="mb-3 pb-2">
                      Poster Image
                      <br />
                      (optional, url)
                    </li>
                  </ul>
                  <ul>
                    <li className="mb-3 pb-2 border-b-[1px] border-black flex">
                      <input
                        className="grow"
                        value={evTitle}
                        onChange={(e) => setEvTitle(e.target.value)}
                      />
                    </li>
                    <li
                      className="mb-3 pb-2 flex"
                      value={evCategory}
                      onChange={(e) => setEvCategory(e.target.value)}
                    >
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
                    <li className="mb-3">
                      <input
                        type="date"
                        value={evDate}
                        onChange={(e) => {
                          setEvDate(e.target.value);
                          console.log(evDate.type);
                        }}
                      />
                    </li>
                    <li className="mb-3 pt-2">
                      <input
                        type="time"
                        value={evTime}
                        onChange={(e) => {
                          setEvTime(e.target.value);
                          console.log(evTime);
                        }}
                      />
                    </li>
                    <li className="mb-3 pb-2 border-b-[1px] border-black flex">
                      <input
                        className="grow"
                        value={evVenue}
                        onChange={(e) => setEvVenue(e.target.value)}
                      />
                    </li>
                    <li className="mb-3 flex flex-row pb-2 border-b-[1px] border-black">
                      <input
                        type="number"
                        className="mr-2 flex grow text-right"
                        value={evAmount}
                        onChange={(e) => setEvAmount(e.target.value)}
                        min={1}
                      />
                      <p>tickets</p>
                    </li>
                    <li className="mb-3 flex flex-row pb-2 border-b-[1px] border-black">
                      <input
                        type="number"
                        className="mr-2 flex grow text-right"
                        value={evPrice}
                        onChange={(e) => setEvPrice(e.target.value)}
                        min={0}
                      />
                      <p> =&gt; {evPrice / 1000} eth</p>
                    </li>
                    <li className="mb-3 pb-2 pt-4 flex border-b-[1px] border-black">
                      <input
                        className="mr-2 flex grow"
                        type="url"
                        onChange={(e) => setEvImageURL(e.target.value)}
                      />
                    </li>
                  </ul>
                </div>
                <button
                  disabled={!btnActiveManager}
                  onClick={() => {
                    requestTicketCreation();
                  }}
                  className={[
                    ` text-white w-full h-12 rounded-full font-bold ${
                      btnActiveManager
                        ? "bg-main-purple hover:bg-dark-purple"
                        : "bg-gray-400"
                    }`,
                  ]}
                >
                  Registration Request
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
