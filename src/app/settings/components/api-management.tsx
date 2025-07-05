"use client";

import { useState } from "react";
import { Tabs, Tab, Card, Badge, Button,Switch } from "@heroui/react";
import MuiBadge from '@mui/material/Badge';
import { Cog ,TestTubeDiagonal,Cpu,Minimize2  } from 'lucide-react';

import Image from "next/image";

export type ApiProviderType = {
  name: string;
  type: string;
  fields: string[];
  optionalFields?: string[];
  documentationUrl: string;
  referalUrl?: string;
  PaperTrading: boolean;
  logo: string;
  description: string;
  status: string;
  region: string;
  requirements: string[];
};
export type ApiInfoType = {
  [market: string]: {
    [subMarket: string]: ApiProviderType[];
  };
};

const ApiInfo:ApiInfoType = {
  "stock market": {
    "us": [
      {
        name: "TD Ameritrade",
        type: "broker",
        fields: ["apiKey"],
        documentationUrl: "https://developer.tdameritrade.com/apis",
        referalUrl: "https://tdameritrade.com/refer",
        PaperTrading: true,
        logo: "/Assets/APIProvider/DeltaExchangeIndia_Logo.png",
        description:"",
        status:"available",
        region: "us",
        requirements: ["Enable developer account access"]
      },
    ],
    "indian": [
      {
        name: "Zerodha",
        type: "broker",
        fields: ["apiKey", "apiSecret"],
        documentationUrl: "https://kite.trade/docs/connect/v3/",
        referalUrl: "https://zerodha.com/open-account?referralCode=XYZ123",
        PaperTrading: false,
        logo: "/logos/zerodha.png",
        description:"",
        region: "india",
        status:"available",
        requirements: ["KYC must be completed"]
      },
    ],
  },

  "crypto": {
    "Centeralized Cex": [
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: true,
        logo: "/Assets/APIProvider/Binance_Logo.png",
        description:"",
        region: "global",
        status:"available",
        requirements: ["Enable spot trading API"]
      },
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: false,
        logo: "/logos/binance.svg",
        description:"",
        region: "global",
        status:"available",
        requirements: ["Enable spot trading API"]
      },
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: false,
        logo: "/logos/binance.svg",
        description:"",
        region: "global",
        status:"available",
        requirements: ["Enable spot trading API"]
      },
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: false,
        logo: "/logos/binance.svg",
        description:"",
        status:"available",
        region: "global",
        requirements: ["Enable spot trading API"]
      },
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: false,
        logo: "/logos/binance.svg",
        description:"",
        status:"available",
        region: "global",
        requirements: ["Enable spot trading API"]
      },
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: false,
        logo: "/logos/binance.svg",
        description:"",
        status:"available",
        region: "global",
        requirements: ["Enable spot trading API"]
      },
      {
        name: "Binance",
        type: "exchange",
        fields: ["apiKey", "apiSecret"],
        optionalFields: ["passphrase"],
        documentationUrl: "https://binance-docs.github.io/apidocs/spot/en/",
        referalUrl: "https://binance.com/en/register?ref=ABC123",
        PaperTrading: false,
        logo: "/logos/binance.svg",
        description:"",
        status:"available",
        region: "global",
        requirements: ["Enable spot trading API"]
      },
    ],
  },

  "forex": {
    "global": [
      {
        name: "OANDA",
        type: "broker",
        fields: ["accessToken"],
        documentationUrl: "https://developer.oanda.com/rest-live-v20/introduction/",
        logo: "/logos/oanda.svg",
        PaperTrading: true,
        region: "global",
        description:"",
        status:"available",
        requirements: [
          "Enable API access in account settings",
          "Live or demo account must be selected"
        ]
      }
    ],
  },
};




