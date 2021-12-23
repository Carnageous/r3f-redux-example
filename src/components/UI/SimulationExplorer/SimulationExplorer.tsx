import { Button, Icon, Input, Label } from "@dive/penguin/dist/components";
import { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { add } from "store/parts";
import PartsList from "./PartsList";

import "./SimulationExplorer.scss";

export default function SimulationExplorer(): JSX.Element {
  const [newPartName, setNewPartName] = useState("");

  const dispatch = useAppDispatch();

  const addPart = () => {
    dispatch(
      add({
        name: newPartName,
        id: `part-${Math.random()}`,
      })
    );

    setNewPartName("");
  };

  return (
    <div className="simulation-explorer">
      <h1>SimulationExplorer</h1>

      <h2>Parts:</h2>
      <PartsList />
      <h3>Add</h3>
      <div className="add">
        <Label>
          Name
          <Input
            type="text"
            value={newPartName}
            onChange={setNewPartName}
            errors={newPartName === "" ? ["Please type a name"] : []}
            onBlur={addPart}
          />
        </Label>
        <Button onClick={addPart} action disabled={newPartName === ""}>
          <Icon type="material" name="add" />
        </Button>
      </div>
    </div>
  );
}
