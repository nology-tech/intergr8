import React, { Component } from 'react';
import firebase, {firestore} from "../firebase";
import { Router, globalHistory } from "@reach/router";
import TicketingDashboard from '../components/TicketingDashboard';
import UserDashboard from '../components/UserDashboard';
import CategoryChooser from '../components/CategoryChooser';
import SuperUserDashboard from '../components/SuperUserDashboard';
import CreateTicket from '../components/CategoryChooser/CreateTicket';
import TicketView from '../components/TicketingDashboard/TicketColumns/Column/TicketView';
import NavBar from '../components/NavBar';


class PrivateRoutes extends Component {

  state = {}

  checkAuthorization = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        globalHistory.navigate("login");
      }
    });
  }

  checkUserRole = () => {
    firestore
    .collection("info")
    .doc(this.props.user.uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        this.setState({role: doc.data().role}, () => console.log(this.state.role));
      } else {
          console.log("No such document!");
      }
    })
    .catch(error => {
      console.log("Error getting document:", error);
    })
  }

  componentDidMount() {
    this.checkAuthorization();
    this.checkUserRole();
  }

  render() {
    {console.log(this.props.categories)}
    const { 
      user, 
      setCategoriesState, 
      addSubcategory, 
      removeSubcategory, 
      categories 
    } = this.props;
    return (
      <>
        <NavBar signOut={this.props.signOut} />
        <Router>
          {this.state.role && this.state.role === 1
          ? <UserDashboard default path="dashboard" user={user} userRole={this.state.role}  />
          : <TicketingDashboard default path="dashboard" user={user} userRole={this.state.role}  />
        }
          <CategoryChooser path="catalogue" user={user}  />
          <TicketView path="viewticket" user={user}  />
          <CreateTicket path="createticket" user={user}  />
          <SuperUserDashboard 
          path="superuser" 
          user={user} 
          signOut={signOut}             
          setCategoriesState={setCategoriesState}
          addSubcategory={addSubcategory}
          removeSubcategory={removeSubcategory}
          categories={categories}
          userRole={this.state.role} />
        </Router>
      </>
    )
      ;
  }
}

export default PrivateRoutes;
