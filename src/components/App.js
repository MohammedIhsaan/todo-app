import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: '',
      list: []
    };
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value
    });
  }

  // Add item if user input in not empty
  addItem() {
    if (this.state.userInput !== '') {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add a user value to list
        value: this.state.userInput
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // reset state
      this.setState({
        list,
        userInput: ''
      });
    }
  }

  // Function to comfirm to delete item
  alertThis(key) {
    var txt;
    var r = confirm('Are you Sure,This item will be deleted');
    if (r == true) {
      console.log('hi');

      this.deleteItem(key);

      txt = 'You pressed OK!';
    } else {
      txt = 'You pressed Cancel!';
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list];

    // Filter values and leave value which we need to delete
    const updateList = list.filter(item => item.id !== key);

    // Update list in state
    this.setState({
      list: updateList
    });
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '3rem',
              fontWeight: 'bolder',
              color: 'Blue'
            }}
          >
            TODO LIST
          </Row>

          <hr />
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="add item . . . "
                  size="lg"
                  value={this.state.userInput}
                  onChange={item => this.updateInput(item.target.value)}
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => this.addItem()}
                  >
                    ADD
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <div>
            {this.state.list.map(item => {
              return (
                <ListGroup>
                  <ListGroup.Item variant="dark">
                    <Row
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '1rem',
                        fontWeight: 'bolder'
                      }}
                    >
                      <Col>{item.value}</Col>

                      <Col md={{ offset: 10 }}>
                        <Button
                          variant="danger"
                          size=""
                          onClick={() => this.alertThis(item.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
