import React from 'react';

class MainPage extends React.Component{
  public renderRows = () => {
    return (
      <>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>
            <div className="btn">Edit</div>
            <div className="btn">View</div>
          </td>
        </tr>
      </>
    )
  }
  
  public render(){
    return (
      <main>
        <div>
          <h1>Articles</h1>
          <div className="btn">Create</div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Title</th>
              <th scope="col">Body</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows() }
          </tbody>
        </table>
      </main>
    )
  }
}

export default MainPage;