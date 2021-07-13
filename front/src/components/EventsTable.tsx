import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import history from "../services/history";
import { useRecoilState } from "recoil";
import { eventsState } from "../recoil/atoms";
import { getEvents } from "../services/api";
import Navbar from "react-bootstrap/Navbar";

function EventsTable() {
  const [events, setEvents] = useRecoilState(eventsState);
  useEffect(() => {
    const initialFetch = () => {
      getEvents().then((result) => {
        setEvents(result);
      });
    };

    initialFetch();
  }, [setEvents]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Strigo Events</Navbar.Brand>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Event Name</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push(`/events/${event.id}`);
              }}
              key={event.id}
            >
              <td>{event.id}</td>
              <td>{event.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EventsTable;
