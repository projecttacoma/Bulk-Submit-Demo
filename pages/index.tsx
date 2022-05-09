import type { NextPage } from 'next';
import Head from 'next/head';
import { AppShell, Header, Grid, Center } from '@mantine/core';
import AbacusHeader from '../components/AbacusHeader';
import MeasureSelect from '../components/MeasureSelect';
import ExportURLInput from '../components/ExportURLInput';
import DataRequirementsPanel from '../components/DataRequirementsView/DataRequirementsPanel';
import ResetInputsButton from '../components/ResetInputsButton';
import KickoffRequestPanel from '../components/KickoffRequestView/KickoffRequestPanel';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bulk Submit Data Demo Application</title>
      </Head>
      <AppShell padding="md" header={<Header height={60}>{<AbacusHeader></AbacusHeader>}</Header>}>
        <Grid>
          <Grid.Col span={6}>
            <MeasureSelect />
          </Grid.Col>
          <Grid.Col span={6}>
            <ExportURLInput />
          </Grid.Col>
          <Grid.Col span={12}>
            <Center>
              <ResetInputsButton />
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <KickoffRequestPanel />
          </Grid.Col>
          <Grid.Col span={6}>
            <DataRequirementsPanel />
          </Grid.Col>
        </Grid>
      </AppShell>
    </>
  );
};

export default Home;
