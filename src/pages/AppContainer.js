import React from 'react';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container max-auto flex flex-col">
        <h1 className="text-center">React App</h1>
      </div>
    );
  }
}

export default AppContainer;
