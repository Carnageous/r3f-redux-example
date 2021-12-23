import { Button, Icon } from "@dive/penguin/dist/components";
import classNames from "classnames";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { setActive, setHover, remove } from "store/parts";

import "./PartsList.scss";

export default function PartsList(): JSX.Element {
  const parts = useAppSelector((state) => state.parts.parts);
  const activePart = useAppSelector((state) => state.parts.activePart);
  const hoveringPart = useAppSelector((state) => state.parts.hoveringPart);

  const dispatch = useAppDispatch();

  const setActivePart = (partId: string | null) => {
    dispatch(setActive(partId));
  };

  const setHoveringPart = (partId: string | null) => {
    dispatch(setHover(partId));
  };

  const deletePart = (partId: string) => {
    dispatch(remove(partId));
  };

  return (
    <ul className="parts-list">
      {Object.values(parts).map((part) => {
        return (
          <li
            className={classNames("part", {
              "part--active": activePart === part.id,
              "part--hover": hoveringPart === part.id,
            })}
            onClick={() => setActivePart(activePart === part.id ? null : part.id)}
            onMouseEnter={() => setHoveringPart(part.id)}
            onMouseLeave={() => setHoveringPart(null)}
            key={part.id}
          >
            {part.name}

            <Button action onClick={() => deletePart(part.id)}>
              <Icon name="delete" type="material" />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
