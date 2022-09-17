import React from "react";
import { useCombobox } from "downshift";
import clsx from "clsx";
import { ChainListSchema } from "../hooks/useChainListChains";

export function ComboBoxExample(
  props: JSX.IntrinsicElements["select"] & { data: ChainListSchema[] }
) {
  const { data, ...inputProps } = props;
  function getBooksFilter(inputValue: string | undefined) {
    return function booksFilter(book: ChainListSchema) {
      console.log({ inputValue, book });
      return (
        !inputValue ||
        book.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
        book.chainId
          ?.toString()
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      );
    };
  }
  function ComboBox() {
    const [items, setItems] = React.useState(props.data);
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        setItems(data.filter(getBooksFilter(inputValue)));
      },
      items,
      itemToString(item) {
        return item ? item.name : "";
      },
    });

    return (
      <div>
        <div className="w-72 flex flex-col gap-1">
          <label className="label {...getLabelProps()}">
            <span className="label-text">Chain id</span>
          </label>
          <div
            aria-label="toggle menu"
            {...getToggleButtonProps()}
            className="flex shadow-sm bg-white gap-0.5"
            {...getComboboxProps()}
          >
            <input {...inputProps} {...getInputProps()} />
          </div>
        </div>
        <ul
          {...getMenuProps()}
          className="absolute p-0 w-72 bg-white shadow-md max-h-80 overflow-scroll z-40"
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={clsx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "py-2 px-3 shadow-sm flex flex-col"
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>
                  {item.chainId} - {item.name}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <ComboBox />;
}
