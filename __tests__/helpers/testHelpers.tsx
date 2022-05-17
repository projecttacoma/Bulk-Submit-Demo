/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useEffect } from 'react';
import { RecoilRoot, RecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export function mantineRecoilWrap(children: JSX.Element) {
  return (
    <ColorSchemeProvider
      colorScheme="light"
      toggleColorScheme={() => {
        void 0;
      }}
    >
      <RecoilRoot>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'light' }}>
          <NotificationsProvider position="top-center">{children}</NotificationsProvider>
        </MantineProvider>
      </RecoilRoot>
    </ColorSchemeProvider>
  );
}

export const mockResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

/*
 * Generate a mock implementation for `fetch` with any desired 200 OK response
 * Use any type to avoid writing out every property of `fetch` responses
 */
export function getMockFetchImplementation(desiredResponse: any) {
  return jest.fn(
    () =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(desiredResponse)
      }) as any
  );
}

/*
 * Generate a mock implementation for `fetch` with any desired 200 OK response
 * Adds a delay before resolving the request
 * Use any type to avoid writing out every property of `fetch` responses
 */
export function getMockSlowFetchImplementation(desiredResponse: any, delay: number) {
  return jest.fn(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            json: jest.fn().mockResolvedValue(desiredResponse)
          });
        }, delay);
      }) as any
  );
}

/*
 * Generate a mock implementation that rejects a `fetch` call with a specific error
 */
export function getMockFetchImplementationError(errorMessage: string) {
  return jest.fn(() => Promise.reject(new Error(errorMessage)));
}

/*
 * Generate a functional component that can hardcode the value of a recoil atom
 */
export function getMockRecoilState<T>(atom: RecoilState<T>, value: T) {
  return () => {
    const setMockState = useSetRecoilState(atom);
    useEffect(() => {
      setMockState(value);
    }, [setMockState]);
    return null;
  };
}

/*
 * Generate a functional component that can observe changes to a recoil atom
 */
export function getRecoilObserver<T>(atom: RecoilState<T>, onChange: (value: T) => void) {
  return () => {
    const value = useRecoilValue(atom);
    useEffect(() => {
      onChange(value);
    }, [value]);
    return null;
  };
}
