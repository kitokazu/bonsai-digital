// Blog posts live here as markdown strings. To add a post, append an entry.
// Supported markdown: ## and ### headings, paragraphs separated by blank
// lines, [text](url) links, and images via ![alt](/path). Missing image
// files render as a labeled placeholder until the file is dropped into public/.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "get-a-software-engineering-job-in-japan-2026",
    title: "How to Actually Get a Software Engineering Job in Japan in 2026",
    excerpt:
      "The job boards, salary data, and communities I leaned on during my own job search in Japan, shared in case they help with yours.",
    date: "2026-07-05",
    content: `When I was going through my own job search in Japan, I spent way too long figuring out which sites were actually worth my time. So I wanted to write down the resources I personally used, and how I used them, in case it saves you some of that digging. This isn't the only way to do it, and everyone's path looks a little different. This is just what helped me.

## The two job boards I kept open the whole time

[TokyoDev](https://www.tokyodev.com/) and [Japan Dev](https://japan-dev.com/). People sometimes treat these like rivals, but they cover a pretty similar pool of companies, so I just used both. Running the two together widens your net and there's really no downside.

What made them so useful for me is the filtering. When I applied through big global boards, I often had no idea if a company sponsored visas, hired people who don't speak Japanese, or would even consider a resume from abroad. On TokyoDev you can filter by "no Japanese required," "apply from abroad," and "not a resident yet," and the salary is right there on the listing. That took a huge amount of guesswork out of my search and let me focus on roles that would actually talk to me.

![TokyoDev's filters do the work: apply from abroad, no Japanese required, and salaries right on the listing](/blog/job-japan-2026/tokyodev.png)

The communities around these boards helped me just as much as the listings. TokyoDev has a Discord with thousands of engineers who are living this exact thing, asking questions, sharing job leads, and reviewing each other's resumes. Japan Dev also has its own [Reddit community](https://www.reddit.com/r/JapanDev/) where people discuss job opportunities, companies, and their own search experiences, and it's worth browsing even if you never post. The job board gets you the listing, but the community gets you the context. Chances are someone there has already interviewed at the company you're eyeing and can tell you what it's actually like.

![You can also browse straight by specialty, so go directly to your stack](/blog/job-japan-2026/tokyodev-speciality.png)

## OpenSalary helped me the most during negotiations

This is the one I see people sleep on.

[OpenSalary](https://opensalary.jp/en/roles/software-engineer) is basically the Japan version of Levels.fyi. Real engineers submit their real comp, and you can see it broken down by company, by role, and by years of experience. Base, bonus, equity, all of it.

I used this directly when I was applying, and it made a real difference for me. Walking into a salary conversation already knowing roughly what people at that company make at your level takes so much of the stress and guesswork out of it. It's hard to know your worth in a market you're new to, and this was the closest thing I found to an honest answer.

It's also just a good way to discover companies in the first place. Sorting by compensation surfaces well-paying companies you might never have heard of otherwise, and I found a few names to target that way before I ever saw them on a job board.

The numbers also genuinely surprised me. There are a lot of engineering jobs in Japan paying well above the "average Japanese salary" you've probably seen thrown around. More on that in a sec.

![OpenSalary's real numbers: compensation by years of experience for software engineers in Japan](/blog/job-japan-2026/compensation-graph.png)

One honest thing though. OpenSalary skews toward the modern, English-friendly tech scene. If that's the part of the market you're targeting, it's a good picture. Just know it's not showing you traditional SIer work at older Japanese firms, which tends to pay quite a bit less. It's a slice of the market, not the whole thing.

## LinkedIn worked better here than I expected

In the US, [LinkedIn](https://www.linkedin.com/feed/) can feel like posting a message in a bottle and watching it sink. Japan felt different to me, and it's one of those things nobody told me before I got here.

The engineer market here isn't nearly as saturated. In my experience, recruiters still genuinely reach out, actual humans sending actual messages about actual roles. What worked for me wasn't spamming a hundred applications. It was keeping my profile sharp, turning on open-to-work, making my tech stack obvious at a glance, and letting some of the inbound come to me.

Fair warning, this worked a lot better once I had a couple years of experience. If you're fresh out with an empty profile, the recruiter messages will be slower to arrive. But even then, it's worth getting the profile right now so it's already warm when you do have the experience.

![An actual recruiter message from my inbox: up to 15M yen plus stock options](/blog/job-japan-2026/linkedin.png)

## A few more resources worth knowing about

A couple of things that didn't fit neatly above but deserve a mention.

If you're bilingual in Japanese and English, especially as a student or early in your career, look into the [Boston Career Forum](https://careerforum.net/en/event/bos/). It's the biggest job fair for Japanese-English bilingual talent, held every fall in Boston, and a lot of Japanese companies recruit there directly, with some running interviews during the event itself. I know people who got offers through it, and if you fit the profile it can compress months of job hunting into a weekend.

And while I mentioned that global job boards were hit or miss for me, [Indeed Japan](https://jp.indeed.com/) is a different story from the global Indeed experience. It has a huge volume of local listings, mostly in Japanese. If your Japanese is decent, it opens up a much wider slice of the market than the English-focused boards ever will, especially outside the Tokyo startup bubble.

## What the TokyoDev survey taught me

TokyoDev runs a developer survey every year, and [the 2025 one](https://2025.surveys.tokyodev.com/en-US) had almost a thousand engineers in Japan respond. A few numbers really stood out to me.

Median comp was 9.5 million yen, up a full million from the year before. Compare that to the country-wide "average software engineer" number that floats around online, which is closer to 5 million. Same job title, very different worlds, and the gap mostly comes down to which part of the market you're in.

It scales with experience too. Under a year in, median was 2.8 million. Twenty-plus years, 14.2 million. So the early years can be humble, but the ceiling is real and it climbs fast.

![TokyoDev 2025 survey: median compensation climbs steeply with years of experience](/blog/job-japan-2026/survey-graph.png)

Here's the stat that made me sit up though. The more English you use at work, the more you tend to make. People who never used English at work sat around 5.5 million. People who used it exclusively? 10.5 million. Nearly double. And it's not just because those are more senior people, since the pattern holds even when you compare engineers with the same years of experience.

The reason is worth understanding. The companies running in English tend to be the ones using modern engineering practices, real code review, CI, automated testing, all that. And those companies pay up because they want skilled people. So English isn't magically making anyone richer. It's a signal that a company has its act together and pays accordingly, and those are the companies worth pointing yourself at.

Oh, and since everyone asks: 94% of respondents said they use AI tools regularly, and a third of them are generating at least half their code with it. Funny enough, the more experienced folks used it less. Take from that what you will.

## A couple of honest caveats

Two things I wish someone had told me earlier.

First, junior roles that require zero Japanese are rare. The high-paying English-friendly companies mostly want experienced developers, because they can hire from the entire planet and afford to be picky. If you're junior, the roles that will take you usually involve some Japanese. That's not meant to discourage you, it's just the reality of the map, and it's better to plan around it. Learning some Japanese compounds in more ways than one.

Second, international companies still pay the most, around 13.5 million median, but that lead is shrinking every year. And interestingly, it's not shrinking because Japanese companies are suddenly paying more. It's shrinking because the foreign firms are quietly paying less than they used to. So don't sleep on good Japanese companies, and don't assume a foreign logo automatically means a bigger check anymore.

## Wrapping up

If I had to compress my own approach: I kept TokyoDev and Japan Dev open and used the filters, checked OpenSalary before any salary conversation so I wasn't walking in blind, and kept my LinkedIn in good shape so recruiters could find me. The market here is genuinely good, but it's not a fairy tale, especially early on.

These resources got me to the starting line, and I hope they do the same for you. The resume, the projects, and the actual interviews are still yours to carry. But you don't have to figure out where to look from scratch, and honestly, that was the hardest part for me.

Good luck with your search.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
