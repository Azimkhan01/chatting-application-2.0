"use client";
import React from "react";
import Client from "./Client";
import { Provider } from "react-redux";
import { store } from "@/Redux/Store";
import { SocketProvider } from "@/context/SocketContext";

function page() {
  return (
    <SocketProvider>
      <Provider store={store}>
        <Client />
      </Provider>
    </SocketProvider>
  );
}

export default page;
