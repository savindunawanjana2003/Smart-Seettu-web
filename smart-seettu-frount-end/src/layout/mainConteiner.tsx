import { Outlet } from "react-router-dom";
import Header from "../components/Nave-bar";

const mainConteiner = () => {
  const naveItems = [{ id: "home" }, { id: "seettuHub" }, { id: "userReveus" }];
  // const margin: string = localStorage.getItem("ptop");
  // const num = Number(margin);

  return (
    <div>
      <Header sections={naveItems} />

      {/* ===================================== */}
      <main className="flex-1 overflow-auto">
        <div className="p-0  bg-[#000000] sm:h-[100vh] border-t border-l border-[#00FF66]/20 shadow-[0_0_30px_rgba(0,255,102,0.05)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default mainConteiner;
