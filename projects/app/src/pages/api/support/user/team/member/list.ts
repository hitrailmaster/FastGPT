import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonRes } from '@fastgpt/service/common/response';
import { connectToDatabase } from '@/service/mongo';
import { getTeamMemberList } from '@fastgpt/service/support/user/team/controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
    const { teamId } = req.query as { teamId: string };

    if (teamId) {
      //   const { tmbId, teamOwner } = await authApp({ req, authToken: true, appId, per: 'w' });

      const findResponse = await getTeamMemberList(teamId);

      return jsonRes(res, {
        data: findResponse
      });
    }
  } catch (err) {
    jsonRes(res, {
      code: 500,
      error: err
    });
  }
}
