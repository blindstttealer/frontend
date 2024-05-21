"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from ".";
import UserSettingsInitializer from "./userSettingsInitializer";

// переделано по рекомендации из https://redux-toolkit.js.org/usage/nextjs#introduction

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  
  return (
    <Provider store={storeRef.current}>
      <UserSettingsInitializer>{children}</UserSettingsInitializer>
    </Provider>
  )
}
