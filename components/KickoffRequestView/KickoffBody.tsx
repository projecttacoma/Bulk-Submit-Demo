import { ScrollArea, Center, Text } from '@mantine/core';
import { Prism } from '@mantine/prism';

export default function KickoffBody({ body }: { body: object | undefined }) {
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
