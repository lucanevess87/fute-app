import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { CButton } from '@/components/CButton';
import { InputNumberField } from '@/components/InputNumberField';
import { InputTextField } from '@/components/InputTextField';
import { ReturnButton } from '@/components/ReturnButton';
import { useFootyStore } from '@/store/FootyStore';

import { validator } from './validator';

type RegisterFormType = {
  name: string;
  location: string;
  startTime: string;
  endTime: string;
  playersPerTeam: number;
  teamsQty: number;
};

export const FootyInfo = () => {
  const setFootyInfo = useFootyStore((state) => state.setFootyInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    mode: 'onChange',
    resolver: yupResolver(validator),
  });

  const router = useRouter();

  const submitRegister = (data: RegisterFormType) => {
    setFootyInfo(data);
    router.push('/cadastrar/selecao-jogadores');
  };

  return (
    <Flex flexDir="column" gap="3rem" mt="2rem" as="form" onSubmit={handleSubmit(submitRegister)}>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1}>
          <ReturnButton />
        </GridItem>
        <GridItem colSpan={2} display="flex" alignItems="center" justifyContent="center">
          <Text fontWeight="bold" fontSize="lg">
            Cadastro de Pelada
          </Text>
        </GridItem>
        <GridItem />
      </Grid>
      <Flex flexDir="column" justifyContent="space-between" gap="1rem" px="1rem">
        <InputTextField
          errorMessage={errors?.name?.message}
          label="Nome da pelada"
          {...register('name')}
        />
        <InputTextField
          errorMessage={errors?.location?.message}
          label="Localização da pelada"
          {...register('location')}
        />
        <InputTextField
          errorMessage={errors?.startTime?.message}
          type="datetime-local"
          label="Horário de início da pelada"
          {...register('startTime')}
        />
        <InputTextField
          errorMessage={errors?.endTime?.message}
          label="Horário de término da pelada"
          type="datetime-local"
          {...register('endTime')}
        />
        <InputNumberField
          errorMessage={errors?.playersPerTeam?.message}
          label="Número de jogadores por time na pelada"
          {...register('playersPerTeam')}
        />
        <InputNumberField
          errorMessage={errors?.teamsQty?.message}
          label="Número de times em cada pelada"
          {...register('teamsQty')}
        />
        <Flex justifyContent="flex-end" mt="2rem">
          <CButton label="Próximo" borderRadius="md" height="2.1rem" w="5.5rem" type="submit" />
        </Flex>
      </Flex>
    </Flex>
  );
};
