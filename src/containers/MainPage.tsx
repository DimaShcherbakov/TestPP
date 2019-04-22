import React from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";
import { Creators } from '../reducers/tableReducer';

interface IProps {
  location: {
    pathname: string;
    search: string;
  };
  getDataToTable(data: IData): () => void;
  tableState: {
    loading: boolean;
    failure: boolean;
    dataArr: {
      _id: number;
      title: string;
      body: string;
      createdAt: string;
      updatedAt: string;
    }[];
    countItems: number;
  }
}

// interface IParams{
//   page: ParsedQuery,
//   limit: ParsedQuery,
// }

interface IState {
  activePage: number;
}

class MainPage extends React.Component<IProps, IState> {
  state = {
    activePage: 1,
  };

  public componentDidMount(){
    const { getDataToTable } = this.props;
    getDataToTable(this.getRouteData());
  }

  public getRouteData = () => {
    const { location } = this.props;
    const pathParams: any = queryString.parse(location.search);
    const { page, limit } = pathParams;
    if (page && limit) {
      return {
        page, limit
      }
    } else {
      return {
        page,
        limit: undefined,
      }
    }
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
              <div className="btn btn-primary">View</div>
            </td>
          </tr>
        ))}
      </>
    );
  };

  public handleClick = (event:any):void => {
    const { getDataToTable } = this.props;
    getDataToTable(this.getRouteData());
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
    console.log(`active page is ${pageNumber}`);
    this.setState({
      activePage: pageNumber
    });
  };

  public render() {
    console.log(this.props.tableState)
    return (
      <main className="container">
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
      </main>
    );
  }
}

const mapStateToProps = (state: any) => ({
  tableState: state.tableState
});

interface IData {
  page: number;
  limit: string;
}

const mapDispatchToProps = (dispatch: any) => ({
  getDataToTable: (data: IData) => dispatch(Creators.load(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
