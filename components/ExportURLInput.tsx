import { TextInput } from '@mantine/core';
import { useState } from 'react';

export default function ExportURLInput() {
  const [exportURL, setExportURL] = useState<string | undefined>('');
  return (
    <TextInput
      placeholder="Export URL (Data Source)"
      value={exportURL}
      onChange={event => setExportURL(event.currentTarget.value)}
    />
  );
}
