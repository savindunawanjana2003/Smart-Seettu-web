import Firstpage from "../pages/Web";
import Apage from "../pages/Grupmanagement";
import Payment from "../pages/Payment";
import Home from "../pages/Home";
import Vidocollae from "../pages/Vidiocole";

import Ongoin from "../pages/Ongoin";

import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

import Dashbord from "../layout/Dashbord";
import Main from "../layout/mainConteiner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import CurrentgroupDetails from "../pages/CurrentgroupDetails";
import Grupmanagement from "../pages/Grupmanagement";

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
            <Route path="Grupmanagement" element={<Apage />} />
            <Route
              path="CurrentgroupDetails"
              element={<CurrentgroupDetails />}
            />
            <Route path="$Payment" element={<Payment />} />
            <Route path="Grupmanagement" element={<Grupmanagement />} />
            <Route path="Home" element={<Home />} />
            <Route path="Ongoin" element={<Ongoin />} />

            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="Contact" element={<Contact />} />
            <Route path="Vidiocoll" element={<Vidocollae />} />
          </Route>
        </Routes>
      </Xcontext.Provider>
    </BrowserRouter>
  );
};

// ===============
