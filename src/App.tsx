import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { theme } from "./theme";
import Home from "./Routes/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Series from "./Routes/Series";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path={["/series", "/series/:seriesId"]}>
          <Series />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
