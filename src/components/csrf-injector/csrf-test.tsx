"use client";

import React, { useEffect } from "react";

export default function CSRF() {
  const [sent, setSent] = React.useState("");
  useEffect(() => {
    const sendLogoutRequest = async () => {
      try {
        const res = await fetch(
          "https://backofficeapi.restrox.dev/backoffice/member",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              // "X-Plan": "Platinum",
              // "X-Platform": "web",
            },
            body: JSON.stringify({
              name: "test test" + Math.random().toString().slice(-4),
              email: `test@gmail${Math.random().toString().slice(-4)}.com`,
            }),
          }
        );
        const data = await res.json();

        setSent("Sent CSRF Test Request: " + JSON.stringify(data));

        return data;
      } catch (error) {
        console.error("Failed to submit logout request", error);
      }
    };

    void sendLogoutRequest().then((res) => {
      console.log("Response from CSRF test:", res);
    });
  }, []);
  return <>{sent ? sent : "Loading"}.</>;
}
