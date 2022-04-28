import { useEffect, useState } from 'react';
import { APIParams, DRQuery } from '../../types/DataRequirementsFiltersTypes';
import { Textarea, Text, Grid, Center } from '@mantine/core';

/**
 * Converts data requirements array to type and typeFilters and displays them
 * @param dataRequirements {Array} the dataRequirements as returned by fqm-execution
 * @returns tsx for the data requirements filters visualizer
 */
export function DataRequirementsFilters({ dataRequirements }: { dataRequirements: fhir4.DataRequirement[] | null }) {
  const [types, setTypes] = useState('');
  const [typeFilters, setTypeFilters] = useState<string | undefined>('');
  useEffect(() => {
    if (dataRequirements) {
      const { _type, _typeFilter } = generateTypesAndTypeFilters(dataRequirements);
      setTypes(_type);
      setTypeFilters(_typeFilter);
    }
  }, [dataRequirements]);

  if (dataRequirements) {
    return (
      <Grid>
        <Grid.Col>
          <Textarea label="_type" value={types} readOnly />
        </Grid.Col>
        <Grid.Col>
          <Textarea label="_typeFilter" value={typeFilters} autosize maxRows={5} readOnly />
        </Grid.Col>
      </Grid>
    );
  } else {
    return (
      <Center>
        <Text>No Data</Text>
      </Center>
    );
  }
}

/**
 * Takes in a FHIR dataRequirements object and returns an object containing the types and typeFilters
 * formatted for query to a bulk export server
 * @param dataRequirements: An array of data requirements as returned from fqm-execution
 * @returns APIParams: An object containing the _type and _typeFilter strings to be appended to the URL as parameters
 */
function generateTypesAndTypeFilters(dataRequirements: fhir4.DataRequirement[]): APIParams {
  const queries: DRQuery[] = [];

  // converts dataRequirements output into a format easily parsed into URL params
  dataRequirements.forEach(dr => {
    if (dr.type) {
      const q: DRQuery = { endpoint: dr.type, params: {} };
      if (dr?.codeFilter?.[0]?.code?.[0] && typeof dr.codeFilter[0].code[0].code === 'string') {
        const key = dr?.codeFilter?.[0].path;
        key && (q.params[key] = dr.codeFilter[0].code[0].code);
      } else if (dr?.codeFilter?.[0]?.valueSet) {
        const key = `${dr?.codeFilter?.[0].path}:in`;
        key && (q.params[key] = dr.codeFilter[0].valueSet);
      }
      queries.push(q);
    }
  });
  //take only the unique fhir types
  const uniqTypes = queries.reduce((acc: string[], e) => {
    if (!acc.includes(e.endpoint)) {
      acc.push(e.endpoint);
    }
    return acc;
  }, []);
  const formattedTypes = uniqTypes.join(',');

  let typeFilterString = '';
  const formattedTypeFilter = queries.reduce((acc: string[], e: DRQuery) => {
    //if the params object is empty, we don't want to add any params
    if (Object.keys(e.params).length > 0) {
      acc.push(`${e.endpoint}%3F${new URLSearchParams(e.params).toString()}`);
    }
    return acc;
  }, []);
  typeFilterString = formattedTypeFilter.join(',');

  return { _type: formattedTypes, _typeFilter: typeFilterString };
}
