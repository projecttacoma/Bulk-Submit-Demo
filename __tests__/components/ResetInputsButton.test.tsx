import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getMockRecoilState, getRecoilObserver, mantineRecoilWrap } from '../helpers/testHelpers';
import ResetInputsButton from '../../components/ResetInputsButton';
import { selectedMeasureState } from '../../state/atoms/selectedMeasure';
import { exportUrlState } from '../../state/atoms/exportUrl';

describe('ResetInputButtons', () => {
  it('renders a button to reset inputs', () => {
    render(mantineRecoilWrap(<ResetInputsButton />));
    const resetButton = screen.getByText('Reset Inputs');
    expect(resetButton).toBeInTheDocument();
  });

  it('should reset inputs when clicked', () => {
    const measureStateChange = jest.fn();
    const urlStateChange = jest.fn();

    const MeasureRecoilObserver = getRecoilObserver(selectedMeasureState, measureStateChange);
    const MeasureRecoilState = getMockRecoilState(selectedMeasureState, { id: 'test-measure' });
    const UrlRecoilState = getMockRecoilState(exportUrlState, 'http://example.com');
    const UrlRecoilStateObserver = getRecoilObserver(exportUrlState, urlStateChange);

    render(
      mantineRecoilWrap(
        <>
          <MeasureRecoilState />
          <MeasureRecoilObserver />
          <UrlRecoilState />
          <UrlRecoilStateObserver />
          <ResetInputsButton />
        </>
      )
    );

    const resetButton = screen.getByText('Reset Inputs');

    fireEvent.click(resetButton);

    // Called once on render, once on mock state initialization, once more on reset
    expect(measureStateChange).toHaveBeenCalledTimes(3);
    expect(measureStateChange).toHaveBeenCalledWith(null);
    expect(urlStateChange).toHaveBeenCalledTimes(3);
    expect(urlStateChange).toHaveBeenCalledWith('');
  });
});
