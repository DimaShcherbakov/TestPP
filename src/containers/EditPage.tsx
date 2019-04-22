import React from "react";
import Form from "./Form";

interface IState {
  title: string;
}

interface IProps {}

class EditPage extends React.Component<IProps, IState> {
  state = {
    title: "Article/Edit"
  };

  public render() {
    const { title } = this.state;
    return <main>{/* <Form header={title} /> */}</main>;
  }
}
export default EditPage;
