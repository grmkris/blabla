import React, { useEffect, useRef } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import autoAnimate from "@formkit/auto-animate";

type Props = {
  newInputTag: { isShown: boolean; newTag: string };
  setNewInputTag: (newInputTag: { isShown: boolean; newTag: string }) => void;
  addNewTagHandler: () => void;
};

function NewTagField({ newInputTag, setNewInputTag, addNewTagHandler }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  return (
    <div ref={parentRef}>
      {newInputTag.isShown && (
        <div>
          <div className="flex items-end space-x-1">
            <div className="form-control indicator w-full">
              <label className="label">
                <span className="label-text font-bold">New tag</span>
              </label>
              <input
                placeholder="New tag"
                value={newInputTag.newTag || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewInputTag({ ...newInputTag, newTag: e.target.value })
                }
                autoComplete="off"
                className="input "
              />
            </div>
            <button
              className="btn-ghost btn flex items-center"
              type="button"
              onClick={addNewTagHandler}
            >
              <PlusIcon className="h-6 w-6 text-secondary" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewTagField;
