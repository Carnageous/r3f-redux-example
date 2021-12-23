import classNames from "classnames";

import { useAppSelector, useAppDispatch } from "store/hooks";
import { setActive, setHover } from "store/parts";

import "./KeyframeEditor.scss";

export default function KeyframeEditor(): JSX.Element {
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

  return (
    <div className="keyframe-editor">
      <div className="parts-list">
        {Object.values(parts).map((part) => {
          return (
            <div
              className={classNames("part", {
                "part--active": activePart === part.id,
                "part--hover": hoveringPart === part.id,
              })}
              onClick={() => setActivePart(activePart === part.id ? null : part.id)}
              onMouseEnter={() => setHoveringPart(part.id)}
              onMouseLeave={() => setHoveringPart(null)}
              key={part.id}
            >
              <li>{part.name}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}
