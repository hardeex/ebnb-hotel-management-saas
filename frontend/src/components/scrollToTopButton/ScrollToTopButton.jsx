import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

class ScrollToTopButton extends Component {
  constructor() {
    super();
    this.state = { isVisible: false };
  }

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

  render() {
    const buttonStyle = {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: this.state.isVisible ? "block" : "none",
    };

    return (
      <div style={buttonStyle} onClick={this.scrollToTop}>
        <FontAwesomeIcon
          color="white"
          className="btn btn-primary"
          style={{ background: "#2a2185" }}
          icon={faArrowUp}
        />
      </div>
    );
  }
}

export default ScrollToTopButton;
