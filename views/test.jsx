import React from "react";

function ContactList(props) {
  console.log(props.docs);
  return (
    <div>
      {props.docs.map(c => <ul><li key={c._id} name={c.username} >{c.username}</li></ul>)}
     </div> 
  ); 
} 

export default ContactList;