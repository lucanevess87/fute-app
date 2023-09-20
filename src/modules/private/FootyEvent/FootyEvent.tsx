import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { useGetFootyEvent } from '@/api/FootyEvent/hooks/useGetFootyEvent';
import { CButton } from '@/components/CButton';
import { InputTextField } from '@/components/InputTextField';
import { ReturnButton } from '@/components/ReturnButton';

import { PlayersTable } from './PlayersTable';

export type FootyEventFormType = {
  teams: {
    teamName: string;
    victoriesQty: number;
    players: { name: string; goals: number; assists: number }[];
  }[];
};

export const FootyEvent = () => {
  const { query } = useRouter();
  const id = query['footy-event'];
  const { data } = useGetFootyEvent({ id: id as string });

  const { control, register, handleSubmit, reset } = useForm<FootyEventFormType>({
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });

  const { fields: teamsFields } = useFieldArray({ name: 'teams', control });

  useEffect(() => {
    reset({
      teams: data?.data?.teams.map((team) => ({
        teamName: team.name,
        victoriesQty: team.victories,
        players: team.players.map((player) => ({
          name: player.name,
          goals: player.goals,
          assists: player.assists,
        })),
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleFinishEvent = (data: FootyEventFormType) => {
    console.log(data);
  };

  return (
    <Flex flexDir="column" height="100%" justifyContent="space-between">
      <Flex flexDir="column" mt="2rem" gap="1rem">
        <Grid templateColumns="repeat(4, 1fr)">
          <GridItem colSpan={1}>
            <ReturnButton />
          </GridItem>
          <GridItem colSpan={2} display="flex" alignItems="center" justifyContent="center">
            <Text fontWeight="bold" fontSize="lg">
              {data?.data.footy.name}
            </Text>
          </GridItem>
          <GridItem />
        </Grid>
        <Flex
          flexDir="column"
          gap="2rem"
          justifyContent="flex-start"
          as="form"
          onSubmit={handleSubmit(handleFinishEvent)}
        >
          {teamsFields.map((team, teamIndex) => (
            <Flex flexDir="column" gap="1rem" key={team.id} justifyContent="center" maxWidth="100%">
              <Flex justifyContent="flex-start" alignItems="center" gap="2rem">
                <Text fontWeight="bold" textAlign="center">
                  {team.teamName}
                </Text>
                <Flex gap="1rem" alignItems="center">
                  <Text fontWeight="bold">Vitórias</Text>
                  <InputTextField
                    type="number"
                    label=""
                    {...register(`teams.${teamIndex}.victoriesQty`, {
                      valueAsNumber: true,
                    })}
                  />
                </Flex>
              </Flex>
              <PlayersTable index={teamIndex} control={control} register={register} />
            </Flex>
          ))}

          <Flex justifyContent="flex-end">
            <CButton label="Finalizar" borderRadius="md" height="2.1rem" w="5.5rem" type="submit" />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
