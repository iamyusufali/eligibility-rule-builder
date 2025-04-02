import styled from 'styled-components';

export const RuleContainer = styled.div.attrs({
  className: 'p-4 bg-white rounded-lg',
})``;

export const RuleHeader = styled.div.attrs({
  className: 'mb-4',
})``;

export const RuleTitle = styled.h2.attrs({
  className: 'text-lg font-medium text-gray-800 mb-1',
})``;

export const RuleDescription = styled.p.attrs({
  className: 'text-sm text-gray-600',
})``;

export const ConditionRow = styled.div.attrs({
  className: 'flex items-center gap-2 pl-[52px] relative mb-3 first:mb-5',
})``;

export const RuleGroup = styled.div.attrs({
  className: 'space-y-0',
})``;

export const Select = styled.select.attrs({
  className:
    'px-3 py-1.5 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-gray-500 text-sm min-w-[160px]',
})`
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 24px;
`;

export const Row = styled.div.attrs({
  className: 'flex items-center gap-2 pl-[52px] mb-2',
})``;

export const SearchInputWrapper = styled.div.attrs({
  className: 'relative flex-1 max-w-[300px]',
})``;

export const SearchIconWrapper = styled.div.attrs({
  className: 'absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400',
})`
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const SearchInput = styled.input.attrs({
  className:
    'w-full px-3 py-1.5 pl-8 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-500 text-sm',
})``;

export const Counter = styled.span.attrs({
  className: 'absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-500',
})``;

export const DeleteButton = styled.button.attrs({
  className: 'p-1 text-gray-400 hover:text-gray-500',
})`
  font-size: 16px;
  line-height: 1;
`;

export const AddButton = styled.button.attrs({
  className:
    'flex items-center justify-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white',
})``;

export const NumberInput = styled.input.attrs({
  className:
    'px-3 py-1.5 bg-white text-gray-800 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-500 focus:border-gray-500 w-[100px] text-sm',
})`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const CollectionDropdown = styled.div.attrs({
  className: 'relative flex-1 max-w-[300px]',
})``;

export const CollectionDropdownContent = styled.div.attrs({
  className: 'absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto',
})``;

export const CollectionItem = styled.label.attrs({
  className: 'flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm',
})``;

export const CollectionCheckbox = styled.input.attrs({
  type: 'checkbox',
  className: 'mr-2 text-black focus:ring-black border-gray-300 rounded h-4 w-4',
})``;

export const CollectionText = styled.span.attrs({
  className: 'text-gray-800 text-sm',
})``;

export const Tag = styled.div.attrs({
  className: 'inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mr-1 mb-1',
})`
  button {
    margin-left: 4px;
    color: #666;
    &:hover {
      color: #333;
    }
  }
`;
