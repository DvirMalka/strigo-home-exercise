import { atom } from 'recoil';
import { IWorkspace } from '../types/Workspace';

export const isAppLoadedState = atom<boolean>({
  key: 'isAppLoadedState',
  default: false,
});

export const workspacesState = atom<IWorkspace[]>({
  key: 'workspacesState',
  default: [],
});