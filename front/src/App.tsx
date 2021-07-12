import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isAppLoadedState } from "./recoil/atoms";
import { RecoilRoot } from "recoil";

import FullPage from "./components/FullPage";

function App() {
  return (
    <RecoilRoot>
      <FullPage />
    </RecoilRoot>
  );
}

export default App;
