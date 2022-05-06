import { useResetRecoilState } from 'recoil';
import { selectedMeasureState } from '../state/atoms/selectedMeasure';
import { exportUrlState } from '../state/atoms/exportUrl';
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
