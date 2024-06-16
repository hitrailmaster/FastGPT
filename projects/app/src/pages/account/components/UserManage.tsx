import React from 'react';
import { useUserStore } from '@/web/support/user/useUserStore';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Select
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  TeamMemberRoleEnum,
  TeamMemberRoleMap,
  TeamMemberStatusEnum,
  TeamMemberStatusMap
} from '@fastgpt/global/support/user/team/constant';
import { addTeamMember, getTeamMembers } from '@/web/support/user/team/api';
import { useForm } from 'react-hook-form';
import MyModal from '@/components/MyModal';
import { useToast } from '@/web/common/hooks/useToast';

const UserManage = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  const { toast } = useToast();
  const {
    data: userList = [],
    isLoading: isGetting,
    refetch
  } = useQuery([userInfo?.team.teamId], () => getTeamMembers(userInfo?.team.teamId as string));

  const { mutate: onclickAdd, isLoading: isDeleting } = useMutation({
    mutationFn: ({
      userName,
      password,
      role
    }: {
      userName: string;
      password: string;
      role: TeamMemberRoleEnum;
    }) =>
      addTeamMember({
        userName,
        password,
        role,
        teamId: userInfo?.team.teamId as string
      }),
    onSuccess() {
      setIsOpen(false);
      refetch();
    },
    onError() {
      toast({
        title: '用户名重复',
        status: 'error'
      });
    }
  });

  // const { mutate: onclickFreeze, isLoading: isFreezing } = useMutation({
  //     mutationFn: ({ id }: { id: string;}) => addTeamMember({
  //         id
  //     }),
  //     onSuccess() {
  //         setIsOpen(false)
  //         refetch();
  //     }
  // });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>();

  const [isOpen, setIsOpen] = React.useState(false);

  console.log(userInfo, userList);
  return (
    <TableContainer mt={2} position={'relative'} minH={'300px'}>
      <header style={{ margin: '10px' }}>
        <Button onClick={() => setIsOpen(true)}>添加新用户</Button>
      </header>
      <Table>
        <Thead>
          <Tr>
            <Th>用户名</Th>
            <Th>用户类型</Th>
            <Th>用户状态</Th>
            <Th>创建时间</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody fontSize={'sm'}>
          {userList.map(({ _id, name, role, status, createTime }) => (
            <Tr key={_id}>
              <Td>{name}</Td>
              <Td>{t(TeamMemberRoleMap[role as TeamMemberRoleEnum].label)}</Td>
              <Td>{t(TeamMemberStatusMap[status as TeamMemberStatusEnum].label)}</Td>
              <Td>{dayjs(createTime).format('YYYY/MM/DD HH:mm:ss')}</Td>
              <Td>
                {/* <Button isLoading={isFreezing} onClick={() => onclickFreeze({ id: _id })}>冻结</Button> */}
                {/* <Button style={{ marginLeft: 10 }}>删除</Button> */}
              </Td>
              {/* <Td>
                            <Menu autoSelect={false} isLazy>
                                <MenuButton
                                    _hover={{ bg: 'myWhite.600  ' }}
                                    cursor={'pointer'}
                                    borderRadius={'md'}
                                >
                                    <MyIcon name={'more'} w={'14px'} p={2} />
                                </MenuButton>
                                <MenuList color={'myGray.700'} minW={`120px !important`} zIndex={10}>
                                    <MenuItem
                                        onClick={() =>
                                            setEditData({
                                                _id,
                                                name,
                                                limit,
                                                appId
                                            })
                                        }
                                        py={[2, 3]}
                                    >
                                        <MyIcon name={'edit'} w={['14px', '16px']} />
                                        <Box ml={[1, 2]}>{t('common.Edit')}</Box>
                                    </MenuItem>
                                    <MenuItem onClick={() => onclickRemove(_id)} py={[2, 3]}>
                                        <MyIcon name={'delete'} w={['14px', '16px']} />
                                        <Box ml={[1, 2]}>{t('common.Delete')}</Box>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* <Loading loading={isGetting || isDeleting} fixed={false} /> */}
      <MyModal
        isOpen={isOpen}
        h={['50vh', '400px']}
        minW={['90vw', '600px']}
        title={'添加用户'}
        isCentered
        onClose={() => setIsOpen(false)}
      >
        <form
          onSubmit={handleSubmit((params) => {
            onclickAdd(params);
          })}
          style={{ padding: 20 }}
        >
          <FormControl mt={4} isInvalid={!!errors.userName}>
            <Input
              placeholder={'请输入用户名'}
              size={['md', 'lg']}
              {...register('userName', {
                required: '用户名不能为空'
              })}
            ></Input>
            <FormErrorMessage position={'absolute'} fontSize="xs">
              {/* {!!errors.username && errors.username.message} */}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={8} isInvalid={!!errors.password}>
            <Input
              type={'password'}
              size={['md', 'lg']}
              placeholder={'密码'}
              {...register('password', {
                required: '密码不能为空',
                maxLength: {
                  value: 20,
                  message: '密码最多 20 位'
                }
              })}
            ></Input>
            <FormErrorMessage position={'absolute'} fontSize="xs">
              {/* {!!errors.password && errors.password.message} */}
            </FormErrorMessage>
          </FormControl>
          <FormControl mt={8} isInvalid={!!errors.role}>
            <Select
              placeholder={'请选择用户类型'}
              {...register('role', {
                required: '用户类型不能为空'
              })}
            >
              {Object.keys(TeamMemberRoleMap).map((i) => (
                <option key={i} value={i}>
                  {t(TeamMemberRoleMap[i as TeamMemberRoleEnum].label)}
                </option>
              ))}
            </Select>
            <FormErrorMessage position={'absolute'} fontSize="xs">
              {/* {!!errors.password && errors.password.message} */}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            mt={5}
            w={'100%'}
            size={['md', 'lg']}
            colorScheme="blue"
            marginTop={20}
          >
            添加
          </Button>
        </form>
      </MyModal>
    </TableContainer>
  );
};

export default UserManage;
