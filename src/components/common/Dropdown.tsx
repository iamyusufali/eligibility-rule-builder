import { useEffect, useRef, useState } from 'react';
import {
  CollectionCheckbox,
  CollectionDropdown,
  CollectionDropdownContent,
  CollectionItem,
  CollectionText,
  Counter,
  SearchIconWrapper,
  SearchInput,
  SearchInputWrapper,
} from './Styled';
import { SearchIcon } from './SearchIcon';

interface DropdownProps {
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const Dropdown = ({ options, placeholder }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((prevValue) => prevValue !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <CollectionDropdown ref={dropdownRef}>
      <SearchInputWrapper onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInput type="text" placeholder={placeholder ?? 'Select'} readOnly />
        <Counter>
          {selectedValues.length}/{options.length}
        </Counter>
      </SearchInputWrapper>
      {isDropdownOpen && (
        <CollectionDropdownContent>
          {options.map((opt) => (
            <CollectionItem key={opt.value}>
              <CollectionCheckbox
                checked={selectedValues.includes(opt.value)}
                onChange={() => handleChange(opt.value)}
              />
              <CollectionText>{opt.label}</CollectionText>
            </CollectionItem>
          ))}
        </CollectionDropdownContent>
      )}
    </CollectionDropdown>
  );
};
