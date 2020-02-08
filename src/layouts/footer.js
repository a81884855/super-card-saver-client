import React, { Component } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import { addCommentMutation } from '../queries/queries';

export class FooterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: false,
      title: 'general',
      content: '',
      commentSent: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ validated: true });
    const { title, content } = this.state;
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      this.props
        .addCommentMutation({
          variables: {
            title,
            content
          }
        })
        .then(() => this.setState({ commentSent: true }));
    }
  };
  render() {
    const { validated, content, commentSent } = this.state;
    return (
      <div>
        <div
          style={{
            height: 350,
            // marginTop: 50,
            padding: 38,
            background: '#4B515D',
            color: '#ffffff'
          }}
        >
          <Container>
            <Row className="justify-content-md-center">
              {!commentSent ? (
                <Col md={5} sm={11}>
                  <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={e => this.setState({ title: e.target.value })}
                      >
                        <option>General</option>
                        <option>Wrong Card Info</option>
                        <option>Advise new credit card</option>
                        <option>Website Suggestion</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        required
                        as="textarea"
                        rows="3"
                        placeholder="Anything you want to tell me?"
                        value={content}
                        onChange={e => this.setState({ content: e.target.value })}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Anything.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" block>
                      Submit
                    </Button>
                  </Form>
                </Col>
              ) : (
                <p>Thank you for your valuable comment!</p>
              )}
            </Row>
          </Container>
        </div>
        <div
          style={{
            height: 30,
            padding: 5,
            textAlign: 'center',
            background: '#3E4551',
            color: '#ffffff'
          }}
        >
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="http://www.supercardsaver.com"> Supercardsaver.com </a>
        </div>
      </div>
    );
  }
}

export default graphql(addCommentMutation, { name: 'addCommentMutation' })(FooterPage);
