import EventModel, { IEvent, EventId } from "../models/Event";
import WorkspaceModel, { IWorkspace, WorkspaceId } from "../models/Workspace";
import logger from "../services/logger";

// Events
const getEvents = async () => {
  return EventModel.find();
};

const getEvent = async (eventId: EventId) => {
  return EventModel.findById(eventId);
};

const addEvent = async (event: IEvent) => {
  return EventModel.create({
    ...event,
  });
};

// Workspaces
const getWorkspaces = async () => {
  return WorkspaceModel.find();
};

const getEventWorkspaces = async (eventId: EventId) => {
  logger.info(`Getting workspaces for event ${eventId}`);
  return WorkspaceModel.find({ eventId }).exec();
};

const addWorkspace = async function (workspace: IWorkspace) {
  return WorkspaceModel.create({
    ...workspace,
  });
};

export {
  getEvents,
  getEvent,
  addEvent,
  getWorkspaces,
  getEventWorkspaces,
  addWorkspace,
};
