import { TextInput } from '@mantine/core';
import { exportUrlState } from '../state/atoms/exportUrl';
import { useRecoilState } from 'recoil';

export default function ExportURLInput() {
  const [exportURL, setExportURL] = useRecoilState(exportUrlState);

  function checkURL(urlStr: string) {
    let url;
    try {
      url = new URL(urlStr);
    } catch (_) {
      return false;
    }
    // additional regex check for url non-allowed characters
    const regex = new RegExp(/[^-\]_.~!*'();:@&=+$,\/?%#[A-z0-9]/);
    return (url.protocol === 'http:' || url.protocol === 'https:') && !urlStr.match(regex);
  }

  return (
    <TextInput
      placeholder="Export URL (Data Source)"
      value={exportURL.url}
      onChange={event => {
        const valid = checkURL(event.currentTarget.value);
        setExportURL({
          url: event.currentTarget.value,
          valid: valid
        });
      }}
      error={exportURL.valid ? undefined : <>Valid URL required</>}
    />
  );
}
