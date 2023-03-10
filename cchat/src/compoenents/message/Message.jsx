import React from 'react'
import "../message/Message.css";
const Message = ({user,message,classs}) => {
  if(user){
    return(
      <div className={`messagebox ${classs}`}>
        {`${user} : ${message}`}
      </div>
    )
  }
  else{
    return (
      <div className={`messagebox ${classs}`}>
          {`you : ${message}`}
      </div>
    )
  }
}

export default Message;
