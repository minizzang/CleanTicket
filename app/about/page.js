import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <div className="text-center text-lg flex flex-col flex-grow justify-around">
      <p className="font-bold text-3xl">Clean Ticket Service</p>
      <div>
        <p>Our service provides ticket management system</p>
        <p className="underline underline-offset-4">
          with no chance of ticket scalping.
        </p>
        <p className="mt-4">
          You can freely purchase ticket NFTs in our website.
        </p>
        <p className="mt-4">
          If you want to sell your own concert tickets, contact admin by
          &apos;Register&apos; tab.
        </p>
        <p>
          You can become authorized ticket manager,
          <br /> and will be able to sell ticket NFTs without concern about
          scalping!
        </p>
      </div>

      <div>
        <div className="font-bold text-lg mb-2">Contact Us</div>
        <div className="flex flex-row justify-center">
          <a
            href="https://github.com/smpak19"
            target="_blank"
            className="flex flex-row mr-5 hover:text-dark-purple"
          >
            <p>smpak19</p>
            <ArrowTopRightOnSquareIcon className="w-5 ml-1" />
          </a>
          <a
            href="https://github.com/minizzang"
            target="_blank"
            className="flex flex-row hover:text-dark-purple"
          >
            <p>minizzang</p>
            <ArrowTopRightOnSquareIcon className="w-5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
