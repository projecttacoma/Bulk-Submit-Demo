import { Code, Center, Text } from '@mantine/core';

export default function KickoffHeaders({ headers }: { headers: { [key: string]: string } | undefined }) {
  let headersText: string | undefined;
  if (headers) {
    headersText = '';
    for (const [key, value] of Object.entries(headers)) {
      headersText += `${key}: ${value}\n`;
    }
  }

  return headersText ? (
    <Code block>{headersText}</Code>
  ) : (
    <Center>
      <Text>No Data</Text>
    </Center>
  );
}
