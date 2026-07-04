// Blog posts live here as markdown strings. To add a post, append an entry.
// Supported markdown: ## and ### headings, paragraphs separated by blank
// lines, [text](url) links, and images via ![alt](/path). Missing image
// files render as a labeled placeholder until the file is dropped into public/.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  readingMinutes: number;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "get-a-software-engineering-job-in-japan-2026",
    title: "How to Actually Get a Software Engineering Job in Japan in 2026",
    excerpt:
      "The tools you actually need to land a dev job in Japan, how to use each one properly, and what the salary data really says.",
    date: "2026-07-05",
    readingMinutes: 7,
    content: `Let me save you a few months of flailing around.

If you want a dev job in Japan, there are basically three tools you need, plus one you're probably ignoring. Most videos and blog posts throw ten links at you and call it a day. That's useless. You don't need ten sites. You need to know which site does which job, and honestly most people use them completely wrong.

I've been doing this in Japan for a while now, worked at some places before, and I know a bunch of people who landed roles through exactly the stuff I'm about to walk through. So this isn't theory. This is the actual playbook.

## The two job boards (yes, use both, stop picking favorites)

[TokyoDev](https://www.tokyodev.com/) and [Japan Dev](https://japan-dev.com/). People treat these like rivals, like you have to pick a team. You don't. They point at basically the same pool of companies, so running both just widens your net. There's no downside. Open both tabs and move on with your life.

Here's why they're good and why the global boards are trash by comparison. When you apply through LinkedIn or Indeed or whatever, you're screaming into a void. You have zero idea if the company sponsors visas, zero idea if they hire people who don't speak Japanese, zero idea if they'll even look at a resume from abroad. It's a coin flip with your time.

TokyoDev and Japan Dev fix that because the filters ARE the product. On TokyoDev you can filter by "no Japanese required," "apply from abroad," and "not a resident yet." The salary is right there on the listing. That's the whole game. You instantly see the roles that will actually talk to you instead of wasting a week on ones that won't.

![TokyoDev's filters do the work: apply from abroad, no Japanese required, and salaries right on the listing](/blog/job-japan-2026/tokyodev.png)

TokyoDev also has a genuinely big community behind it. There's a Discord with thousands of engineers who are living this exact thing, asking questions, dropping job leads, reviewing each other's resumes. Japan Dev has its own Reddit where people talk through opportunities too. This part matters more than you'd think, because the job board gets you the listing but the community gets you the context. Someone in that Discord has already interviewed at the company you're eyeing and can tell you if it's a good place or a nightmare.

![You can also browse straight by specialty, so go directly to your stack](/blog/job-japan-2026/tokyodev-speciality.png)

## OpenSalary is your negotiation weapon, not your application weapon

This is the one people sleep on.

[OpenSalary](https://opensalary.jp/en/roles/software-engineer) is basically the Japan version of Levels.fyi. Real engineers submit their real comp, and you can see it broken down by company, by role, and by years of experience. Base, bonus, equity, all of it.

I used this directly when I was applying, and it flat out changes how you negotiate. You walk into the salary conversation already knowing what people at that exact company make at your level. That's an unfair advantage and you should absolutely use it. Companies are counting on you not knowing your worth. Don't give them that.

And you will be genuinely surprised at the numbers. There are a lot of engineering jobs in Japan paying way better than the "average Japanese salary" you've probably seen thrown around. More on that in a sec.

![OpenSalary's real numbers: compensation by years of experience for software engineers in Japan](/blog/job-japan-2026/compensation-graph.png)

One honest thing though. OpenSalary skews toward the modern, English-friendly tech scene. That's most likely your target anyway so it's fine, but just know it's not showing you the guy doing SIer work at some traditional Japanese firm for way less. It's a slice of the market, not the whole thing. A good slice. Just not the average.

## LinkedIn is weirdly not dead here

I know. In the US, [LinkedIn](https://www.linkedin.com/feed/) feels like posting a message in a bottle and watching it sink. But Japan is different, and this is one of those things nobody tells you.

The engineer market here isn't nearly as saturated. Recruiters are genuinely still out here reaching out to people, actual humans sending actual messages about actual roles. The move is not to spam a hundred applications. The move is to keep your profile sharp, flip on the open-to-work thing, make your tech stack stupidly obvious, and then let the inbound come to you.

Fair warning, this works a lot better once you've got a couple years under your belt. If you're fresh out with an empty profile, the recruiter faucet isn't exactly gushing. But even then, get the profile right now so it's already warm when you do have the experience.

![An actual recruiter message from my inbox: up to 15M yen plus stock options](/blog/job-japan-2026/linkedin.png)

## What the TokyoDev survey actually tells you

TokyoDev drops a developer survey every year, and [the 2025 one](https://2025.surveys.tokyodev.com/en-US) had almost a thousand engineers in Japan respond. A few numbers are worth tattooing on your brain.

Median comp was 9.5 million yen, up a full million from the year before. Now compare that to the country-wide "average software engineer" number that floats around online, which is like 5 million. Same job title, wildly different planet. The gap is basically which world you're playing in.

It scales hard with experience too. Under a year in, median was 2.8 million. Twenty-plus years, 14.2 million. So yeah, early on it's humble, but the ceiling is real and it climbs fast.

![TokyoDev 2025 survey: median compensation climbs steeply with years of experience](/blog/job-japan-2026/survey-graph.png)

Here's the stat that actually made me sit up though. The more English you use at work, the more you make. People who never used English at work sat around 5.5 million. People who used it exclusively? 10.5 million. Damn near double. And before you go "that's just because those are senior people," nope, it holds up even when you compare engineers with the same years of experience.

The reason is kind of sneaky and worth understanding. The companies running in English tend to be the ones using modern engineering practices, real code review, CI, automated testing, all that. And those companies pay up because they want skilled people. So English isn't magically making you richer. It's a signal. It's a flag that says "this is a company that has its act together and pays accordingly." You want to be pointed at those companies.

Oh, and since everyone asks: 94% of respondents said they use AI tools regularly, and a third of them are generating at least half their code with it. Funny enough, the more experienced folks used it less. Take from that what you will.

## The honest part, because I'm not gonna lie to you

Two catches. Read these before you quit your job and buy a plane ticket.

First, junior roles that require zero Japanese are basically a myth. That high-paying English bubble mostly wants experienced developers, because they can pull from the entire planet and afford to be picky. If you're junior, the roles that'll take you almost always involve some Japanese. That's not me being a downer, that's just the map. Plan around it. Learn some Japanese, it compounds.

Second, international companies still pay the most, around 13.5 million median, but that lead is shrinking every year. And here's the part people miss: it's not shrinking because Japanese companies are suddenly paying more. It's shrinking because the foreign firms are quietly paying less than they used to. So don't sleep on good Japanese companies, and don't assume a foreign logo automatically means a bigger check anymore.

## So here's the actual move

Run TokyoDev and Japan Dev at the same time and use the filters. Pull up OpenSalary before any salary conversation so you're not walking in blind. Fix your LinkedIn and let recruiters find you. And go in knowing it's a great market that's also not a fairy tale, especially early on.

These tools get you to the starting line. They line up the door and even crack it open for you. But nobody's dragging you through it. The resume, the projects, the actual walking through the door, that part's still on you.

Now go apply to something.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
