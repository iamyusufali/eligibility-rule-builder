import { EligibilityRule, InputType, RuleOperator } from './types';

export interface RuleRenderConfig {
  operator?: {
    options: { label: string; value: RuleOperator }[];
    defaultValue?: RuleOperator;
  };
  value: {
    inputType: InputType;
    options?: { label: string; value: string }[];
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
  };
}

export const ELIGIBILITY_RULES_OPTIONS: { label: string; value: EligibilityRule }[] = [
  {
    label: 'Specific Collection',
    value: 'specific_collection',
  },
  {
    label: 'Product Vendors',
    value: 'product_vendors',
  },
  {
    label: 'Specific Product',
    value: 'specific_product',
  },
  {
    label: 'Product Subscribed',
    value: 'product_subscribed',
  },
  {
    label: 'Specific Discount Codes',
    value: 'specific_discount_codes',
  },
  {
    label: 'Cart Value Range',
    value: 'cart_value_range',
  },
];

export const ELIGIBILITY_RULES_CONFIG: Record<EligibilityRule, RuleRenderConfig> = {
  specific_collection: {
    operator: {
      options: [
        { label: 'is not', value: 'is_not' },
        { label: 'contains any', value: 'contains_any' },
      ],
      defaultValue: 'contains_any',
    },
    value: {
      inputType: 'multiselect',
      placeholder: 'Select collections',
      options: [
        { label: 'Collection 1', value: 'collection_1' },
        { label: 'Collection 2', value: 'collection_2' },
        { label: 'Collection 3', value: 'collection_3' },
      ],
    },
  },
  product_vendors: {
    operator: {
      options: [
        { label: 'is not', value: 'is_not' },
        { label: 'contains any', value: 'contains_any' },
      ],
      defaultValue: 'contains_any',
    },
    value: {
      inputType: 'multiselect',
      placeholder: 'Search product vendors',
      options: [
        { label: 'Vendor 1', value: 'vendor_1' },
        { label: 'Vendor 2', value: 'vendor_2' },
        { label: 'Vendor 3', value: 'vendor_3' },
      ],
    },
  },
  specific_product: {
    operator: {
      options: [
        { label: 'equals anything', value: 'equals_anything' },
        { label: 'is not', value: 'is_not' },
        { label: 'contains any', value: 'contains_any' },
      ],
      defaultValue: 'equals_anything',
    },
    value: {
      inputType: 'multiselect',
      placeholder: 'Search products',
      options: [
        { label: 'Product 1', value: 'product_1' },
        { label: 'Product 2', value: 'product_2' },
        { label: 'Product 3', value: 'product_3' },
      ],
    },
  },
  product_subscribed: {
    value: {
      inputType: 'select',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
    },
  },
  specific_discount_codes: {
    value: {
      inputType: 'text',
      placeholder: 'Enter discount codes (comma separated)',
    },
  },
  cart_value_range: {
    operator: {
      options: [
        { label: 'is between', value: 'is_between' },
        { label: 'is greater than', value: 'is_greater_than' },
        { label: 'is less than', value: 'is_less_than' },
      ],
      defaultValue: 'is_between',
    },
    value: {
      inputType: 'range',
      min: 0,
      max: 0,
    },
  },
};
