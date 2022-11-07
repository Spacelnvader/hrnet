import React from 'react';

import './style.scss'

const Error: React.FunctionComponent = () => {
  return (
    <section data-testid='error'>
      <h1>Erreur 404</h1>
      <p>The page you are looking for cannot be found</p>
    </section>
  );
}

export default Error;