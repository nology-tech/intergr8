const ticket = [
  {
    ID: "",
    category: 1, // number. payroll (1), general hr (2), health&safety (3), L&D (4), recruitment (5)
    subCategory: 3, // number. 3 subcategories per category at the moment—see below for example subcategories for each category.
    createdBy: "0123456789", // Employee UID. Generated by Firebase.
    assignedTo: ['3859485849'], // Array of UIDs. Can be multiple.
    createdAtDate: "01/01/1970 00:00:01", // datetime. Date of ticket opening.
    modifiedAtDate: ["01/02/1970 00:00:01"], // datetime. Date of most recent event.
    isOpen: true, // boolean.
    priority: 3, // number. Auto-assigned by dashboard.
    eventLog: [
      // Array of objects.
      // Includes all types of events—messages, assigning, escalating, resolving etc.
      // See below for example events.
      {
        type: "opened",
        content: {
          ID: "E00000002",
          message: "I haven't been paid this month.",
        },
        date: "13/07/2020 13:05:43",
      },
    ],
  },
];

/* Categories:
1. Payroll:
  1. I need to update my tax code
  2. What is my payroll number?
  2. Incorrect Payment

2. General hr
  1. I have an issue with a colleague
  2. Clarification of my job description
  3.I have a query on holiday entitlement

3. Health & Safety
  1. I want to report a healthy and safety hazard
  2. What health and safety policies are in place
  3. First aid training enquiry

4. L&D
  1. Enquire about upcoming course
  2. When is my annual appraisal
  3. What are my set targets for this month

5. Recruitment:
  1. I’d like to apply for an internal post
  2. Application process
  3. I would like a reference

*/

// Event templates
// Event types:  opened, message, assignedTo, changeOfCategory, isResolved, reOpened

[
  {
    type: "opened",
    content: {
      ID: "", // user that opened ticket
      message: "string: message entered by user when ticket is created",
    },
    date: "13/07/2020 13:05:43",
  },
  {
    type: "message",
    content: {
      ID: "", // user that sent message
      message: "string: message between employee and HR agent",
    },
    date: "13/07/2020 13:05:43",
  },
  {
    type: "assignedTo",
    content: {
      ID: "", // newly assigned HR agent
      message: null,
    },
    date: "13/07/2020 13:05:43",
  },
  {
    type: "changeOfCategory",
    content: {
      ID: "", // user that changed category
      message: null,
    },
    date: "13/07/2020 13:05:43",
  },
  {
    type: "isResolved",
    content: {
      ID: "", // user that resolved ticket
      message: null,
    },
    date: "13/07/2020 13:05:43",
  },
  {
    type: "reOpened",
    content: {
      ID: "", // user that re-opened ticket
      message: null,
    },
    date: "13/07/2020 13:05:43",
  },
];