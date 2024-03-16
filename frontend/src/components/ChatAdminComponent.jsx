import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ChatAdminComponent.css";
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

class ChatAdminComponent extends Component {
  handleCancel = () => {
    this.props.handleCancel();
  };

  render() {
    return (
      <div className="chat-admin-container">
        <div className="cancel-icon" onClick={this.handleCancel}>
          <FontAwesomeIcon
            icon={faTimes}
            style={{ fontSize: "3em", color: "white" }}
          />
        </div>

        <ChatEngineWrapper>
          <Socket
            projectID={"1111111"}
            userName={this.props.userEmail}
            userSecret={this.props.userEmail}
          >
            <ChatFeed activeChat={this.props.chat.id} />
          </Socket>
        </ChatEngineWrapper>
      </div>
    );
  }
}

export default ChatAdminComponent;
