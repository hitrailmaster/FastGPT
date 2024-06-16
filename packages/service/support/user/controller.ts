import { hashStr } from '@fastgpt/global/common/string/tools';
import { MongoUser } from './schema';
import { getTeamByAdminUserId, insertUserToTeam } from './team/controller';
import { TeamMemberRoleEnum } from '@fastgpt/global/support/user/team/constant';

export async function authUserExist({ userId, username }: { userId?: string; username?: string }) {
  if (userId) {
    return MongoUser.findOne({ _id: userId });
  }
  if (username) {
    return MongoUser.findOne({ username });
  }
  return null;
}
export async function createUser({ username, password }: { password: string; username: string }) {
  const user = await MongoUser.create({
    username,
    password: hashStr(password)
  });
  return user;
}
export async function createUserAndJoinTeam(
  { username, password, role }: { password: string; username: string; role: TeamMemberRoleEnum },
  adminUserId: string
) {
  const { _id } = await MongoUser.create({
    username,
    password: hashStr(password)
  });

  const tmb = await getTeamByAdminUserId(adminUserId);

  await insertUserToTeam(_id, tmb?.teamId, role);
}
