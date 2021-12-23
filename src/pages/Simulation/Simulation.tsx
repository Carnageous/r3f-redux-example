import { View } from "components/Three";
import { KeyframeEditor, SimulationExplorer } from "components/UI";

import "./Simulation.scss";

export default function Dashboard(): JSX.Element {
  return (
    <div className="simulation">
      <View />
      <SimulationExplorer />
      <KeyframeEditor />
    </div>
  );
}
