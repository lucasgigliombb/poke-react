import { WbHeaderBar, WbHeaderButton, WbIcon } from "@workbench/react";
import { PokeResultSection } from "./components/PokeResultSection/PokeResultSection";
import { PokeDetailsSection } from "./components/PokeDetailsSection/PokeDetailsSection";
import "./styles.scss";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { PokeErrorSection } from "./components/PokeErrorSection/PokeErrorSection";
import { useEffect, useState } from "react";
import { useCustomShadowStyles } from "./utils/hooks/useCustomShadowStyles";

export default function App() {
  const [isBackBtnVisible, setBackBtnVisible] = useState(false);
  console.log("Rendering App");
  const location = useLocation();
  useCustomShadowStyles();

  useEffect(() => {
    if (location.pathname !== "/") setBackBtnVisible(true);
    else setBackBtnVisible(false);
  }, [location.pathname]);

  return (
    <div className="App">
      <WbHeaderBar starHref="/" starLabel="Go to home page">
        {isBackBtnVisible ? (
          <>
            <WbHeaderButton slot="tablet-meta-start">
              <Link to="/">
                <WbIcon name="bds/arrow-left/24" />
              </Link>
            </WbHeaderButton>
            <WbHeaderButton slot="mobile-meta-start">
              <Link to="/">
                <WbIcon name="bds/arrow-left/24" />
              </Link>
            </WbHeaderButton>
            <WbHeaderButton slot="desktop-meta">
              <Link to="/">
                <WbIcon name="bds/arrow-left/24" />
              </Link>
            </WbHeaderButton>
          </>
        ) : (
          <></>
        )}
      </WbHeaderBar>
      <Routes>
        <Route path="/" element={<PokeResultSection />} />
        <Route path="/details/:pokemon" element={<PokeDetailsSection />} />
        <Route
          path="*"
          element={
            <PokeErrorSection body="Looks like the pokémon you're trying to catch doesn't exist yet!" />
          }
        />
      </Routes>
    </div>
  );
}
