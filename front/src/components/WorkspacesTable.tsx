import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useRecoilState } from "recoil";
import { workspacesState } from "../recoil/atoms";
import { ClientMessageTypes } from "../types/WebSocket";
import { useParams } from "react-router-dom";
import { getWorkspaces } from "../services/api";
import ws from "../services/ws";

function WorkspacesTable() {
  const [workspaces, setWorkspaces] = useRecoilState(workspacesState);
  const { eventId } = useParams<{ eventId: string }>();

  useEffect(() => {
    console.log("USE EF", eventId);
    const initialFetch = () => {
      getWorkspaces(eventId).then((result) => {
        setWorkspaces(result);
      });
    };

    ws.onmessage = (evt) => {
      let { data } = JSON.parse(evt.data);
      setWorkspaces(data);
    };

    initialFetch();
    if (eventId && ws.readyState === 1) {
      ws.send(JSON.stringify({ eventId, type: ClientMessageTypes.REGISTER }));
    }
    return () => {
      if (eventId && ws) {
        ws.send(
          JSON.stringify({ eventId, type: ClientMessageTypes.UNREGISTER })
        );
      }
    };
  }, [setWorkspaces, eventId, ws.readyState]);

  return (
    <Table key="workspace-table" striped bordered hover>
      <thead>
        <tr key="workspace-header">
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {workspaces.map((workspace) => (
          <tr key={workspace.id}>
            <td>{workspace.id}</td>
            <td>{workspace.status}</td>
            <td>{workspace.owner}</td>
            <td>{workspace.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WorkspacesTable;
