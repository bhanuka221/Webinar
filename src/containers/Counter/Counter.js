import React, { Component } from "react";
import { connect } from "react-redux";

// import CounterControl from "../../components/CounterControl/CounterControl";
// import CounterOutput from "../../components/CounterOutput/CounterOutput";
import * as actionTypes from "../../components/store/actions/index";
import classes from "./counter.module.css";

// class Counter extends Component {
//   state = {
//     counter: 0,
//   };

//   counterChangedHandler = (action, value) => {
//     switch (action) {
//       case "inc":
//         this.setState((prevState) => {
//           return { counter: prevState.counter + 1 };
//         });
//         break;
//       case "dec":
//         this.setState((prevState) => {
//           return { counter: prevState.counter - 1 };
//         });
//         break;
//       case "add":
//         this.setState((prevState) => {
//           return { counter: prevState.counter + value };
//         });
//         break;
//       case "sub":
//         this.setState((prevState) => {
//           return { counter: prevState.counter - value };
//         });
//         break;
//     }
//   };

//   render() {
//     return (
//       <div className={classes.counter}>
//         <CounterOutput value={this.props.ctr} />
//         <CounterControl
//           label="Increment"
//           clicked={this.props.onIncrementCounter}
//         />
//         <CounterControl
//           label="Decrement"
//           clicked={this.props.onDecrementCounter}
//         />
//         <CounterControl label="Add 5" clicked={this.props.onAddCounter} />
//         <CounterControl label="Subtract 5" clicked={this.props.onSubCounter} />
//         <hr />
//         <button
//           onClick={() => {
//             this.props.onSaveResult(this.props.ctr);
//           }}
//         >
//           Save Result
//         </button>
//         <ul>
//           {this.props.savedResults.map((result) => (
//             <li
//               key={result.id}
//               onClick={() => {
//                 this.props.onDeleteResult(result.id);
//               }}
//             >
//               {result.value}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

const mapStateToProps = (state) => {
  return {
    // ctr: state.ctr.counter,
    // savedResults: state.rslt.results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onIncrementCounter: () => dispatch(actionTypes.increment()),
    // onDecrementCounter: () => dispatch(actionTypes.decrement()),
    // onAddCounter: () => dispatch(actionTypes.add(5)),
    // onSubCounter: () => dispatch(actionTypes.subtract(5)),
    // onSaveResult: (result) => dispatch(actionTypes.saveResult(result)),
    // onDeleteResult: (id) => dispatch(actionTypes.deleteResult(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
