import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  StaticRouter,
} from 'react-router-dom/server';


import {
  ChakraProvider,
  ColorModeScript,  
} from '@chakra-ui/react';

import {
  Global,
  css,
} from '@emotion/react';

import {Theme} from './theme';
import Router from './router';
import Provider from './providers';
import Layout from './layout';

export const cssFixes = css`
  .js-focus-visible :focus:not([data-focus-visible-added]) {
     outline: none;
     box-shadow: none;
   }
`;

const App = () => {
  return (
    <StaticRouter location='/'>    
      <ColorModeScript initialColorMode={Theme.config.initialColorMode}/>
      <ChakraProvider theme={Theme}>
        <Global styles={cssFixes}/>
        <Provider>
          <Layout>
            <Router/>
          </Layout>
        </Provider>
      </ChakraProvider>
    </StaticRouter>
  );
}


export default App;