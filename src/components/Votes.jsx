// import React, { Component } from "react";
// import propTypes from "prop-types";
// import * as api from "./api";

// class Votes extends Component {
//   state = {
//     votes: false
//   };

//   render() {
//     console.log(this);
//     return (
//       <div>
//         <button
//           ref="btnUp"
//           className="vote-up"
//           label="up"
//           onClick={() => this.handleVoteClick("up")}
//         >
//           <i className="far fa-smile" />
//         </button>
//         <button
//           ref="btnDown"
//           className="vote-down"
//           label="down"
//           onClick={() => this.handleVoteClick("down")}
//         >
//           <i className="far fa-angry" />
//         </button>
//       </div>
//     );
//   }

//   handleVoteClick = (props) => {
//     this.refs.btnArticleUp.setAttribute("disabled", "disabled");
//     this.refs.btnArticleDown.setAttribute("disabled", "disabled");
//     let voteCount = this.props.votes;
//     if (article) {
//       api.voteOnArticle(article._id).then((res) => {
//         if (label === "up") {
//           voteCount++;
//         } else {
//           voteCount--;
//         }
//         this.setState({
//           article: {
//             ...this.state.article,
//             votes: voteCount
//           }
//         });
//       });
//     }
//     if (comment) {
//       api.voteOnComment(comment._id).then((res) => {
//         if (label === "up") {
//           voteCount++;
//         } else {
//           voteCount--;
//         }
//         this.setState({
//           comment: {
//             ...this.state.comment,
//             votes: voteCount
//           }
//         });
//       });
//     }
//   };
// }

// Votes.propTypes = {
//   handleVoteClick: propTypes.func
// };

// export default Votes;
