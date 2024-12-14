import { useEffect, useRef } from "react";
import { threeStore } from "./stores";

function App() {
  const viewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!viewRef.current || threeStore.rendered) {
      return;
    }

    threeStore.initThree(viewRef.current);
  }, [viewRef]);

  return <div style={{ width: "100vw", height: "100vh" }} ref={viewRef} />;
}

export default App;
