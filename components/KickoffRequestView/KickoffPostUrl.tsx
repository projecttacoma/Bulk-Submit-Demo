import { Button, TextInput, Grid } from '@mantine/core';

export default function KickoffPostUrl() {
  return (
    <Grid>
      <Grid.Col span={2}>
        <Button fullWidth>POST</Button>
      </Grid.Col>
      <Grid.Col span={10}>
        <TextInput
          disabled
          styles={theme => ({
            input: {
              ':disabled': { color: theme.colorScheme === 'light' ? theme.colors.dark[7] : theme.colors.gray[4] }
            }
          })}
          value={`${process.env.NEXT_PUBLIC_DEQM_SERVER}/Measure/$submit-data`}
        ></TextInput>
      </Grid.Col>
    </Grid>
  );
}
