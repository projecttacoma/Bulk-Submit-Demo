/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  getMockFetchImplementation,
  getMockFetchImplementationError,
  mantineRecoilWrap,
  mockResizeObserver
} from '../helpers/testHelpers';
import MeasureSelect from '../../components/MeasureSelect';

const exampleMeasureWithName: fhir4.Measure = {
  resourceType: 'Measure',
  status: 'draft',
  url: 'http://example.com/Measure/example-measure-id',
  id: 'example-measure-with-name',
  name: 'example-measure-name'
};

const exampleMeasureWithoutName: fhir4.Measure = {
  resourceType: 'Measure',
  status: 'draft',
  url: 'http://example.com/Measure/example-measure-id',
  id: 'example-measure-without-name'
};

const bundleWithMeasure: fhir4.Bundle = {
  resourceType: 'Bundle',
  type: 'searchset',
  entry: [
    {
      resource: exampleMeasureWithName
    },
    {
      resource: exampleMeasureWithoutName
    }
  ]
};

describe('MeasureSelect', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;

  describe('ok response tests', () => {
    beforeAll(() => {
      global.fetch = getMockFetchImplementation(bundleWithMeasure);
    });

    it('should render select box', async () => {
      await act(async () => {
        render(mantineRecoilWrap(<MeasureSelect />));
      });

      const select = screen.getByPlaceholderText('Measure ID') as HTMLInputElement;

      expect(select).toBeInTheDocument();
    });

    it('should should render an option with measure from response', async () => {
      await act(async () => {
        render(mantineRecoilWrap(<MeasureSelect />));
      });

      const select = screen.getByPlaceholderText('Measure ID') as HTMLInputElement;

      await act(async () => {
        fireEvent.click(select);
      });

      const options = screen.getAllByRole('option') as HTMLOptionElement[];

      expect(options).toBeDefined();
      expect(options).toHaveLength(2);
      expect(options[0]).toBeInTheDocument();
      expect((options[0].attributes as any).url.value).toEqual(exampleMeasureWithName.url);
    });

    it('should update selected value to measure ID', async () => {
      await act(async () => {
        render(mantineRecoilWrap(<MeasureSelect />));
      });

      const select = screen.getByPlaceholderText('Measure ID') as HTMLInputElement;

      expect(select.value).toEqual('');

      await act(async () => {
        fireEvent.change(select, { target: { value: exampleMeasureWithName.id } });
      });

      expect(select.value).toEqual(exampleMeasureWithName.id);
    });

    it('should display id and name when provided', async () => {
      await act(async () => {
        render(mantineRecoilWrap(<MeasureSelect />));
      });

      const select = screen.getByPlaceholderText('Measure ID') as HTMLInputElement;

      await act(async () => {
        fireEvent.click(select);
      });

      const text = screen.getByText(`${exampleMeasureWithName.name} (${exampleMeasureWithName.id})`);
      expect(text).toBeInTheDocument();
    });

    it('should default to display id when name is absent', async () => {
      await act(async () => {
        render(mantineRecoilWrap(<MeasureSelect />));
      });

      const select = screen.getByPlaceholderText('Measure ID') as HTMLInputElement;

      await act(async () => {
        fireEvent.click(select);
      });

      const text = screen.getByText(`${exampleMeasureWithoutName.id}`);
      expect(text).toBeInTheDocument();
    });
  });

  describe('error response tests', () => {
    beforeAll(() => {
      global.fetch = getMockFetchImplementationError('example error');
    });

    it('should show error notification for bad response', async () => {
      await act(async () => {
        render(mantineRecoilWrap(<MeasureSelect />));
      });

      const errorNotif = screen.getByRole('alert') as HTMLDivElement;
      expect(errorNotif).toBeInTheDocument();

      const errorMessage = within(errorNotif).getByText(/example error/);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
