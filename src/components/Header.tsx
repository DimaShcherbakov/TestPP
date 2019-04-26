import React from 'react';

class Header extends React.Component {
  public render(){
    return (
      <header className="px-2">
        <a href="https://pixelplex.io/" target="_blank">
          <img src=" https://image.ibb.co/k7cmVT/logo_w.png" alt="logo" />
        </a>
      </header>
    );
  }
}

export default Header;
