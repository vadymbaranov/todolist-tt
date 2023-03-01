import React from 'react';

type Props = {
  values: string[];
};

export const TableHeader: React.FC<Props> = ({ values }) => {
  return (
    <thead>
      <tr>
        {values.map((value: string, i: number) => (
          // Array index as key is used here because the array is not subject to change
          // eslint-disable-next-line react/no-array-index-key
          <th key={i}>{value}</th>
        ))}
      </tr>
    </thead>
  );
};
