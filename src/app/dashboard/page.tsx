import React, { useEffect, useState } from 'react';
import RegisterTable from '@/components/RegisterTable';
import { Grid, Text } from '@nextui-org/react';

const Dashboard = () => {
  const [holdingRegisters, setHoldingRegisters] = useState<number[]>([]);
  const [inputRegisters, setInputRegisters] = useState<number[]>([]);

  useEffect(() => {
    const fetchRegisters = async () => {
      const response = await fetch('/api/registers');
      const data = await response.json();
      setHoldingRegisters(data.holding);
      setInputRegisters(data.input);
    };

    fetchRegisters();
    const interval = setInterval(fetchRegisters, 1000); // Refresh every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid.Container gap={2} justify="center" style={{ padding: '2rem' }}>
      <Grid xs={12}>
        <Text h1>Modbus Registers Dashboard</Text>
      </Grid>
      <Grid xs={12} md={6}>
        <RegisterTable title="Holding Registers" data={holdingRegisters} />
      </Grid>
      <Grid xs={12} md={6}>
        <RegisterTable title="Input Registers" data={inputRegisters} />
      </Grid>
    </Grid.Container>
  );
};

export default Dashboard;
