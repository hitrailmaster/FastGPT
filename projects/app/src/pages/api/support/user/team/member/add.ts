import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@fastgpt/service/common/response';
import { connectToDatabase } from '@/service/mongo';
import { insertUserToTeam } from '@fastgpt/service/support/user/team/controller';
import { createUser } from '@fastgpt/service/support/user/controller';
import { TeamMemberRoleEnum } from '@fastgpt/global/support/user/team/constant';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { teamId, role, userName, password } = req.body as {
      teamId: string;
      role: TeamMemberRoleEnum;
      userName: string;
      password: string;
    };
    console.log(req.body);
    if (teamId) {
      //   const { tmbId, teamOwner } = await authApp({ req, authToken: true, appId, per: 'w' });

      //   const findResponse = await getTeamMemberList(teamId)

      const user = await createUser({ username: userName, password: password });
      await insertUserToTeam(user._id, teamId, role);

      return jsonRes(res);
    }
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
