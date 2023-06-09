# Clean Ticket

### Ticket management system: NFT-based ticket scalping prevention

[Running web3 app](https://clean-ticket.vercel.app/home)  
[Smart contract repo](https://github.com/smpak19/ticketSol)  
[Web3 app introduction deck](https://docs.google.com/presentation/d/1OISebtSV02cGT3GdyFmu-GYvJADUHCDoND26duzyCek/edit#slide=id.p1)  
[Introduction video](https://www.youtube.com/watch?v=afgssd4G2Yw&feature=youtu.be)  


#### Summary
This is a ticket management service which is for preventing ticket scalping using NFT.  
Ticket scalping, also known as ticket resale or ticket touting is an act of reselling tickets. It is serious problem in the ticketing market because scalpers buy tickets in bulk and sell them back at a much higher price than the first sale. This is illegal and takes away fair trade opportunities.

Our service, named Clean-Ticket provides transparent ticket management using blockchain and NFT. NFT-based ticket management has several benefits.

1. It can prevent fake tickets and scams by following record on the blockchain
2. It reduces the cost of making tickets, you can easily buy tickets in web3 application.
3. Ticket production is super quick. Making ERC-721 contract and minting ticket NFT takes just few minutes.

In addition to these advantages, in our Clean-Ticket, ticket NFTs are non-transferable before the event starts. So ticket NFT owners cannot transfer tickets to others, and eventually we can prevent ticket scalping.

As a user, you can check the events currently on sale on our main page. Then you can buy corresponding event's ticket NFT. In mypage, you can check all the tickets you purchased. Moreover, you can bring your ticket NFT into metamask wallet!  
If you want to sell your own event tickets, you have to register as a ticket manager. When admin approves, you can freely create ticket NFT smart contracts. You can check your events are on sale on our main page.

#### Constraints
1. Each user can buy at most 1 ticket per concert.
2. Each ticket NFT is prohibited from trading between users until the concert is over.
3. Only certified ticket manager can make new ticket NFT smart contract.

#### Develop method
We implemented our web3 application with next.js and wagmi. Pinata is used for saving our NFT metadata. For smart contracts, we used remix IDE to test our contracts and hardhat to deploy on sepolia testnet. Finally, we use vercel to deploy our application service.

#### Smart contracts
1. TicketNFTFactory.sol: Maintain whitelist for certified ticket manager. For those who in the whitelist, ticket manager can create their own ticket NFT ERC-721 smart contract by factory pattern.
2. TicketNFT.sol: Ticket manager creates this contract. Manager can change (bool) concertOver value to decide whether NFT owner can trade ticket NFT or not. Also, constraints above are implemented in it.
---
#### Members
[smpak19](https://github.com/smpak19)  
[minizzang](https://github.com/minizzang)
