import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import ChatAdminComponent from "./ChatAdminComponent";
import axios from "axios";

class ChatComponent extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: false,
      isChatVisible: false,
      userEmail: "",
      isEmailSubmitted: false,
      errorMessage: "",
    };
  }

  handleCancel = () => {
    this.setState({
      isEmailSubmitted: false,
      userEmail: "",
      errorMessage: "",
      isChatVisible: false,
    });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 100) {
      this.setState({ isVisible: true });
    } else {
      this.setState({ isVisible: false });
    }
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  toggleChat = () => {
    this.setState((prevState) => ({ isChatVisible: !prevState.isChatVisible }));
  };

  handleEmailChange = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  getOrCreateUser = (callback) => {
    const { userEmail } = this.state;
    axios
      .put(
        `https://api.chatengine.io/users/`,
        {
          username: userEmail,
          secret: userEmail,
          email: userEmail,
        },
        {
          headers: { "private-key": "12300000e" },
        }
      )
      .then((res) => callback(res.data));
  };

  getOrCreateChat = (callback) => {
    const { userEmail } = this.state;
    axios
      .put(
        `https://api.chatengine.io/chats/`,
        {
          usernames: ["EBNB", userEmail],
          is_direct_chat: true,
        },
        {
          headers: { "private-key": "12300000e" },
        }
      )
      .then((res) => callback(res.data));
  };

  handleSubmit = async () => {
    try {
      const isValidEmail = /\S+@\S+\.\S+/.test(this.state.userEmail);

      if (isValidEmail) {
        await this.getOrCreateUser(async (user) => {
          await this.getOrCreateChat((chat) => {
            // Check if both operations were successful before updating state
            if (user && chat) {
              this.setState({
                isEmailSubmitted: true,
                errorMessage: "",
              });
            } else {
              console.error("Error creating user or chat");
              this.setState({
                errorMessage: "An error occurred while processing your request",
              });
            }
          });
        });
      } else {
        this.setState({ errorMessage: "Invalid email" });
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
      this.setState({
        errorMessage: "An error occurred while processing your request",
      });
    }
  };

  render() {
    const { isChatVisible, userEmail, isEmailSubmitted, errorMessage } =
      this.state;

    return (
      <div>
        {/* Display the ChatAdminComponent if email is successfully submitted */}
        {isEmailSubmitted ? (
          <ChatAdminComponent
            userEmail={userEmail}
            handleCancel={this.handleCancel}
          />
        ) : (
          <div>
            <div
              style={{
                position: "fixed",
                bottom: "80px",
                right: "20px",
              }}
            >
              {isChatVisible ? (
                <div>
                  <input
                    className="p-1"
                    type="email"
                    placeholder="Enter your email"
                    value={userEmail}
                    onChange={this.handleEmailChange}
                    required
                  />
                  <button
                    className="ms-2 btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                  {errorMessage && (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                </div>
              ) : (
                <FontAwesomeIcon
                  color="white"
                  className="btn btn-primary"
                  style={{
                    background: "#2a2185",
                    cursor: "pointer",
                    width: 40,
                    height: 50,
                    borderRadius: 50,
                  }}
                  icon={faComments}
                  onClick={this.toggleChat}
                  title="Click to start a chat"
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ChatComponent;
