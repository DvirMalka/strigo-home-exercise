import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useRecoilState } from "recoil";
import { workspacesState } from "../recoil/atoms";
import { ws, getWorkspaces } from "../services/network";

function WorkspacesTable() {
  const [workspaces, setWorkspaces] = useRecoilState(workspacesState);
  useEffect(() => {
    const initialFetch = () => {
      getWorkspaces().then((result) => {
        setWorkspaces(result);
      });
    };

    ws.onopen = () => {
      console.log("websocket connection established");
    };

    ws.onmessage = (evt) => {
      let { data } = JSON.parse(evt.data);
      setWorkspaces(data);
    };

    ws.onclose = () => {
      console.log("websocket disconnected");
    };

    initialFetch();
  }, [setWorkspaces]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {workspaces.map((workspace) => (
          <tr>
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
