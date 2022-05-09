import { Code, Center, Text } from '@mantine/core';

interface KickoffHeadersProps {
  headers?: { [key: string]: string };
}

export default function KickoffHeaders({ headers }: KickoffHeadersProps) {
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
