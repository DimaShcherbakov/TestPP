import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Creators } from '../reducers/tableReducer';
import PopupForm from './PopupForm';

interface IProps {
  location: {
    pathname: string;
    search: string;
  };
  getDataToTable(data: IData): () => void
  tableState: {
    loading: boolean;
    failure: boolean;
    dataArr: {
      _id: string;
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    }[];
    countItems: number;
  };
};

interface IState {
  activePage: number;
  showPopup: boolean;
  noteId: string;
};

class MainPage extends React.Component<IProps, IState> {
  state = {
    activePage: 1,
    showPopup: false,
    noteId: '',
  };

  public componentDidMount(){
    const { getDataToTable } = this.props;
    getDataToTable(this.getRouteData());
  }

  public getRouteData = () => {
    const { location } = this.props;
    const pathParams: any = queryString.parse(location.search);
    const { page, limit } = pathParams;
    return { page, limit } 
  }

  public renderRows = () => {
    const { dataArr } = this.props.tableState;
    return (
      <>
        { dataArr.map((el, i) => (
          <tr key={el._id}>
            <td>{el._id}</td>
            <td>{el.title}</td>
            <td>{el.body}</td>
            <td>
              <Link to={`/articles/${el._id}/edit`}>
                <div className="btn btn-primary">Edit</div>
              </Link>
              <div
                className="btn btn-primary pointer mx-3"
                onClick={() => this.ShowPopup(el._id)}
              >View</div>
            </td>
          </tr>
        ))}
      </>
    );
  };

  public handleClick = (event:any):void => {
    const { getDataToTable } = this.props;
    setTimeout(() => {
      getDataToTable(this.getRouteData());
    }, 100);
  }

  public ShowPopup = (id: string) => {
    this.setState({
      showPopup: true,
      noteId: id,
    });
  }

  public HidePopup = (event:any):void => {
    this.setState({
      showPopup: false,
    });
  }

  public renderPagination = () => {
    const pages = [1, 2, 3, 4];
    return (
      <>
        {pages.map((el, i) => (
          <Link to={`/articles?page=${el}`} key={el}>
            <li className="page-item"
              onClick={this.handleClick}
            >
              <span className="page-link">{el}</span>
            </li>
          </Link>
        ))}
      </>
    );
  };

  public handlePageChange = (pageNumber: number) => {
    this.setState({
      activePage: pageNumber
    });
  };

  public render() {
    const { showPopup, noteId } = this.state;
    return (
      <main className="container position-relative">
        <div className="row justify-content-between align-items-center">
          <h1>Articles</h1>
          <Link to="/articles/create">
            <div className="btn btn-primary">Create</div>
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="w-30">id</th>
              <th className="w-30">Title</th>
              <th className="w-30">Body</th>
              <th className="w-10">Handle</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">{this.renderPagination()}</ul>
        </nav>
        { showPopup ? <PopupForm id={noteId} hide={this.HidePopup}/>:'' }
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  tableState: state.tableState
});

interface IData {
  page: number | undefined;
  limit: number | undefined;
};

const mapDispatchToProps = (dispatch: any) => ({
  getDataToTable: (data: IData) => dispatch(Creators.load(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
