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
    slug: "claude-on-the-go",
    title: "Claude On The Go",
    excerpt:
      "You can now run Claude Code from your phone. Here's how Remote Control and Dispatch actually work, what they're great at, and where they still fall short.",
    date: "2026-07-06",
    content: `Quick story. A few weeks ago I kicked off a big refactor on my laptop, went to grab dinner, and spent the whole meal wondering if it had finished or if it was sitting there waiting for me to approve something. Turns out there's now a real answer to that problem, two of them actually, and I've been using both enough to have opinions.

Anthropic shipped two features that let you work with Claude away from your desk: Remote Control and Dispatch. They sound similar on paper, but they solve pretty different problems. So here's my honest breakdown of what each one does, what I like, and where they still fall short.

## Remote Control: your terminal session, but in your pocket

[Remote Control](https://code.claude.com/docs/en/remote-control) connects a Claude Code session running on your machine to claude.ai/code or the Claude mobile app. You start a session at your desk, and then you can keep steering it from your phone on the couch, on the train, or from a browser on a completely different computer.

Getting it going is stupidly easy. If you're already in a session, you just type /remote-control (or /rc if you're lazy like me) and it carries your current conversation over. You can also launch with the --remote-control flag, or run "claude remote-control" in a project folder to start a dedicated server mode that can host multiple sessions at once. Either way, you get a session URL, and if you hit spacebar it shows a QR code. Scan it with your phone and boom, your terminal session is now on your phone.

![Scanning the Remote Control QR code to open a terminal session on a phone](/blog/claude-on-the-go/remote-control-qr.png)

Here's the part that matters though. The session never leaves your machine. Your laptop keeps doing all the actual work, and the phone or browser is just a window into it. That means Claude still has your full local setup: your filesystem, your MCP servers, your project config, all of it. Typing @ on your phone even autocompletes file paths from your local project, which feels a little surreal the first time.

The conversation stays in sync across every connected device too. You can send a message from your terminal, then follow up from your phone, then come back to the terminal, and it's all one continuous thread. And if your laptop takes a nap or your wifi hiccups, the session reconnects on its own when the machine comes back online.

One more thing worth knowing: this pairs with mobile push notifications. Claude can ping your phone when a long task finishes or when it needs a decision from you. You can even ask for it directly, like "notify me when the tests finish." That alone has changed how I run long tasks. I used to babysit the terminal. Now I just walk away.

## Where Remote Control hits its limits

Now for the honest part, because it's not magic.

The big one: your local process has to keep running. Remote Control is a window into your machine, so if you close the terminal, quit VS Code, or your laptop dies, the session is gone. If your machine is awake but offline for more than about ten minutes, the session times out too. So "coding from the beach" really means "coding from the beach while your laptop stays alive and connected back home."

There are also some practical constraints. It needs a Pro, Max, Team, or Enterprise plan, and it doesn't work with plain API keys. Outside of server mode, each Claude Code instance only supports one remote session at a time. And a handful of commands that open interactive pickers in the terminal, like /resume, only work from the local CLI, not from your phone.

It's also still in research preview, so expect it to keep evolving. But honestly, for what it is, it already feels solid.

Oh, and quick side note since people mix these up: there's a related feature called teleport that goes the opposite direction. Remote Control pushes your local session out to your phone. Teleport, via "claude --teleport", pulls a cloud session you started on the web or mobile down to your local machine. Push versus pull. Once that clicked for me, I stopped confusing them.

## Dispatch: texting your computer a to-do list

[Dispatch](https://claude.com/blog/dispatch-and-computer-use) is the other half of this story, and it's a different vibe entirely. Remote Control is about steering a session you already started. Dispatch is about starting work when you're nowhere near your computer at all.

The setup: you pair the Claude mobile app with the Claude desktop app on your Mac or Windows machine. After that, you can message a task from your phone, and your desktop picks it up and runs with it. It can spawn a Claude Code session for coding work, dig through files, or handle whatever you threw at it, and you check the finished work when you're back at your machine. It's basically fire and forget. You send the task, go live your life, and come back to results.

![Sending a task from the Claude mobile app while the desktop handles it at home](/blog/claude-on-the-go/dispatch-phone.png)

I've used it for things like "clean up the TODOs in that branch and run the tests" from the train, and it genuinely worked. There's something very funny about your computer doing your job while you're holding a phone in one hand and a coffee in the other.

## Computer use is where it gets wild

Here's the part of Dispatch that made me sit up. When a task involves an app that Claude has no direct integration for, it can fall back to computer use, meaning it literally controls your mouse, keyboard, and screen. It points, clicks, types, and navigates the actual UI like a very patient intern.

The way it prioritizes is sensible. If there's a proper connector or tool integration, Claude uses that first, since it's faster and more reliable. If the task is browser work and you have Claude in Chrome set up, it drives the browser. And only when neither applies does it reach for full computer use to operate desktop apps directly. You can even mix them in one task, like pulling data from a desktop app and then entering it into a web portal.

This closes a gap that used to be a hard wall. Before, if an app had no API and no integration, Claude simply couldn't touch it. Now the answer is "it can see your screen and click things," which covers basically everything, just more slowly.

## Where Dispatch falls short

Time for the reality check, because this one has sharper edges than Remote Control.

First, your desktop has to be on, awake, and running the desktop app. If your machine went to sleep, your dispatch is going nowhere. Second, computer use is slow compared to a direct integration, and Anthropic says this themselves: working through the screen takes longer, and complex tasks sometimes need a second try. In my experience that tracks. Simple, well-described tasks land fine. Vague or multi-step stuff can wander.

Then there's the trust question. You're letting an AI click around on your actual computer while you're not watching it. Anthropic's own advice is to start with apps you trust and keep it away from sensitive data, and some applications are restricted by default for exactly this reason. I think that's the right instinct. I'm happy to let it reorganize a project folder. I'm not letting it anywhere near my banking app, and neither should you.

And like Remote Control, it's in research preview and needs a Pro or Max subscription, so availability depends on your plan.

## So which one do you actually use?

After a few weeks with both, here's how it shakes out for me. Remote Control is for work in progress. I start something real at my desk, and Remote Control means stepping away doesn't mean stopping. Dispatch is for work that hasn't started yet. I'm out, I remember something needs doing, I message it in, and my desk handles it.

The mental model that stuck for me: Remote Control is a leash, Dispatch is a boomerang. One keeps you connected to something running, the other you throw and it comes back with results.

## Wrapping up

Neither of these is perfect yet, and both wear the research preview label for a reason. But the direction is obvious and honestly pretty exciting. The assumption that serious dev work only happens when you're physically at the keyboard is quietly dissolving.

For a small studio like ours, that's not a gimmick, it's real leverage. Client pings you about a quick fix while you're out? Dispatch it. Long migration running during lunch? Watch it from your phone and approve the scary steps with your thumb. It's the kind of thing that sounds like a demo until it saves you a trip back to the office, and then it just becomes how you work.

If you want to dig deeper, the [Remote Control docs](https://code.claude.com/docs/en/remote-control) cover setup in detail, and Anthropic's [Dispatch announcement](https://claude.com/blog/dispatch-and-computer-use) is a good read on the computer use side. Give them a try. Worst case, you go back to being chained to your desk like it's 2024.`,
  },
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
