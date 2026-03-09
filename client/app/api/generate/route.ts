import { NextResponse } from "next/server";
import { getGithubErrorMessage, getGithubPortfolioData } from "@/lib/github";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "";

  if (!username) {
    return NextResponse.json({ error: "Missing username parameter" }, { status: 400 });
  }

  try {
    const data = await getGithubPortfolioData(username);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API generate failed:", error);
    return NextResponse.json(
      { error: getGithubErrorMessage(error) },
      { status: 400 },
    );
  }
}
