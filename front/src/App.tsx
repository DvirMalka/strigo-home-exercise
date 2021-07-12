 
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isAppLoadedState } from './recoil/atoms';

import WorkspacesTable from './components/WorkspacesTable';

function App() {
  const [isAppLoaded, setIsAppLoaded] = useRecoilState(isAppLoadedState);

  useEffect(() => {
    setIsAppLoaded(true);
  });

  return <div>{isAppLoaded && <WorkspacesTable />}</div>;
}

export default App;
