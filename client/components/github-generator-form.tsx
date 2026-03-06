"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function parseGithubUsername(input: string): string | null {
  const value = input.trim();
  if (!value) return null;

  const stripped = value.replace(/^@/, "");
  if (/^[a-zA-Z0-9-]{1,39}$/.test(stripped)) {
    return stripped;
  }

  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(`https://${value}`);
    if (!url.hostname.toLowerCase().includes("github.com")) {
      return null;
    }

    const [firstSegment] = url.pathname.split("/").filter(Boolean);
    if (!firstSegment || !/^[a-zA-Z0-9-]{1,39}$/.test(firstSegment)) {
      return null;
    }

    return firstSegment;
  } catch {
    return null;
  }
}

export default function GithubGeneratorForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = parseGithubUsername(value);

    if (!username) {
      setError("Enter a valid GitHub profile URL or username.");
      return;
    }

    setError(null);
    setIsLoading(true);
    router.push(`/portfolio/${username}`);
  };

  return (
    <form id="generate" className="generate-form" onSubmit={onSubmit}>
      <label htmlFor="github-input" className="sr-only">
        GitHub profile URL
      </label>
      <input
        id="github-input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="https://github.com/yourname"
        autoComplete="off"
      />
      <button className="button solid" type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate My Portfolio"}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
