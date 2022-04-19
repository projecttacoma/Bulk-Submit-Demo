import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { AppShell, Navbar, Header, Text, Grid, TextInput } from '@mantine/core';
import AbacusHeader from '../components/AbacusHeader';
import MeasureSelect from '../components/MeasureSelect';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bulk Submit Data Demo Application</title>
      </Head>
      <AppShell padding="md" header={<Header height={60}>{<AbacusHeader></AbacusHeader>}</Header>}>
        <Grid>
          <Grid.Col span={6}>
            <MeasureSelect></MeasureSelect>
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput placeholder="Export URL (Data Source)"></TextInput>
          </Grid.Col>
        </Grid>
      </AppShell>
    </>
  );
};

export default Home;
