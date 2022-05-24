import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useInterval from "./hooks/use-interval";

import styles from "./styles.module.css";

const MOTTOS = ["This is motto 1", "This is motto 2", "This is motto 3"];

async function loadMotto(id: number): Promise<string | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOTTOS[id]);
    }, 1000);
  });
}

const cls = (...classes: any[]) => classes.filter(Boolean).join(" ");

function App() {
  const [loadedMottos, setLoadedMottos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedAllMottos, setHasLoadedAllMottos] = useState(false);

  useInterval(
    () => {
      setIsLoading(true);

      loadMotto(loadedMottos.length).then((newMotto) => {
        // setLoadedMottos((prevMottos) => [...prevMottos, newMotto]);
        if (newMotto === undefined) setHasLoadedAllMottos(true);
        else setLoadedMottos((prevMottos) => [...prevMottos, newMotto]);
        setIsLoading(false);
      });
    },
    !isLoading || hasLoadedAllMottos ? 1000 : null
  );

  useEffect(() => {
    console.log("LOADED", loadedMottos);
  }, [loadedMottos]);

  return (
    <div className="App">
      <div className={styles.mottoWrapper}>
        {loadedMottos.map((e, i) => (
          <p
            className={cls(
              styles.motto,
              i === loadedMottos.length - 1 && styles.active
            )}
            key={i}
          >
            {e}
          </p>
        ))}
      </div>

      {/* <button onClick={handleButtonClick}>LOAD MOTTO</button> */}
    </div>
  );
}

export default App;
