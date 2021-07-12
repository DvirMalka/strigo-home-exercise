import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import history from "../services/history";
import { useRecoilState } from "recoil";
import { eventsState } from "../recoil/atoms";
import { getEvents } from "../services/api";

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
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Please choose the event you want to register</Card.Title>
        </Card.Body>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
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
