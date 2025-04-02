import React from 'react';
import { EligibilityRule, RuleOperator, RuleValue } from '../config/types';
import { Row, DeleteButton } from './common/Styled';
import { RuleOperatorComponent } from './RuleOperator';
import { RuleValueComponent } from './RuleValue';
import { RuleTypeComponent } from './RuleType';

interface RuleRowProps {
  rule: EligibilityRule;
  operator?: RuleOperator;
  value: RuleValue;
  onDelete?: (rule: EligibilityRule) => void;
  onChange: (operator: RuleOperator | undefined, value: RuleValue) => void;
  onRuleTypeChange: (newRuleType: EligibilityRule) => void;
}

const RuleRow = ({ rule, operator, value, onDelete, onChange, onRuleTypeChange }: RuleRowProps) => {
  const handleRuleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRuleType = e.target.value as EligibilityRule;
    onRuleTypeChange(newRuleType);
  };

  return (
    <Row>
      <RuleTypeComponent rule={rule} handleRuleTypeChange={handleRuleTypeChange} />
      <RuleOperatorComponent rule={rule} value={operator} onChange={(newOperator) => onChange(newOperator, value)} />
      <RuleValueComponent rule={rule} value={value} onChange={(newValue) => onChange(operator, newValue)} />
      {onDelete && <DeleteButton onClick={() => onDelete(rule)}>×</DeleteButton>}
    </Row>
  );
};

export default RuleRow;
