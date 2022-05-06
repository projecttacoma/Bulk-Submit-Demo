import { ScrollArea, Center, Text } from '@mantine/core';
import { Prism } from '@mantine/prism';

interface KickoffBodyProps {
  body?: fhir4.Parameters;
}

export default function KickoffBody({ body }: KickoffBodyProps) {
  return body ? (
    <ScrollArea style={{ height: 290 }}>
      <Prism language="json">{JSON.stringify(body, undefined, 2)}</Prism>
    </ScrollArea>
  ) : (
    <Center>
      <Text>No Data</Text>
    </Center>
  );
}
