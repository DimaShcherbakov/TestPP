import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Creators } from '../reducers/editReducer';
import Form from './Form';

interface IState {
  title: string;
}

interface IProps {
  editState: {
    loading: boolean;
    failure: boolean;
    success: boolean;
  };
  match: {
    params: {
      id: string | undefined;
    }
  };
  editNote(data: IData): () => object;
  clearData(): () => object;
}

class EditPage extends React.Component<IProps, IState> {
  state = {
    title: "Edit"
  };

  public componentWillUnmount(){
    const { clearData } = this.props;
    clearData();
  };

  public render(){
    const { title } = this.state;
    const { editNote } = this.props;
    const { success } = this.props.editState;
    const { id } = this.props.match.params;
    if (success) {
      return <Redirect to="/articles?page=1"/>;
    }
    return (
      <main>
        <Form header={title} handler={editNote} id={id}/>
      </main>
    )
  }
};

interface IData {
  title: string;
  body: string;
  id: string;
}

const mapStateToProps = (state: any) => ({
  editState: state.editState
});

const mapDispatchToProps = (dispatch: any) => ({
  editNote: (data: IData) => dispatch(Creators.update_data(data)),
  clearData: () => dispatch(Creators.clear_data())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPage);
