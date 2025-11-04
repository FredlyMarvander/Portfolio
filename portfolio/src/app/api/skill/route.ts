import { SkillModel } from "@/db/models/SkillModel";
import { errHandler } from "@/helpers/errHandler";

export async function GET(request: Request) {
  try {
    const data = await SkillModel.getAllSkills();
    return Response.json(data);
  } catch (error) {
    return errHandler(error);
  }
}
