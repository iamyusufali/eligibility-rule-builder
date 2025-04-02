export type InputType = 'text' | 'select' | 'multiselect' | 'range';

export type EligibilityRule =
  | 'specific_collection'
  | 'product_vendors'
  | 'specific_product'
  | 'product_subscribed'
  | 'specific_discount_codes'
  | 'cart_value_range';

export type RuleOperator =
  | 'is_not'
  | 'contains_any'
  | 'equals_anything'
  | 'is_greater_than'
  | 'is_between'
  | 'is_less_than';

export type RuleValue =
  | string // for select and text inputs
  | string[] // for multiselect inputs
  | { min: number; max: number } // for range inputs
  | null;

export type RuleRelation = 'AND' | 'OR';

export interface RuleStateConfig {
  relation?: RuleRelation;
  type: EligibilityRule;
  operator?: RuleOperator;
  value: RuleValue;
}
