import { EligibilityRule, RuleOperator } from './types';

export interface OperatorExclusivityRule {
  sourceRule: EligibilityRule;
  targetRule: EligibilityRule;
  allowedOperatorMapping?: Partial<Record<RuleOperator, RuleOperator[]>>;
}

export const OPERATOR_EXCLUSIVITY_RULES: OperatorExclusivityRule[] = [
  {
    sourceRule: 'specific_product',
    targetRule: 'specific_collection',
    allowedOperatorMapping: {
      contains_any: ['is_not'],
      is_not: ['contains_any'],
    },
  },
  {
    sourceRule: 'specific_collection',
    targetRule: 'specific_product',
    allowedOperatorMapping: {
      contains_any: ['is_not'],
      is_not: ['equals_anything', 'contains_any'],
    },
  },
];
