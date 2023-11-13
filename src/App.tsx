import { useAction } from "./store/hooks/useAction";
import { useTypeSelector } from "./store/hooks/useTypeSelector";
import { RootState } from "./store/reducers";
import "./styles/app.scss";
import { Suspense, lazy, useEffect } from "react";

const Main = lazy(() => import("./components/main/Main"));
const Header = lazy(() => import("./components/header/Header"));
const Footer = lazy(() => import("./components/footer/Footer"));
const DownUp = lazy(() => import("./components/down-up/DownUp"));

const App = () => {
  const { isLoading } = useTypeSelector((state: RootState) => state.data);
  const { getData } = useAction();
  useEffect(() => {
    getData();
  }, []);

  return (
    <Suspense>
      {isLoading && (
        <div className="app">
          <Header />
          <Main />
          <Footer />
          <DownUp/>
        </div>
      )}
    </Suspense>
  );
};

export default App;
