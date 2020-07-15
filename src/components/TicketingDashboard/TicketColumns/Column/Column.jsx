import React, { Component } from "react";
import styles from "./Column.module.scss";
import DropDown from "../../../../utilities/DropDown";
// import TicketView from "./TicketView";
import TicketTile from "./TicketTile";
import data from "../../../../data/mockTicketOrderData";

class Column extends Component {
  state = {
    tickets: data,
    // prioritySorted: [],
  };

  // componentDidMount() {
  //   //get from firebase
  //   // this.setState({ tickets: data, prioritySorted: filterClicked(data) });
  // }

  renderFilter() {
    return this.props.filter ? (
      <DropDown filterOptions={["Newest", "Oldest", "Priority"]} />
    ) : (
      <p>{}</p>
    );
  }

  filterClicked = (e) => {
    const orderData = [...this.state.tickets];
    if (e.target.value === "Newest") {
      orderData.sort((a, b) => new Date(b.createdAtDate) - new Date(a.createdAtDate));
    } else if (e.target.value === "Oldest") {
      orderData.sort((a, b) => new Date(a.createdAtDate) - new Date(b.createdAtDate));
    } else if (e.target.value === "Priority") {
      orderData.sort((a, b) => a.priority - b.priority);
    }
    this.setState({
      tickets: orderData,
    });
  };

  render() {
    return (
      <>
        <article className={styles.TicketColumn}>
          <div className={styles.topOfColumn}>
            <h3>{this.props.title}</h3>
            <div onChange={this.filterClicked}>{this.renderFilter()}</div>
          </div>
          <section title={this.props.title}>
            <TicketTile data={this.state.tickets} />
          </section>
        </article>
        {/* <TicketView /> */}
      </>
    );
  }
}

export default Column;
