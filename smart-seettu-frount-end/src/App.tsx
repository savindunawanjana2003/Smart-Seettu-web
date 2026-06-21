import { AppRoutes } from "./router/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { SocketProvider } from "./context/SocketContext";
const App = () => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <AppRoutes />
      </SocketProvider>
    </Provider>
  );
};

export default App;
