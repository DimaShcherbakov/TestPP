import React from "react";
import { Link, Redirect } from "react-router-dom";
import queryString from "query-string";

interface IProps {
  location: {
    pathname: string;
    search: string;
  };
}

// interface IParams{
//   page: ParsedQuery,
//   limit: ParsedQuery,
// }

interface IState {
  activePage: number;
  redirect: boolean;
  pathTo: string;
  pathFrom: string;
}

class MainPage extends React.Component<IProps, IState> {
  state = {
    activePage: 1,
    redirect: false,
    pathTo: "",
    pathFrom: ""
  };

  public componentDidMount() {
    const { location } = this.props;
    const pathParams: any = queryString.parse(location.search);
    const page = +pathParams.page;
    this.setState({
      activePage: page
    });
    console.log(this.state);
  }

  public renderRows = () => {
    return (
      <>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>
            <div className="btn btn-primary">Edit</div>
            <Link to={`/articles/${1}/edit`}>
              <div className="btn btn-primary">View</div>
            </Link>
          </td>
        </tr>
      </>
    );
  };

  public handleClick = (el: number) => {
    const { pathname } = this.props.location;
    const { location } = this.props;
    const pathParams: any = queryString.parse(location.search);
    const page = +pathParams.page;
    this.setState({
      redirect: true,
      pathTo: `${pathname}?page=${el}`,
      pathFrom: `${pathname}?page=${page}`
    });
  };

  public renderPagination = () => {
    const pages = [1, 2, 3, 4];
    return (
      <>
        {pages.map((el, i) => (
          <li
            className="page-item"
            key={el}
            onClick={() => this.handleClick(el)}
          >
            <span className="page-link">{el}</span>
          </li>
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
    if (this.state.redirect) {
      return <Redirect from={this.state.pathFrom} to={this.state.pathTo} />;
    }
    // const { location } = this.props;
    // const pathParams: any = queryString.parse(location.search);
    // const page = +pathParams.page;
    // this.setState({
    //   activePage: page
    // });
    console.log(this.state);
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

export default MainPage;
