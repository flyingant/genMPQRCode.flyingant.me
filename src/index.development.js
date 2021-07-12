// CSS
import './scss/style.scss';
import './css/tailwind.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routes';

const TARGET_EL = document.getElementById('root');

const Root = () => (
  <>
    <Routers />
  </>
);

ReactDOM.render(<Root />, TARGET_EL);
