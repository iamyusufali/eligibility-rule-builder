import React from 'react';
import { EligibilityRule } from '../types';
import { ELIGIBILITY_RULES_OPTIONS } from '../config/eligibilityRules';
import { Row, Select, DeleteButton } from './common/Styled';
import { RuleCondition } from './RuleCondition';
import { RuleValue } from './RuleValue';

interface RuleRowProps {
  rule: EligibilityRule;
  onDelete?: (rule: EligibilityRule) => void;
}

const RuleRow: React.FC<RuleRowProps> = ({ rule, onDelete }) => {
  return (
    <Row>
      <Select value={rule}>
        {ELIGIBILITY_RULES_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <RuleCondition rule={rule} />
      <RuleValue rule={rule} />
      {onDelete && <DeleteButton onClick={() => onDelete(rule)}>×</DeleteButton>}
    </Row>
  );
};

export default RuleRow;
