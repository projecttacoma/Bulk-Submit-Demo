import { ScrollArea, Center, Text } from '@mantine/core';
import dynamic from 'next/dynamic';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

export default function KickoffBody({ body }: { body: object | undefined }) {
  return body ? (
    <ScrollArea style={{ height: 290 }}>
      <DynamicReactJson src={body} indentWidth={2} />
    </ScrollArea>
  ) : (
    <Center>
      <Text>No Data</Text>
    </Center>
  );
}
