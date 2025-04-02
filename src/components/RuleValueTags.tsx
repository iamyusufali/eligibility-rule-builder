import { Tag } from './common/Styled';

export const RuleValueTag = ({ value }: { value: string[] }) => {
  return (
    <div className="flex items-center gap-2 pl-[52px]">
      {value.map((value) => (
        <Tag key={value}>{value}</Tag>
      ))}
    </div>
  );
};
