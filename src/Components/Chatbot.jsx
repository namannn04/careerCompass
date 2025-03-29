import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState } from "react";
import logo from "../assets/logo-avatars/logo.png"
import Navbar from "./Navbar";

const config = {
  composerPlaceholder: "Send 'HI' to start the assessment",
  botName: "CareerCompass",
  botAvatar: "data:image/png;base64,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",
  botDescription: "",
  color:"#800080",
  email: {
    title: "randomEmail@boptress.com",
    link: "mailto:randomEmail@boptress.com",
  },
  phone: {
    title: "555-555-5555",
    link: "tel:555-555-5555",
  },
  website: {
    title: "https://botpress.com",
    link: "https://botpress.com",
  },
  termsOfService: {
    title: "Terms of service",
    link: "https://botpress.com/terms",
  },
  privacyPolicy: {
    title: "Privacy policy",
    link: "https://botpress.com/privacy",
  },
};
//Add your Client ID here ⬇️
const clientId = "e43d889e-2b4d-4911-8a30-b77d8676d342";
export default function Chatbot() {
  const client = getClient({ clientId });
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center  items-center my-[10vh] ">
      <div className="w-1/2 h-screen ">
        <WebchatProvider  client={client}   configuration={config} >
          <Webchat />
        </WebchatProvider>
      </div>
    </div>
    </div>
  );
}
