import { atom } from "recoil";
import { IWorkspace } from "../types/Workspace";
import { IEvent } from "../types/Event";

export const isAppLoadedState = atom<boolean>({
  key: "isAppLoadedState",
  default: false,
});

export const workspacesState = atom<IWorkspace[]>({
  key: "workspacesState",
  default: [],
});

export const eventsState = atom<IEvent[]>({
  key: "eventsState",
  default: [],
});
