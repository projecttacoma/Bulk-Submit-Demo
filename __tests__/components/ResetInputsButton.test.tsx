import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getMockRecoilState, getRecoilObserver, mantineRecoilWrap } from '../helpers/testHelpers';
import ResetInputsButton from '../../components/ResetInputsButton';
import { selectedMeasureState } from '../../state/atoms/selectedMeasure';
import { exportUrlState } from '../../state/atoms/exportUrl';
import ExportURLInput from '../../components/ExportURLInput';

describe('ResetInputButtons', () => {
  it('renders a button to reset inputs', () => {
    render(mantineRecoilWrap(<ResetInputsButton />));
    const resetButton = screen.getByText('Reset Inputs');
    expect(resetButton).toBeInTheDocument();
  });

  it('should reset inputs when clicked', async () => {
    const measureStateChange = jest.fn();
    const urlStateChange = jest.fn();

    const MeasureRecoilObserver = getRecoilObserver(selectedMeasureState, measureStateChange);
    const MeasureRecoilState = getMockRecoilState(selectedMeasureState, { id: 'test-measure' });
    const UrlRecoilState = getMockRecoilState(exportUrlState, {url:'http://example.com', valid: true});
    const UrlRecoilStateObserver = getRecoilObserver(exportUrlState, urlStateChange);

    render(
      mantineRecoilWrap(
        <>
          <MeasureRecoilState />
          <MeasureRecoilObserver />
          <UrlRecoilState />
          <UrlRecoilStateObserver />
          <ResetInputsButton />
          <ExportURLInput />
        </>
      )
    );

    const resetButton = screen.getByText('Reset Inputs');
    const textbox = screen.getByPlaceholderText('Export URL (Data Source)') as HTMLInputElement;

    // Create inputs
    await act(async () => {
      fireEvent.change(textbox, { target: { value: 'http://localhost:3001/' } });
    });
    expect(textbox.value).toBe('http://localhost:3001/');


    fireEvent.click(resetButton);

    // Called once on render, once on mock state initialization, once more on reset
    expect(measureStateChange).toHaveBeenCalledTimes(3);
    expect(measureStateChange).toHaveBeenCalledWith(null);
    // Called another time for enteredURL
    expect(urlStateChange).toHaveBeenCalledTimes(4);
    expect(urlStateChange).toHaveBeenCalledWith( {
      url: '',
      valid: true
    });

    // expect exportUrl textbox and measure select to be empty
    expect(textbox.value).toBe('');
    expect(textbox).toBeValid();
  });
});
