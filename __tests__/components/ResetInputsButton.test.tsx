import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../helpers/testHelpers';
import ResetInputsButton from '../../components/ResetInputsButton';

describe('ResetInputButtons', () => {
  it('renders a button to reset inputs', () => {
    render(mantineRecoilWrap(<ResetInputsButton />));
    const resetButton = screen.getByText('Reset Inputs');
    expect(resetButton).toBeInTheDocument();
  });
});
