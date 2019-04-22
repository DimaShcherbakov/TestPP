import React from "react";
import { Link } from "react-router-dom";

interface IState {
  title: string;
  body: string;
  [x: string]: string;
}

interface IData {
  title: string;
  body: string;
}

interface IProps {
  header: string;
  handler(data: IData): any;
}

class Form extends React.Component<IProps, IState> {
  state = {
    title: "",
    body: ""
  };

  public formHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { handler } = this.props;
    handler({ ...this.state });
  };

  public handleUserInput = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  public handleTextAreaInput = (
    e: React.FormEvent<HTMLTextAreaElement>
  ): void => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  public render() {
    const { title, body } = this.state;
    const { header } = this.props;
    return (
      <form className="col-sm-6" action="" onSubmit={this.formHandler}>
        <div>
          <h2 className="h2">{header}</h2>
          <div className="d-flex flex-column w-50">
            <label htmlFor="userInput">Title</label>
            <input
              type="text"
              id="userInput"
              name="title"
              onChange={this.handleUserInput}
              value={title}
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="textArea">Body</label>
            <textarea
              name="body"
              id="textArea"
              cols={30}
              rows={10}
              value={body}
              placeholder="Article body..."
              onChange={this.handleTextAreaInput}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center my-2">
          <input className="btn btn-light" type="submit" value="Create" />
          <Link to="/articles">
            <button className="btn btn-light">Cancel</button>
          </Link>
        </div>
      </form>
    );
  }
}

export default Form;
