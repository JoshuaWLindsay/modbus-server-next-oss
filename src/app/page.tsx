import Link from 'next/link';
import { Button, Text } from '@nextui-org/react';

const HomePage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Text h1>Welcome to Modbus Server Dashboard</Text>
      <Link href="/dashboard" passHref>
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
};

export default HomePage;
