import React, { Component } from "react";
import styles from "./CreateTicket.module.scss";
import { firestore } from '../../../firebase'

class CreateTicket extends Component {
  state = {
    ID: "",
    category: this.props.choices[0],
    eventLog: [],
    subCategory: this.props.choices[1],
    createdBy: this.props.user.uid,
    assignedTo: [],
    modifiedAtDate: [],
    isOpen: true,
    priority: 1,
    canSubmit: false
  };

  getDate = (event) => {
    event.preventDefault();
    if (this.state.canSubmit) {
      const currentTime = new Date().toLocaleString();
      const eventLog = [...this.state.eventLog];
      eventLog[0].date = currentTime;
      this.setState({
        eventLog,
        createdAtDate: currentTime,
      }, () => this.pushTicketData());
    } else {
      alert("Please provide a description before creating your ticket");
    }
  }

  captureMessage = (event) => {
    this.setState({
      eventLog: [{
        type: 'opened',
        details: 'Ticket was created',
        content: {
          name: this.props.user.uid,
          message: event.target.value,
        }
      }], canSubmit: event.target.value ? true : false,
    });
  }

  pushTicketData = () => {
    firestore
      .collection("tickets")
      .add(this.state)
      .then((docRef) => {
        console.log(docRef.id)
        firestore.collection("tickets").doc(docRef.id).update({ ID: docRef.id });
        this.setState({ querySent: true, message: this.state.eventLog[0].content.message });
      })
      .catch((err) => console.error(err));
  }

  toggleQuerySubmitted = () => {
    // const finalMessage = {...this.state.eventLog}.eventLog.message;
    // console.log(finalMessage);
    return this.state.querySent ?
      <p className={styles.italic}>
        {this.state.message}
      </p>
      :
      <textarea className={styles.typeHere} placeholder="Type here..." onChange={(event) => this.captureMessage(event)}></textarea>
  }

  toggleTicketHeader = () => {
    return this.state.querySent ?
      <>
        <h2 className={styles.headerMessage}>{"Ticket sent!"}</h2>
        <h3>{"We'll get straight on this."}</h3>
      </>
      :
      <>
        <h2 className={styles.headerMessage}>{"Almost done..."}</h2>
        <h3>{"Add a description to help us out:"}</h3>
      </>
  }

  toggleButton = () => {
    return this.state.querySent ? (<div className={styles.ticketSent}><h3>Thank you!</h3></div>) : <button
      className={styles.btnCreateTicket} onClick={this.getDate}>Create Ticket</button>
  }


  render() {
    const category = this.props.choices[0];
    const subCategory = this.props.choices[1];

    return (
      <>
        <div className={styles.createTicketBackground}>
          <div className={styles.createTicketContainer}>
            <section className={styles.topField}>
              <p className={styles.topBanner}>New Ticket +</p>
              {this.toggleTicketHeader()}
            </section>
            <section className={styles.formWrapper}>
              <form action="" className={styles.formCreateTicket}>
                <div className={styles.categoriesContainer}>
                  <span>Category:</span>
                  <span>{category}</span>
                </div>
                <div className={styles.categoriesContainer}>
                  <span>Sub-Category:</span>
                  <span>{subCategory}</span>
                </div>
                <div className={styles.descriptionContainer}>
                  <label htmlFor="">
                    Description:
                  </label>
                  {this.toggleQuerySubmitted()}
                </div>
                {this.toggleButton()}
              </form>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default CreateTicket;
