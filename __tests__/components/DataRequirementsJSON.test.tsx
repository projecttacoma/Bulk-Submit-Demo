import { render, screen } from '@testing-library/react';
import { mantineRecoilWrap } from '../helpers/testHelpers';
import DataRequirementsJSON from '../../components/DataRequirementsView/DataRequirementsJSON';

import '@testing-library/jest-dom';

describe('DataRequirementsPanel', () => {
  it('renders content inside JSON tab', () => {
    render(mantineRecoilWrap(<DataRequirementsJSON />));
    const JSONViewer = screen.getByText('No Data') as HTMLInputElement;
    expect(JSONViewer).toBeInTheDocument();
  });
});
