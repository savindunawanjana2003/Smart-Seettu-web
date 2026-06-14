import Firstpage from "../pages/Web";
import Apage from "../pages/Grupmanagement";
import Bpage from "../pages/B";

import Dashbord from "../pages/Dashbord";
import Main from "../layout/mainConteiner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import GrupmanegementSecound from "../pages/CurrentgroupDetails";
export const Xcontext = createContext<any>(null);
export const AppRoutes = () => {
  // const marginTop = localStorage.getItem("ptop");
  // const naveBarisvisible = localStorage.getItem("naveBarisvisible");
  // methanadi mama nested routing use kara
  return (
    <BrowserRouter>
      <Xcontext.Provider value={{}}>
        <Routes>
          <Route path="/" element={<Main />}>
            {/* index dala kiwama  me page eka thamai  mulinma aoutlate ekata set wenne */}
            <Route index element={<Firstpage />} />
          </Route>
          {/* ------------------------- */}
          <Route path="/pages/Dashbord" element={<Dashbord />}>
            <Route path="pages/A" element={<Apage />} />
            <Route
              path="nextGrupmanagementGrup"
              element={<GrupmanegementSecound />}
            />
          </Route>
        </Routes>
      </Xcontext.Provider>
    </BrowserRouter>
  );
};

// ===============