export default function ApiManagement() {
  const [selectedMarket, setSelectedMarket] = useState("stock market");
  const subMarkets = Object.keys(ApiInfo[selectedMarket]);
  const [selectedSubMarket, setSelectedSubMarket] = useState(subMarkets[0]);
  const APIProivders = ApiInfo[selectedMarket][selectedSubMarket];
  const [SelectedAPIProivder, setSelectedAPIProivder] = useState<ApiProviderType | null>(null);
  const [IsMainnetConnection, setIsMainnetConnection] = useState(true);

  return (
    <div className="p-4 space-y-6">
      <h2 className="ml-2 text-2xl font-bold">API Management</h2>

      <Tabs selectedKey={selectedMarket} classNames={{ tab: "pb-5 pt-5 text-sm capitalize"}} radius="sm" fullWidth
        onSelectionChange={(key) => { 
          setSelectedMarket(key.toString());
          const subKeys = Object.keys(ApiInfo[key.toString()]);
          setSelectedSubMarket(subKeys[0]);
        }}
      >
        {Object.keys(ApiInfo).map((key) => (
          <Tab key={key} title={key} />
        ))}
      </Tabs>

      {subMarkets.length > 1 && (
        <div  className="w-[50vw]">
          <Tabs
            selectedKey={selectedSubMarket} radius="sm" fullWidth onSelectionChange={(key) => setSelectedSubMarket(key.toString())} classNames={{ tab: "pb-3 pt-3 text-sm capitalize" }}>
            {subMarkets.map((sub) => (
              <Tab key={sub} title={sub} />
            ))}
          </Tabs>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {APIProivders.map((entry, index) => (
          <MuiBadge key={index} color="success" variant="dot">
            <Card isDisabled={entry.status != "available"} key={index} className="h-full w-full p-4 space-y-3" onClick={() => setSelectedAPIProivder(entry)}>
              {entry.status != "available" &&  
              <p className="absolute font-bold top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-xl text-center capitalize">
                {entry.status}
              </p>
              }
              <div className="h-full w-full flex items-center gap-3">
                {entry.logo && ( <Image  src={entry.logo} alt={entry.name} width={35} height={35} className="rounded-full" />)}
                <h3 className="font-semibold text-lg mr-5">{entry.name}</h3>
                {entry.PaperTrading && (
                  <MuiBadge color="success" variant="dot">Paper Trading</MuiBadge>
                )}
                <div className="absolute top-[7%] right-[3%]">
                  <Badge content={entry.type} className="bg-black text-white dark:bg-white dark:text-black p-1 pr-[50px] pl-3 mb-5 capitalize">
                    {null}
                  </Badge>
                </div>
              </div>

              <p className="text-md text-gray-500 pl-7">
                {entry.description}
              </p>

              {entry.requirements && (
                <>
                <p className="text-md font-bold text-gray pl-2">
                  Requirements
                </p>
                <ul className="text-sm list-disc list-inside text-gray-700 pl-3">
                  {entry.requirements.map((req:string, i:number) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
                </>
              )}

              <div className="flex gap-3 pt-2 ml-auto">
                {entry.documentationUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <a href={entry.documentationUrl} target="_blank" rel="noopener noreferrer">
                      Documentation
                    </a>
                  </Button>
                )}
                {entry.referalUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <a href={entry.referalUrl} target="_blank" rel="noopener noreferrer">
                      Create Account
                    </a>
                  </Button>
                )}
              </div>
                <Button variant="bordered" isIconOnly className=" absolute top-[30%] right-[3%]" isDisabled={entry.status != "available"} onClick={() => setSelectedAPIProivder(entry)}>
                  <Cog />
                </Button>
        
            </Card>
          </MuiBadge>
        ))}
      </div>
      { SelectedAPIProivder &&
        <div className="absolute top-[50%] left-[60%] -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[40vw] border bg-white dark:bg-black z-10 rounded-md p-5 overflow-hidden overflow-y-auto ">
          <div onClick={() => setSelectedAPIProivder(null)} className="absolute top-[3%] right-[2%]" ><Minimize2 className="h-4 w-4" /></div>
          <div className="flex gap-3">
            {SelectedAPIProivder.logo && ( <Image src={SelectedAPIProivder.logo} alt={SelectedAPIProivder.name} width={35} height={35} className="w-[35px] h-[35px] rounded-full" />)}
            <MuiBadge color="success" badgeContent="Connected" invisible={false}>
              <h3 className="font-semibold text-2xl">{SelectedAPIProivder.name}</h3>
              </MuiBadge>
            <span className="absolute top-[7%] right-[3%] font-semibold text-md text-black dark:text-white">
              {"Connection Type:  "}
              <span
                  className={`text-sm mt-10 font-medium ${
                    SelectedAPIProivder.PaperTrading ? IsMainnetConnection ?  "text-green-500" : "text-blue-500" : "text-green-500"
                  }`}
                >
                  {SelectedAPIProivder.PaperTrading ? IsMainnetConnection ?  "Mainnet": "Testnet" : "Mainnet"}
                </span>
              </span>
            {SelectedAPIProivder.PaperTrading && (
              <Switch className="absolute top-[16%] right-[3%] h-3" isSelected={IsMainnetConnection} onValueChange={setIsMainnetConnection} color="success" thumbIcon={({isSelected}) =>
                  isSelected ? <Cpu  className={"h-4 w-4 text-green-500"} /> : <TestTubeDiagonal className={"h-4 w-4 text-blue-500"} />
              }/>
            )}
          </div>

          <div className="ml-auto absolute bottom-[10%] right-[3%]">
            <Badge content={SelectedAPIProivder.type} className="bg-black text-white dark:bg-white dark:text-black p-1 pr-[50px] pl-2 mb-5 capitalize">
              {null}
            </Badge> 
          </div>
        </div>
      }
    </div>
  );
}
