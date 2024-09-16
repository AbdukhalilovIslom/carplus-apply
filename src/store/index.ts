import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { userSlice, UserSliceType } from "./slices/userSlice";

// type State = UserSliceType & RolesSliceType & SubscriptionSliceType;
type State = UserSliceType;

const stores: StateCreator<State> = (set, get) => ({
  ...userSlice(set, get),
  // ...rolesSlice(set, get),
  // ...subscriptionSlice(set, get),
});

const storesLoader =
  process.env.NODE_ENV === "development" ? devtools(stores) : (stores as any);

export const useStore = create<State>()(storesLoader);

export const clearAllStateFromPersist = () => {
  localStorage.removeItem("___apply___");
};
