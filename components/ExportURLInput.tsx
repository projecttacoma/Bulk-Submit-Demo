import { TextInput } from '@mantine/core';
import { exportUrlState } from '../atoms/exportUrl';
import { useRecoilState } from 'recoil';

export default function ExportURLInput() {
  const [exportURL, setExportURL] = useRecoilState<string>(exportUrlState);
  return (
    <TextInput
      placeholder="Export URL (Data Source)"
      value={exportURL}
      onChange={event => setExportURL(event.currentTarget.value)}
    />
  );
}
