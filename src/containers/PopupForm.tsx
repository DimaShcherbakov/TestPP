import React from 'react';
import { connect } from 'react-redux';
import { Creators } from '../reducers/popupReducer';
 
interface IProps{
  id: string;
  hide: (event: any) => void;
  getNote(id: string): () => void;
  popupState: {
    success: boolean,
    failure: boolean,
    loading: boolean;
    data: {
      _id: string;
      body: string;
      title: string;
      updatedAt: string;
      createdAt: string;
    };
  };
};

class PopupForm extends React.Component<IProps>{

  public componentDidMount(){
    const { getNote, id } = this.props;
    getNote(id);
  }

  public render(){
    const { hide } = this.props;
    const { _id, updatedAt, createdAt, body, title } = this.props.popupState.data;
    return (
      <section className="container border py-2 col-sm-8 shadow position-absolute bg-light">
        <div className="d-flex flex-row-reverse " onClick={hide}><i className="fas fa-times"></i></div>
        <h3 className="border-bottom ">{title}</h3>
        <article className="border-bottom artic">
          {body}
        </article>
        <p className="row justify-content-around">
          <span>Created: {createdAt}</span>
          <span>Updated: {updatedAt}</span>
        </p>
      </section>
    )
  };
};

const mapStateToProps = (state: any) => ({
  popupState: state.popupState
});

const mapDispatchToProps = (dispatch: any) => ({
  getNote: (id: string) => dispatch(Creators.popup_data_load(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupForm);
