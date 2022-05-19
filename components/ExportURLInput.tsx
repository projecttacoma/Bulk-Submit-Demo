import { TextInput } from '@mantine/core';
import { exportUrlState } from '../state/atoms/exportUrl';
import { useRecoilState } from 'recoil';

export default function ExportURLInput() {
  const [exportURL, setExportURL] = useRecoilState(exportUrlState);
  
  function checkURL(urlStr: string) {
    // This is a bit more debated than I expected. I think we need port matching, so this regex might work from comments here: 
    // https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
    // does not require http protocol
    // const regex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/);
    // make boolean
    // (TODO: don't allow spaces?)
    // return !!urlStr.match(regex);

    // non-regex approach - depends on what we're trying to match on, but this seems more consistent
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    // requires http protocol
    let url;
    try {
      url = new URL(urlStr);
    } catch (_) {
      return false;  
    }
    // additional regex check for url non-allowed characters
    const regex = new RegExp(/[^-\]_.~!*'();:@&=+$,\/?%#[A-z0-9]/);
    return (url.protocol === "http:" || url.protocol === "https:") && !urlStr.match(regex);
  }


  return (
    <TextInput
      placeholder="Export URL (Data Source)"
      value={exportURL.url}
      onChange={
        (event) => {
          const valid = checkURL(event.currentTarget.value);
          setExportURL({
              url: event.currentTarget.value,
              valid: valid
            });
        }
      }
      error={exportURL.valid ? undefined : <>Valid URL required</> }
    />
  );
}
