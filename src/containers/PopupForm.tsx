import React from 'react';

class PopupForm extends React.Component{
  public render(){
    return (
      <section className="container border py-2 col-sm-8">
        <div className="d-flex flex-row-reverse "><i className="fas fa-times"></i></div>
        <h3 className="border-bottom">Article</h3>
        <article className="border-bottom">
          Article....
        </article>
        <p className="row justify-content-around">
          <span>Created:</span>
          <span>Updated:</span>
        </p>
      </section>
    )
  }
}

export default PopupForm;
