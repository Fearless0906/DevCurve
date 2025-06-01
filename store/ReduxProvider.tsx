"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
