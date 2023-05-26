import { readContract } from "@wagmi/core";
import {
  TicketNFTFactoryAbi,
  TicketNFTFactoryAddress,
} from "@/lib/TicketNFTFactory";
import { TicketNFTAbi } from "@/lib/TicketNFT";

// Get all concerts
export async function wGetAllConcertInfo() {
  // if (!isConnected) return;
  const res = await readContract({
    address: TicketNFTFactoryAddress,
    abi: TicketNFTFactoryAbi,
    functionName: "getConcertInfo",
  });
  return wConvertConcerObj(res);
}

// Get certain concert
export async function wGetOneConcertInfo(contractAddr) {
  const allConcerts = await wGetAllConcertInfo();
  return allConcerts.find((data) => data.addr == contractAddr);
}

// For manager, get hosting concerts
export async function wGetMyConcertInfo(userAddr) {
  const allConcerts = await wGetAllConcertInfo();
  return allConcerts.filter((data) => data.owner == userAddr);
}

// For user, get own tickets
export async function wGetMyTickets(userAddr) {
  const allConcerts = await wGetAllConcertInfo();
  let myTickets = [];
  await Promise.all(
    allConcerts.map(
      async (data) =>
        await readContract({
          address: data.addr,
          abi: TicketNFTAbi,
          functionName: "balanceOf",
          args: [userAddr],
        }).then((token) => {
          let tokenId = token.toString();
          if (tokenId != 0) {
            myTickets.push({ tokenId, ...data });
          }
        })
    )
  );
  return myTickets;
}

// Convert concert addr to event object
export async function wConvertConcerObj(res) {
  const eventList = [];

  for (var i = 0; i < res.length; i++) {
    var obj = res[i];
    const data = await fetch(
      obj.tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/"),
      { method: "GET", mode: "cors" }
    ).then((res) => res.json());

    let event = {
      addr: obj.ticketNFTAddress,
      owner: obj.contractOwner,
      isFinished: obj.finish,
      name: data.attributes[0].value,
      date: data.attributes[1].value,
      time: data.attributes[2].value,
      maxTicketCount: data.attributes[3].value,
      price: data.attributes[4].value,
      category: data.attributes[5].value,
      venue: data.attributes[6].value,
      image: data.image,
    };
    eventList.push(event);
  }

  return eventList;
}
