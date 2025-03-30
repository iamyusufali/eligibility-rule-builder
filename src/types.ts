export type EligibilityRule =
  | 'specific_collection'
  | 'product_vendors'
  | 'specific_product'
  | 'product_subscribed'
  | 'specific_discount_codes'
  | 'cart_value_range';

export type RuleCondition =
  | 'is_not'
  | 'contains_any'
  | 'equals_anything'
  | 'is_greater_than'
  | 'is_between'
  | 'is_less_than';

export type InputType = 'text' | 'select' | 'multiselect' | 'range';

export type RuleValue =
  | string // for select and text inputs
  | string[] // for multiselect inputs
  | [number, number] // for range inputs
  | null;
