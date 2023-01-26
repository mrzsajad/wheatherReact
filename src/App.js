import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("");
  const [info, setInfo] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");

  // const obj={};
  // console.log(Object.keys(obj).length===0);
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=276b65c58c6702d4da22a77937639dd5`
      );
      setInfo(data);
      setLoading(false);
      setIcon(data.weather[0].icon);
      
      
    } catch (err) {
      
      setError(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  
  return (
    <div className="App">
      <Container>
        <Form onSubmit={(e) => e.preventDefault()} className="mt-3">
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={8}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  onChange={(e) => setCityName(e.target.value)}
                  
                />
              </Form.Group>
            </Col>
            <Col md={{ span: 1 }} sm={1}>
              <Button variant="primary" type="submit" onClick={getData} >
                search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      {loading ? (
        <Spinner animation="border" variant="info" />
      )  : ( Object.keys(info).length ? (
        <Container >
          <Row>
            <Col md={{ span: 4, offset: 3 }}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
                />
                <Card.Body>
                  <Card.Title>{cityName} | {info.weather[0].description}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>{info.main.feels_like}</ListGroup.Item>
                  <ListGroup.Item>{info.main.humidity}</ListGroup.Item>
                  <ListGroup.Item>{info.main.pressure}</ListGroup.Item>
                  <ListGroup.Item>{info.main.temp}</ListGroup.Item>
                  <ListGroup.Item>{info.sys.sunrise}</ListGroup.Item>
                  <ListGroup.Item>{info.sys.sunset}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
        ): error
      )}
    </div>
  );
}

export default App;
