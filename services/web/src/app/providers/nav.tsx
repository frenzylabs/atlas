import React from 'react';
import Data from '../data';

const Context = React.createContext({
  page: null,
  setPage: (path:string) => {}
});

const Provider = ({children}) => {
  const [page, setPage_] = React.useState(Data.get('user.location'));

  const setPage = (path:string) => {
    if(['', null, '/'].includes(path.toLowerCase())) {
      Data.delete('user.location');
    } else if(path.toLowerCase() !== (Data.get('user.location') || '').toLowerCase()) {
      Data.set('user.location', path);
    }

    setPage_(path);
  }

  return <Context.Provider value={{page, setPage}}>{children}</Context.Provider>
}

export const useNav = () => React.useContext(Context);

export default Provider;