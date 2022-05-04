import { Code, Center, Text } from '@mantine/core';

export default function KickoffHeaders({ headers }: { headers: string | undefined }) {
  return headers ? (
    <Code block>{headers}</Code>
  ) : (
    <Center>
      <Text>No Data</Text>
    </Center>
  );
}
