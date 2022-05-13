import React from 'react';

import NavProvider from './nav';
import SettingsProvider from './settings';
import ApiProvider from './api';

import {FlashProvider} from './flash';

export {
  FlashProvider,
}

const Component = ({children}) => (
  <ApiProvider>
    <SettingsProvider>
      <NavProvider>
        <FlashProvider>
          {children}
        </FlashProvider>
      </NavProvider>
    </SettingsProvider>
  </ApiProvider>
);



export default Component;