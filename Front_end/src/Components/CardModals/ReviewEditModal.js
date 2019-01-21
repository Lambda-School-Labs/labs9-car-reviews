import React, { Fragment } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Col,
  Row
} from "reactstrap";
import EditStars from "../StarsRating/EditStars";

class ReviewEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumReviewID: "",
      review: "",
      dateModified: "",
      rating: 0,
      modal: false,
      nestedModal: false,
      closeAll: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  componentDidMount() {
    this.setState({
      review: this.props.review.review,
      rating: this.props.review.rating
    });
  }

  editHandler = event => {
    // event.preventDefault();
    axios
      .put(
        `https://labs9-car-reviews.herokuapp.com/albumReviews/${
          this.props.review.albumReviewID
        }`,
        {
          review: this.state.review,
          rating: this.state.rating,
          dateModified: this.state.dateModified
        }
      )
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  deleteHandler = id => {
    axios
      .delete(`https://labs9-car-reviews.herokuapp.com/albumReviews/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  updateRating = newRating => {
    this.setState({ rating: newRating });
  };

  handleEditChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  dateStamp() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let dateString = month + 1 + "/" + date + "/" + year;
    console.log(dateString);
    this.setState({ dateModified: dateString });
  }

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={this.toggle}>
          Edit
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={true}
        >
          <Row class="d-flex justify-content-around">
            <Col class="container">
              <div>
                <ModalHeader>Album</ModalHeader>
                <ModalHeader>Artist</ModalHeader>
              </div>
              <div>
                <ListGroup>
                  <ListGroupItem>Track 1</ListGroupItem>
                  <ListGroupItem>Track 2</ListGroupItem>
                  <ListGroupItem>Track 3</ListGroupItem>
                  <ListGroupItem>Track 4</ListGroupItem>
                  <ListGroupItem>Track 5</ListGroupItem>
                  <ListGroupItem>Track 6</ListGroupItem>
                  <ListGroupItem>Track 7</ListGroupItem>
                  <ListGroupItem>Track 8</ListGroupItem>
                  <ListGroupItem>Track 9</ListGroupItem>
                  <ListGroupItem>Track 10</ListGroupItem>
                </ListGroup>
              </div>
            </Col>
            <Col class="container">
              <div>
                <img
                  src="http://bobjames.com/wp-content/themes/soundcheck/images/default-album-artwork.png"
                  alt="Placeholder album image"
                />
              </div>
            </Col>
          </Row>
          <div class="container center-align" style={{ margin: "0 auto" }}>
            <Row style={{ margin: "0 auto" }}>
              <EditStars
                rating={this.props.review.rating}
                updateRating={this.updateRating}
              />
            </Row>
            <div>
              <textarea
                onChange={this.handleEditChange}
                name="review"
                value={this.state.review}
                maxlength="1500"
                style={{ resize: "none", width: "100%" }}
              />
            </div>
          </div>
          <ModalFooter>
            <Button
              color="primary"
              onClick={event => {
                this.editHandler();
                this.dateStamp();
              }}
            >
              Submit
            </Button>
            <Button color="primary" onClick={this.toggleNested}>
              Delete
            </Button>
            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNested}
              style={{
                top: "50%"
              }}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>
                Are you sure you want to DELETE this review?
              </ModalHeader>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={event => {
                    this.deleteHandler(this.props.review.albumReviewID);
                    this.toggleAll();
                  }}
                >
                  Delete
                </Button>
                <Button color="secondary" onClick={this.toggleNested}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ReviewEditModal;
