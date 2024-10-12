import React from 'react';
import { Table } from '@nextui-org/react';

interface RegisterTableProps {
  title: string;
  data: number[];
}

const RegisterTable: React.FC<RegisterTableProps> = ({ title, data }) => {
  return (
    <div>
      <h3>{title}</h3>
      <Table aria-label={title} css={{ height: 'auto', minWidth: '100%' }}>
        <Table.Header>
          <Table.Column>Register</Table.Column>
          <Table.Column>Value</Table.Column>
        </Table.Header>
        <Table.Body>
          {data.map((value, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index}</Table.Cell>
              <Table.Cell>{value}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RegisterTable;
