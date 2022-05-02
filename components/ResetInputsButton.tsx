import { useResetRecoilState } from 'recoil';
import { selectedMeasureState } from '../atoms/selectedMeasure';
import { exportUrlState } from '../atoms/exportUrl';
import { Button } from '@mantine/core';

export default function ResetInputsButton() {
  const resetSelectedMeasure = useResetRecoilState(selectedMeasureState);
  const resetExportURL = useResetRecoilState(exportUrlState);
  return (
    <Button
      color="red"
      radius="xs"
      uppercase
      onClick={() => {
        resetSelectedMeasure();
        resetExportURL();
      }}
    >
      Reset Inputs
    </Button>
  );
}
