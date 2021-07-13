/* eslint-disable react/no-unused-state */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AccessTokenGeneratorForm from '../components/AccessTokenGeneratorForm';
import MPQRCodeGeneratorForm from '../components/MPQRCodeGeneratorForm';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="w-full flex flex-col">
        <details className="w-full mb-4 cursor-pointer p-4">
          <summary>Wechat Mini Program - Access Token Generator</summary>
          <AccessTokenGeneratorForm />
          <hr className="container mb-4" />
        </details>
        <MPQRCodeGeneratorForm />
      </div>
    );
  }
}

export default AppContainer;
