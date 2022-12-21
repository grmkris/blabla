import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/solid";

type Props = {
  newInputTag: { isShown: boolean; newTag: string };
  setNewInputTag: (newInputTag: { isShown: boolean; newTag: string }) => void;
  addNewTagHandler: () => void;
};

function NewTagField({ newInputTag, setNewInputTag, addNewTagHandler }: Props) {
  return (
    <AnimatePresence mode="wait">
      {newInputTag.isShown && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
                delay: 0.15,
              },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: 0.4,
              },
              opacity: {
                duration: 0.25,
              },
            },
          }}
          transition={{ duration: 1 }}
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NewTagField;
