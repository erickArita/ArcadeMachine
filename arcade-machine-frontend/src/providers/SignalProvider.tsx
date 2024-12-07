import { HttpTransportType } from "@microsoft/signalr";
import { createSignalRContext } from "react-signalr";

import { FC, PropsWithChildren } from "react";
import { API_URL } from "../globals/environment";
import { useAuth } from "../libraries/auth";

const {
  Provider: SignalRContext,
  invoke,
  useSignalREffect,
} = createSignalRContext();

export { SignalRContext, invoke, useSignalREffect };

export const SignalRProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();

  return (
    <SignalRContext
      connectEnabled={!!token}
      accessTokenFactory={() => token}
      dependencies={[token]} //remove previous connection and create a new connection if changed
      url={`${API_URL}/GameHub`}
      logMessageContent={true}
      skipNegotiation
      transport={HttpTransportType.WebSockets}
    >
      {children}
    </SignalRContext>
  );
};
