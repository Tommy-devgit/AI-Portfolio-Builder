import { NextResponse } from "next/server";
import { getGithubErrorMessage } from "@/lib/services/github.service";
import { getGithubPortfolioData } from "@/lib/services/portfolio.service";

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
