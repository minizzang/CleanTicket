import Image from "next/image";
import dummy from "../../../dummy.json";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Detail({ params }) {
  const data = dummy.data.find((d) => d.id == params.idx);

  return (
    <>
      {data ? (
        <div className="flex flex-row">
          <Image
            src={data.file}
            width={250}
            height={450}
            alt="poster"
            style={{ objectFit: "cover" }}
          />
          <div className="flex flex-col ml-10 mt-5 w-full">
            <p className="text-2xl mb-10">{data.name}</p>
            <ul>
              <li className="flex flex-row font-bold text-base mb-2">
                Date/Time :&nbsp;<p className="font-medium">{data.period}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Venue :&nbsp;<p className="font-medium">{data.venue}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Age group :&nbsp;<p className="font-medium">{data.ageGroup}</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Run time :&nbsp;
                <p className="font-medium">{data.runtime} minutes</p>
              </li>
              <li className="flex flex-row font-bold text-base mb-2">
                Price :&nbsp;<p className="font-medium">{data.price}won</p>
              </li>
            </ul>
            <button className="text-white font-bold bg-main-purple hover:bg-dark-purple h-12 w-3/5 rounded-full mt-10 self-end flex flex-row items-center justify-center">
              Buy tickets
              <ChevronRightIcon className="ml-2 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div>hi</div>
      )}
    </>
  );
}
