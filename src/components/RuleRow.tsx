import React from 'react';
import { EligibilityRule, RuleOperator, RuleRelation, RuleValue } from '../config/types';
import { Row, DeleteButton } from './common/Styled';
import { RuleOperatorComponent } from './RuleOperator';
import { RuleValueComponent } from './RuleValue';
import { RuleTypeComponent } from './RuleType';
import { ELIGIBILITY_RULES_CONFIG } from '../config/eligibilityRules';

interface RuleRowProps {
  rule: EligibilityRule;
  operator?: RuleOperator;
  value: RuleValue;
  onDelete?: (rule: EligibilityRule) => void;
  onOperatorChange: (operator: RuleOperator) => void;
  onValueChange: (value: RuleValue) => void;
  onRuleTypeChange: (newRuleType: EligibilityRule) => void;
  existingRules: EligibilityRule[];
  allowedOperators?: RuleOperator[];
  isFirstRow?: boolean;
  relation?: RuleRelation;
}

const RuleRow = React.memo(
  ({
    rule,
    operator,
    value,
    onDelete,
    onOperatorChange,
    onValueChange,
    onRuleTypeChange,
    existingRules,
    allowedOperators,
    isFirstRow,
    relation,
  }: RuleRowProps) => {
    const config = ELIGIBILITY_RULES_CONFIG[rule];

    const handleRuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRuleType = e.target.value as EligibilityRule;
      onRuleTypeChange(newRuleType);
    };

    return (
      <Row>
        {!isFirstRow && <div className="absolute left-2 text-gray-500 text-sm font-medium">{relation}</div>}
        <RuleTypeComponent rule={rule} handleRuleTypeChange={handleRuleTypeChange} existingRules={existingRules} />
        <RuleOperatorComponent
          rule={rule}
          value={operator}
          onChange={onOperatorChange}
          allowedOperators={allowedOperators}
        />
        {operator !== 'equals_anything' && (
          <RuleValueComponent config={config} operator={operator} value={value} onChange={onValueChange} />
        )}
        {onDelete && <DeleteButton onClick={() => onDelete(rule)}>×</DeleteButton>}
      </Row>
    );
  }
);

export default RuleRow;
