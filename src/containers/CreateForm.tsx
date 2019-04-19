import React from 'react';

class CreateForm extends React.Component{
  public render(){
    return (
      <form action="">
        <div>
          <h2></h2>
          <label htmlFor="">Title</label>
          <input type="text"/>
          <p>Title is required</p>
          <label htmlFor="">Body</label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div>
          <input type="submit" value="Create"/>
          <input type="submit" value="Cancel"/>
        </div>
      </form>
    )
  }
}

export default CreateForm;
