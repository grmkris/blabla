import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon, CheckIcon } from "@heroicons/react/20/solid";

interface IDropdown<T> {
  renderOption: (props: { item: T }) => JSX.Element;
  onSelect: (item: T) => void;
  items: T[];
  label: string;
}

export const Dropdown = <T,>(props: IDropdown<T>) => {
  const [selectedItem, setSelectedItem] = useState<T>();

  const setSelected = (item: T) => {
    setSelectedItem(item);
    props.onSelect(item);
  };
  return (
    <Listbox value={selectedItem} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {props.label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <div className="flex w-full justify-between p-2">
                <ArrowDownIcon
                  className={`${
                    open
                      ? "rotate-[270deg] duration-300 ease-linear"
                      : "rotate-90 duration-300 ease-linear"
                  } mr-2`}
                />
                {selectedItem && <props.renderOption item={selectedItem} />}
              </div>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={
                  "mt-[-15px] flex cursor-pointer flex-col rounded-b-3xl border-[1px] border-t-0 border-solid border-[#e6e7f1] bg-[F0F1FE] pt-[25px] text-[#9498ad] "
                }
              >
                {props.items.map((item, index, array) => {
                  return (
                    <Listbox.Option
                      key={index}
                      value={item}
                      className={`flex items-center justify-between gap-2 px-4 hover:bg-[#f8f9fd] ${
                        array.length === index + 1 && "rounded-b-3xl"
                      }`}
                    >
                      {({ active, selected }) => (
                        <>
                          <props.renderOption item={item} />
                          <CheckIcon
                            className={`w-5 ${selected ? "bg-green-800" : ""}`}
                          />
                        </>
                      )}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
