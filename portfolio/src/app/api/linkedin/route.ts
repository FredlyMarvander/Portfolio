import { LinkedInModel } from "@/db/models/LinkedInModel";

export async function GET(request: Request) {
  const data = await LinkedInModel.getAllLinkedInPosts();

  return Response.json(data);
}
