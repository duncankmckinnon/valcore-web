import JSZip from "jszip";

const SKILL_CONTENTS_API =
  "https://api.github.com/repos/duncankmckinnon/valcore/contents/src/valcore/skills/use-valcore?ref=main";

type GithubContent = {
  name: string;
  type: "file" | "dir";
  download_url: string | null;
  url: string;
};

async function githubContents(url: string): Promise<GithubContent[]> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "e-valcore.com skills download",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} while reading the Valcore skill.`);
  }

  const content: unknown = await response.json();
  if (!Array.isArray(content)) {
    throw new Error("GitHub returned an unexpected response for the Valcore skill directory.");
  }
  return content as GithubContent[];
}

async function addDirectory(zip: JSZip, apiUrl: string): Promise<void> {
  const entries = await githubContents(apiUrl);
  await Promise.all(
    entries.map(async (entry) => {
      if (entry.type === "dir") {
        const folder = zip.folder(entry.name);
        if (!folder) throw new Error(`Could not create ZIP folder ${entry.name}.`);
        await addDirectory(folder, entry.url);
        return;
      }

      if (!entry.download_url) {
        throw new Error(`GitHub did not provide a download URL for ${entry.name}.`);
      }
      const response = await fetch(entry.download_url, { next: { revalidate: 3600 } });
      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status} while reading ${entry.name}.`);
      }
      zip.file(entry.name, await response.arrayBuffer());
    }),
  );
}

export async function GET() {
  try {
    const archive = new JSZip();
    const skill = archive.folder("use-valcore");
    if (!skill) throw new Error("Could not create the skill archive.");

    await addDirectory(skill, SKILL_CONTENTS_API);
    const body = await archive.generateAsync({ type: "uint8array", compression: "DEFLATE" });

    return new Response(Buffer.from(body), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="valcore-skills.zip"',
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Unable to package the Valcore skill from GitHub", error);
    return Response.json(
      { error: "The Valcore skill download is temporarily unavailable." },
      { status: 502 },
    );
  }
}
