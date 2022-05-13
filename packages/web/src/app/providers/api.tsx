import React from 'react';
const ENDPOINT = 'https://api.devpipe.com/';

const client = "";

const Context = React.createContext(client);

const Component = ({children}) => (
  <Context.Provider value={client}>{children}</Context.Provider>
);

export const useApi = () => React.useContext(Context);

export default Component;