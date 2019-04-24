import React from "react";
import { connect } from "react-redux";
import { Creators } from "../reducers/createReducer";
import { Redirect } from "react-router-dom";
import Form from "./Form";

interface IState {
  title: string;
}

interface IProps {
  createState: {
    loading: boolean;
    failure: boolean;
    success: boolean;
  };
  match: {
    params: {
      id: string | undefined;
    }
  }
  addNote(data: IData): () => object;
}

class CreatePage extends React.Component<IProps, IState> {
  state = {
    title: "Create"
  };

  public render() {
    const { title } = this.state;
    const { addNote } = this.props;
    const { success } = this.props.createState;
    const { id } = this.props.match.params;
    if (success) {
      return <Redirect to="/articles?page=1" />;
    }
    return (
      <main>
        <Form header={title} handler={addNote} id={id}/>
      </main>
    );
  }
}

interface IData {
  title: string;
  body: string;
}

const mapStateToProps = (state: any) => ({
  createState: state.createState
});

const mapDispatchToProps = (dispatch: any) => ({
  addNote: (data: IData) => dispatch(Creators.upload_data(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePage);
