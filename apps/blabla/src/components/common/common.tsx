import {
  ArrowDownIcon,
  CheckIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import type { ComponentPropsWithoutRef } from "react";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  name: string;
  // typescript input types
  type?: "text" | "number" | "email" | "password" | "tel" | "url" | "search";
  error?: string;
  className?: string;
}
export const Common = (props: InputProps) => {
  const {
    label,
    name,
    type = "text",
    error = "",
    className = "",
    ...rest
  } = props;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          type={type}
          name={name}
          id={name}
          className={`block w-full rounded-md shadow-sm sm:text-sm ${
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          }`}
          {...rest}
        />
      </div>
      {error && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  loadingLabel?: string;
  error?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export const Button = (props: ButtonProps) => {
  const {
    label,
    icon,
    className = "",
    loading = false,
    loadingLabel = "Loading...",
    error = "",
    disabled = false,
    children,
    ...rest
  } = props;

  return (
    <button
      type="button"
      disabled={loading || disabled}
      className={`btn inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        disabled
          ? "cursor-not-allowed bg-gray-300"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
      } ${className}`}
      {...rest}
    >
      {loading ? (
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
          ></path>
        </svg>
      ) : (
        icon
      )}
      {loading && (loadingLabel ?? children)}
      {!loading && (label ?? children)}
      {error && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      )}
    </button>
  );
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * function classNames(...classes) {
 *   return classes.filter(Boolean).join(' ')
 * }
 *
 * export default function Example() {
 *   const [selected, setSelected] = useState(people[3])
 *
 *   return (
 *     <Listbox value={selected} onChange={setSelected}>
 *       {({ open }) => (
 *         <>
 *           <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label>
 *           <div className="relative mt-1">
 *             <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
 *               <span className="flex items-center">
 *                 <img src={selected.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
 *                 <span className="ml-3 block truncate">{selected.name}</span>
 *               </span>
 *               <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
 *                 <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
 *               </span>
 *             </Listbox.Button>
 *
 *             <Transition
 *               show={open}
 *               as={Fragment}
 *               leave="transition ease-in duration-100"
 *               leaveFrom="opacity-100"
 *               leaveTo="opacity-0"
 *             >
 *               <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
 *                 {people.map((person) => (
 *                   <Listbox.Option
 *                     key={person.id}
 *                     className={({ active }) =>
 *                       classNames(
 *                         active ? 'text-white bg-indigo-600' : 'text-gray-900',
 *                         'relative cursor-default select-none py-2 pl-3 pr-9'
 *                       )
 *                     }
 *                     value={person}
 *                   >
 *                     {({ selected, active }) => (
 *                       <>
 *                         <div className="flex items-center">
 *                           <img src={person.avatar} alt="" className="h-6 w-6 flex-shrink-0 rounded-full" />
 *                           <span
 *                             className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
 *                           >
 *                             {person.name}
 *                           </span>
 *                         </div>
 *
 *                         {selected ? (
 *                           <span
 *                             className={classNames(
 *                               active ? 'text-white' : 'text-indigo-600',
 *                               'absolute inset-y-0 right-0 flex items-center pr-4'
 *                             )}
 *                           >
 *                             <CheckIcon className="h-5 w-5" aria-hidden="true" />
 *                           </span>
 *                         ) : null}
 *                       </>
 *                     )}
 *                   </Listbox.Option>
 *                 ))}
 *               </Listbox.Options>
 *             </Transition>
 *           </div>
 *         </>
 *       )}
 *     </Listbox>
 *   )
 * }
 */

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
