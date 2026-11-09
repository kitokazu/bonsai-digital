// Blog posts live here as markdown strings. To add a post, append an entry.
// Supported markdown: ## and ### headings, paragraphs separated by blank
// lines, [text](url) links, images via ![alt](/path), and code blocks fenced
// with ~~~ (not backticks, which would end the template string). Missing image
// files render as a labeled placeholder until the file is dropped into public/.

export type BlogCategory = "systemDesign" | "aiTools" | "career" | "security";

export type BlogCoverTone = "sage" | "terracotta" | "ink" | "sand" | "slate" | "mist" | "cream";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  category: BlogCategory;
  // Solid color card on the blog index, used only when the post has no images.
  coverTone?: BlogCoverTone;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-assisted-interviews",
    title: "AI-Assisted Interviews: You Steer, Not the AI",
    excerpt:
      "Interviews where you can use Claude Code for coding and system design sound like easy mode. They're not. The skill being tested is whether you can lead the model instead of following it.",
    date: "2026-11-09",
    category: "career",
    coverTone: "ink",
    content: `I've been interviewing recently, and a couple of the rounds were in a format I hadn't done before: live, AI-assisted interviews. You share your screen, you get a problem, and you're allowed to use an AI coding tool the whole time. I used Claude Code. They told me upfront they didn't care which tool I picked.

My first reaction was honestly something like "oh nice, easy mode." That lasted about ten minutes into my first practice session. It turns out these interviews are hard, just in a different way than the old ones. They're not testing whether you can write the code. They're testing whether you can stay in charge of something that writes code faster than you.

## What the format actually looks like

There were two kinds of rounds.

The coding round looked like a normal coding interview at first. A problem, a small codebase, and an interviewer watching. The difference is that Claude Code was open in my terminal, and the interviewer could see every prompt I typed, every change it made, and what I did with that change.

The system design round was a conversation, like usual. Design a system, talk through the tradeoffs, go deeper where the interviewer pushes. I could use the AI to brainstorm, sanity check numbers, or sketch out a schema, but I was still the one presenting the design and defending it.

In both cases, the thing they watched most closely wasn't the final answer. It was how I got there.

## Your prompts are the new "thinking out loud"

In a traditional interview, you're told to think out loud so the interviewer can follow your reasoning. In an AI-assisted interview, your prompts do a lot of that job. They show how you broke the problem down, what context you thought mattered, which edge cases you were worried about, and whether you had a plan or were just hoping the model did.

A prompt like "solve this problem" says something about you. So does a prompt like "write a function that merges overlapping time slots, sorted by start time, where back-to-back slots stay separate, and add tests for empty input and fully nested slots first." The second one shows you understood the problem before you handed anything off. That's the whole game.

## How I prepared

I used [Hello Interview](https://www.hellointerview.com/) a lot for this. The part that helped most was their mock interviews for this format, where they evaluate your prompts and not just whether you got to a working solution. That was exactly the feedback I needed, because my bad habits were invisible to me.

My first few mocks went about how you'd expect. I'd read the problem, immediately ask the AI to solve it, get back a big chunk of code that looked right, and then spend the rest of the time trying to understand code I hadn't written. The feedback was blunt and fair. I was letting the model pick the approach, accepting large changes without reading them, and going quiet while I waited for it to finish. All three look bad when someone is watching.

After a handful of sessions, my approach flipped. Plan first, then prompt in small steps, then check everything. My solutions didn't get much faster. They got a lot more mine.

## The moment it clicked

Here's the example that stuck with me. In one coding round, part of the task was merging overlapping booking slots for a scheduling feature. I described the function to Claude Code, it wrote a clean implementation, and the tests it wrote alongside it all passed. It looked done.

But before prompting, I'd written down a few edge cases of my own, and one of them was back-to-back bookings. If one meeting ends at 11:00 and the next starts at 11:00, the requirements said those should stay as two separate bookings. The AI's version merged them, because it compared times with "less than or equal" instead of "less than." Its own tests didn't catch it, because it wrote the tests based on its own assumption.

The tempting move was to type "that's wrong, fix it." Instead, I said out loud what the rule was and why, asked it to add a failing test for that exact case first, and only then asked for the fix. It took maybe two minutes. Afterwards, the interviewer mentioned that catching that, and the way I handled it, was the kind of thing they were looking for.

That's when it clicked for me. The AI didn't make a dumb mistake. It made a reasonable assumption about something the requirements were specific about. Catching that gap is the job, and it's exactly what you can't hand off.

The system design round had its own version. I asked the AI to suggest an architecture for a notification service, and it came back with a message queue, a fleet of workers, and a few microservices. For the scale we'd agreed on earlier, a few thousand users, that was way too much. Pushing back and explaining why a simpler setup fit better was a bigger part of the conversation than anything the AI suggested.

## What steering actually looks like

Here's what I ended up doing every time, roughly in this order.

Understand the problem before opening the AI. Restate the requirements and ask the interviewer questions. The AI can't ask the interviewer anything, so whatever is unclear stays unclear unless you deal with it.

Write down your edge cases first. This is the single most useful habit I picked up. If you only test the cases the model thought of, you'll only catch the mistakes it already knows about.

Say your plan out loud, then give the AI small, specific tasks. Not "build the whole thing." One function, one piece, with the constraints spelled out.

Read everything it writes. If you can't explain a line, don't keep it. A good test is whether you could walk the interviewer through the change without looking at the AI's explanation.

Know when to stop prompting. A one-character fix is faster to type yourself, and doing it by hand shows you actually understand the code.

And keep talking. When you accept something, say why. When you reject something, say why. The silence while a model is thinking feels awkward on a call, and it's a good time to explain what you're expecting it to come back with.

## Why I actually like this format

Funnily enough, I came out of these interviews liking them more than the traditional kind. At Bonsai Digital, I work with Claude Code every day, and this is a lot closer to what that looks like. Nobody at work asks me to reverse a linked list on a whiteboard. But I do constantly have to decide what to ask the AI for, check what it gives me, and catch the moment it confidently goes in the wrong direction.

These interviews test that judgment directly. Typing speed and memorized syntax barely matter anymore. Knowing what good looks like, and noticing when you're not getting it, matters a lot.

## Wrapping up

The way I think about it now: the AI is an incredibly fast junior engineer who never asks clarifying questions. It'll happily build exactly what you asked for, even when what you asked for was slightly wrong. Your job in the interview is to be the senior engineer in the room. Set the direction, break down the work, check the output, and own the result.

If you have one of these interviews coming up, practice with the AI the same way you'll use it on the day, and get someone, or something, to look at your prompts. You steer. The AI drives. Don't let those switch.`,
  },
  {
    slug: "designing-a-short-form-news-feed",
    title: "System Design: A Short-Form News Feed for a Caribbean Newsroom",
    excerpt:
      "A news broadcaster wanted a feed of short videos and quick stories for their country. It looks like a TikTok clone, but small islands, prepaid data, and hurricane season change almost every decision.",
    date: "2026-11-09",
    category: "systemDesign",
    content: `A little while ago I talked with a news broadcaster in the Caribbean about building a short-form news feed for their country. Think vertical videos like TikTok or Reels, mixed with quick text stories, all coming from their own reporters. The project didn't end up going ahead, but the problem stuck with me. On the surface it looks like a TikTok clone. Once you dig in, it turns out to be a pretty different system, and most of the interesting decisions come from where it's being built rather than what it is.

So here's how I'd design it.

## What they wanted

The idea was simple. Open the app, and you get the country's news as a feed. Short videos from reporters on the scene, and short written stories for things that don't need video. Breaking news goes to the top and can send a push notification. Everything comes from the newsroom's own team, not from users.

That last part matters more than it sounds, and I'll come back to it.

## The constraints that actually shape the design

Before thinking about servers, I'd write down what makes this place different from Silicon Valley, because those constraints drive almost every decision.

Data is expensive. A lot of people in the region are on prepaid mobile plans, where every megabyte costs real money. A feed that autoplays high quality video is basically a feed that eats your phone credit.

Connections are uneven. Good 4G in town, patchy coverage in rural areas, and everything gets worse during storms. Reporters in the field deal with the same thing when they try to upload.

The audience is small, but it spikes hard. A small country might have under a million people, and on a normal day only a slice of them open the app. But when a hurricane warning goes out, or there's an election, or something big happens, nearly everyone opens it at the same moment. That includes the diaspora. Huge numbers of people from the Caribbean live in the US, Canada, and the UK, and they check home news constantly, especially when family is in the path of a storm.

The team is small. A regional newsroom isn't going to have a platform team. Whatever I build has to be run by one or two engineers, and it can't need someone awake at 3 a.m. to keep it alive.

And hurricane season is a real design input, not an edge case. Power cuts, damaged cell towers, and a newsroom that might be working from wherever they can find a signal.

## What this is not

It's worth saying what we don't need, because it makes the whole thing a lot simpler than it looks.

There's no user-generated content. Every story comes from a reporter the newsroom employs, so there's no upload flood, no moderation pipeline, and no spam problem. The newsroom publishes maybe a few dozen stories a day. TikTok gets millions of uploads.

There's no recommendation engine either. When your whole catalog for the day fits on one screen, you don't need machine learning to decide what to show. Newest first, with breaking news pinned to the top and editors able to pin important stories, is what people actually want from a news app. It's also easier to trust, which matters for a news organization.

So the hard parts aren't where TikTok's hard parts are. Writing is small and easy. Reading is spiky and has to be cheap. That split shapes the whole design.

![The two halves of the system: a small, careful publishing side, and a reading side built to handle everyone showing up at once](/blog/designing-a-short-form-news-feed/architecture.png)

## Some rough numbers

Let's assume a country of about a million people, and that 100,000 of them, plus diaspora, use the app on a normal day. Each person watches around 15 clips, and a clip is about 45 seconds.

Here's the part that surprised me when I worked it out. A 45 second vertical video at a decent 720p quality, around 2 Mbps, is roughly 11 MB. At a lower 360p setting, around 600 kbps, it's about 3.4 MB. At 240p, it's under 2 MB.

So 15 clips a day at 720p is about 165 MB per person per day. At 360p, it's around 50 MB. For someone on a small prepaid bundle, that difference decides whether they keep using the app.

It matters for the broadcaster too. 100,000 people watching 15 clips at 360p comes out to about 5 TB of video served per day, around 150 TB a month. Meanwhile, storing everything the newsroom produces in a year is maybe a couple hundred gigabytes. Storage is basically free here. Bandwidth is where the money goes, and it's the same thing the viewers are paying for on their end. Making video smaller helps both sides at once.

## The publishing side

Reporters get a simple mobile app to record video or write a short story, then send it to the newsroom. The tricky part is the upload. A reporter standing next to a flooded road might have one bar of signal. So uploads go in chunks and pick up where they left off if the connection drops, instead of starting over. The app uploads straight to cloud storage using a signed URL, so the servers never have to handle big video files themselves.

For breaking news, I'd add one trick. Upload a small, low quality version first so editors can review it and publish quickly, then upload the full quality original in the background, or later on wifi. The story goes live in minutes, and the better version swaps in when it arrives.

Once a video lands, a media pipeline takes over. It converts the video into several sizes, from a small 240p version up to 720p, cuts it into short segments for streaming, makes a thumbnail, and generates a first draft of captions with speech-to-text. Captions matter a lot here, since most people scroll with the sound off. But speech-to-text tends to struggle with local accents, and a lot of the region speaks a Creole or patois that these models handle poorly. So the captions are a draft, and an editor fixes them before publishing.

Then everything goes into a newsroom CMS. Editors check the story, fix the captions, add tags like weather or politics, mark it as breaking if needed, and hit publish. Stories, media links, and publish state live in a regular Postgres database. Nothing fancy, because at a few dozen stories a day, it doesn't need to be.

For the video pipeline, I'd start with a managed video service instead of running my own transcoding servers. It costs more per minute of video, but with one or two engineers, not having to babysit a video pipeline is worth a lot. If volume grows later, you can bring it in-house.

## The reading side

This is where the real design work is.

The key idea: everyone in the country sees basically the same feed. There's no personalization to compute per user. So instead of having a server build the feed every time someone opens the app, I'd build it once, every time a story is published, and save it as small static JSON files on a CDN.

The newest stories go into one file, something like latest.json, with the 20 or so most recent items. Older stories go into archive files by date. Once a day is over, its archive file never changes again, so the CDN can cache it forever. Only latest.json changes, and when a story is published, the feed builder rewrites it and tells the CDN to drop the old copy. A feed page looks something like this:

~~~json
{
  "generated_at": "2026-11-09T08:15:00Z",
  "older": "/feed/2026-11-08.json",
  "items": [
    {
      "id": "st_8f21",
      "type": "video",
      "headline": "Flash flood warning for the north coast",
      "breaking": true,
      "published_at": "2026-11-09T08:12:00Z",
      "duration_s": 42,
      "poster": "https://cdn.example.com/v/st_8f21/poster.jpg",
      "stream": "https://cdn.example.com/v/st_8f21/master.m3u8",
      "captions": "https://cdn.example.com/v/st_8f21/captions.vtt",
      "tags": ["weather"]
    },
    {
      "id": "st_8f1c",
      "type": "text",
      "headline": "Parliament passes the new road budget",
      "summary": "Three changes drivers will notice this year.",
      "published_at": "2026-11-09T07:40:00Z",
      "tags": ["politics"]
    }
  ]
}
~~~

The whole thing is a few kilobytes once compressed. When news breaks and everyone opens the app at once, almost every request is answered by the CDN, and the servers behind it barely notice. The rush that would normally take a site down turns into a non-event. Topic filters like "only weather" can happen in the app itself, since all the data is already there.

The CDN also matters for where people are. A lot of internet traffic in the region already routes through Miami, and the diaspora is spread across North America and Europe. A CDN with servers in those places means a fast feed for everyone, whether they're in the capital or in Brooklyn checking on their mom.

## Being careful with people's data

In the app itself, I'd make data saving the default, not a hidden setting. On mobile data, videos start at the lowest quality and only go up if the connection is good, which is exactly what adaptive streaming is built for. Autoplay only loads the first couple of seconds until someone actually stops to watch. Larger downloads, like preloading the next few videos, only happen on wifi.

The app would also keep the last day or so of stories cached on the phone. If you lose signal, you can still read what you already loaded. Text stories are tiny, so they can always be saved for offline reading.

I'd also make every story a lightweight web page that loads fast without the app, with a good preview image and headline. In the Caribbean, a lot of news travels through WhatsApp groups, so a story shared in a family chat needs to open instantly on any phone. For a lot of people, that shared link will be their first contact with the product.

## Push alerts

Breaking news and weather warnings go out as push notifications. People subscribe by topic, so someone can get hurricane alerts without getting every sports score. With an audience this size, sending to everyone takes seconds, so the technical side is easy. The hard part is editorial. Too many alerts and people turn them off, and then they miss the one that actually matters. So I'd put a limit on how many non-emergency alerts can go out per day, the same rate limiting idea from my last post, just aimed at the newsroom instead of at attackers.

## Hurricane mode

This is the part I'd test hardest, because it's when the app matters most and when everything around it is failing.

First, the servers shouldn't be on the island. Everything runs in cloud regions outside the hurricane zone, so a storm that knocks out local power doesn't knock out the app. The CMS is a web app, so editors can publish from any laptop or phone with a connection, even if they can't reach the newsroom.

Second, there's a lite mode. When editors switch it on, the app and website show a text-only version of the feed with the latest updates, shelter locations, and emergency numbers. It's a single tiny page that loads even on a weak 2G connection. In an emergency, a short paragraph that loads in two seconds beats a video that never finishes buffering.

And because the feed is already static files on a CDN, the traffic spike from everyone checking at once is the one thing I'm not worried about. That's the payoff of the earlier decision.

## What I'd build first

With a small team, I wouldn't build all of this on day one. I'd start with the CMS, text stories, video through a managed service, and the static feed on a CDN, shown in a mobile-friendly website instead of native apps. That's enough to find out whether people actually use it. Native apps, push alerts, and the reporter app would come next. Hurricane lite mode would ship before the first hurricane season, no matter what else was on the list.

## Wrapping up

What I like about this problem is how much of the design comes from the setting instead of from the technology. A short video feed is a solved problem in general. A short video feed for a small island, where people pay for every megabyte, the audience shows up all at once, and the infrastructure might literally get hit by a storm, is a much more specific problem. Building the feed once instead of per request, defaulting to small video, and planning for the worst week of the year ends up being most of the design.

The project didn't happen, but I still think about it. Most of the interesting engineering in the world isn't happening at the scale of TikTok. It's happening in places where the constraints are different, and the job is to design for those constraints instead of copying what the big apps do.`,
  },
  {
    slug: "designing-a-rate-limiter",
    title: "System Design: How I'd Build a Rate Limiter",
    excerpt:
      "A walk through one of the classic system design problems: what a rate limiter is for, the five common algorithms and their tradeoffs, and what changes once it has to run across many servers.",
    date: "2026-11-09",
    category: "systemDesign",
    content: `If you've ever built something on top of another company's API, you've hit a rate limit. When we connected Shopify to the e-commerce console we built for a client, a surprising amount of the work was simply staying inside Shopify's limits. So I wanted to look at it from the other side. If I were the one running the API, how would I design the thing that says "slow down"?

It's also one of the most common system design interview questions, and for good reason. It looks small, but it touches algorithms, distributed state, failure handling, and API design all at once. Here's how I'd work through it.

## What a rate limiter is for

A rate limiter caps how many requests someone can make in a given amount of time. Something like 100 requests per minute per user, or 5 login attempts per minute per IP address. Once you go over, your requests get rejected until the window resets.

There are a few good reasons to have one. It stops a single client, whether that's a bug in someone's script or an actual attacker, from taking down the service for everyone. It keeps costs predictable, which matters a lot if each request triggers something expensive like an AI call or a payment check. It makes things fair, so one heavy user doesn't eat all the capacity. And it slows down brute force attacks on things like login forms.

## Pinning down the requirements

Before drawing anything, I like to agree on what the system actually needs to do.

On the functional side, it should limit requests by some key, like a user ID, an API key, or an IP address. Different routes and different plans should be able to have different limits. When a request gets rejected, the client should get a clear answer: an HTTP 429 Too Many Requests, plus headers telling them how long to wait.

On the non-functional side, the main one is speed. The rate limiter sits in front of every single request, so it can't add much latency. A couple of milliseconds is fine, fifty is not. It also has to work across many servers, since the limit is per user, not per server. And it needs a plan for when it breaks, because it will.

One more thing worth saying out loud: it doesn't need to be perfectly exact. If a user gets 101 requests through instead of 100 once in a while, nobody gets hurt. Accepting that up front opens up simpler and faster designs.

## Where it lives

You could put rate limiting in the client, but you can't trust it. Anyone can skip the check by calling your API directly. So the real limit has to live on the server side.

That leaves two common spots. You can put it in the API gateway or load balancer that sits in front of everything, which is where most managed platforms offer it. Or you can write it as middleware inside your own app, which gives you more control, like limiting based on things only your app knows, such as the customer's plan. Either way, the shape is the same.

![The basic setup: every request passes through the rate limiter, which checks a shared counter in Redis before letting it through](/blog/designing-a-rate-limiter/architecture.png)

## The algorithms

This is the part interviewers usually care about most. There are five classic approaches, and each one trades accuracy, memory, and how it handles bursts a little differently.

### Fixed window counter

Split time into fixed windows, like each calendar minute, and keep a counter per user per window. Each request adds one. If the counter is over the limit, reject.

It's dead simple and uses almost no memory. The catch is the edges of the window. With a limit of 100 per minute, a user can send 100 requests at 12:00:59 and another 100 at 12:01:00. That's 200 requests in two seconds, and both windows think everything is fine.

### Sliding window log

Store a timestamp for every request. When a new one comes in, throw away timestamps older than one minute, count what's left, and decide.

This one is perfectly accurate, with no edge problem. But you're storing every single request, so memory grows with traffic. For a busy API, that adds up fast.

### Sliding window counter

This is a clever middle ground. Keep the counters for the current window and the previous one, and estimate the last 60 seconds by weighting them. If we're 15 seconds into the current minute, take 75% of last minute's count plus all of this minute's count so far.

It assumes the previous window's requests were spread out evenly, so it's an approximation. In practice it's very close, and it only needs two numbers per user. This is the one I'd usually reach for.

### Token bucket

Picture a bucket that holds up to 10 tokens and gets refilled at 2 tokens per second. Each request takes a token. If the bucket is empty, the request is rejected.

The nice thing here is that it allows short bursts. A user who has been quiet can fire off 10 requests at once, but over time they can't average more than 2 per second. That matches how real clients behave, since apps tend to load a few things at once and then go quiet. It's also really easy to implement. Here's a version for a single server in Go:

~~~go
type Bucket struct {
	mu       sync.Mutex
	capacity float64
	tokens   float64
	rate     float64 // tokens added per second
	last     time.Time
}

func NewBucket(capacity, rate float64) *Bucket {
	return &Bucket{capacity: capacity, tokens: capacity, rate: rate, last: time.Now()}
}

func (b *Bucket) Allow() bool {
	b.mu.Lock()
	defer b.mu.Unlock()

	// Refill based on how much time has passed, capped at capacity.
	now := time.Now()
	b.tokens = math.Min(b.capacity, b.tokens+now.Sub(b.last).Seconds()*b.rate)
	b.last = now

	if b.tokens < 1 {
		return false
	}
	b.tokens--
	return true
}
~~~

Notice there's no background timer adding tokens. We just work out how many tokens should have been added since the last request. That trick shows up a lot in rate limiting, and it's what keeps it cheap.

### Leaky bucket

Requests go into a queue, and the queue is processed at a fixed rate, like water leaking out of a hole at the bottom of a bucket. If the queue is full, new requests get dropped.

The result is perfectly smooth output, which is great when the thing you're protecting really can't handle bursts. The downside is that requests wait in line instead of getting an instant yes or no. As far as I know, Shopify describes the limits on its REST Admin API as a leaky bucket, which is part of why our n8n workflow had to pace itself.

## Going from one server to many

The Go example works fine on one server. But real APIs run on many servers behind a load balancer, and a user's requests get spread across all of them. If each server keeps its own counts, a user with a limit of 100 could get 100 per server. The counts need to live somewhere shared.

The usual answer is Redis. It's in memory, so it's fast, and it has atomic operations built in. Each user and route gets a key, something like "rl:user_42:/orders", and the rate limiter checks and updates that key on every request.

There's a subtle trap here, though. If you read the counter, check it, and then write it back as separate steps, two requests can read the same value at the same moment and both get through. With enough traffic, that happens all the time. The fix is to do the whole check in one atomic step. Redis lets you run a small Lua script that executes without anything else running in between. Here's a fixed window version:

~~~lua
-- KEYS[1] = the rate limit key, ARGV[1] = window length in seconds
local current = redis.call("INCR", KEYS[1])
if current == 1 then
  redis.call("EXPIRE", KEYS[1], ARGV[1])
end
return current
~~~

INCR is atomic on its own, but putting the EXPIRE in the same script matters too. Otherwise, if the server crashed right between the two calls, you'd end up with a key that never expires and a user who's locked out forever.

Memory is less scary than it sounds. Say you have a million active users, and each key with its counter takes around 100 bytes. That's about 100 MB, which fits comfortably on a single Redis instance. The TTL means inactive users clean themselves up.

## Telling the client what happened

A good rate limiter is polite about saying no. Return a 429 status, and include a Retry-After header so the client knows exactly how long to wait. A lot of APIs also send headers on every response, often named X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset, so well-behaved clients can slow themselves down before they hit the wall.

On the client side, the right response to a 429 is to back off and retry, waiting a bit longer each time, with some randomness mixed in. That randomness, usually called jitter, matters more than it sounds. Without it, every client that got rejected at the same moment retries at the same moment too, and you get the same spike all over again.

## What happens when things break

This is the part people tend to skip, and it's where the interesting decisions are.

If Redis goes down, do you let every request through or block them all? Failing open keeps your service up but drops the protection. Failing closed keeps the protection but turns a Redis outage into a full outage. For most APIs, I'd fail open and alert loudly, because the rate limiter exists to protect the service, not to become the reason it's down. A login endpoint might be the exception, since that's where the limit is doing security work.

Latency matters too. Every request now makes a trip to Redis, so it should sit close to your app servers, with tight timeouts so a slow Redis doesn't slow down everything else.

And if you run in several regions, you have to decide whether limits are global or per region. Truly global counts mean talking across regions on every request, which is slow. Most of the time, splitting the limit per region, or syncing counts in the background and accepting being a little off, is the better trade. This is where that "it doesn't have to be exact" requirement from the start pays off.

## Wrapping up

If I had to sum it up: put it on the server side, pick sliding window counter or token bucket depending on whether you want to allow bursts, keep the counts in Redis and update them atomically, answer with a 429 and a Retry-After, and decide ahead of time what happens when Redis isn't there.

What I like about this problem is that every piece is simple on its own. The real design work is in the tradeoffs: exact versus cheap, strict versus available, global versus fast. Being able to explain why you picked one side of each is most of what makes the answer good, in an interview or in production.`,
  },
  {
    slug: "bruno-k9s-herdr",
    title: "Bruno, K9s, and Herdr: Three Tools That Earned a Spot in My Workflow",
    excerpt:
      "An API client that lives in git, a terminal dashboard for Kubernetes, and a workspace for running AI coding agents side by side. Here's what each one does and how I use it.",
    date: "2026-11-09",
    category: "aiTools",
    content: `Every few months I try a handful of new dev tools, and almost all of them are gone a week later. These three stuck. They're Bruno, K9s, and Herdr, and they cover pretty different parts of my day: testing APIs, poking at Kubernetes clusters, and running AI coding agents. Looking back, they have a few things in common. They're open source, they don't need an account, and they keep me on the keyboard instead of clicking around a web dashboard. Here's what each one does and how I actually use it.

## Bruno: an API client that lives in your repo

If you've used Postman, you already get the basic idea of [Bruno](https://www.usebruno.com/). You build requests, save them in collections, switch between environments, and hit send. The difference is where everything lives.

Postman pushes you toward its cloud. You sign in, your collections sync to their servers, and sharing with a teammate means inviting them into a workspace. Bruno skips all of that. A collection is just a folder of plain text files on your machine, one file per request. There's no account to make and nothing syncing in the background.

That sounds like a small detail, but it changes how you work. Because the collection is just files, I keep it in the same git repo as the project. When I add an endpoint, the request that tests it goes into the same commit. When someone reviews the pull request, they see the API change and the request change side by side. And when someone new joins, they clone the repo and already have every request, ready to go. No more "can you export your Postman collection and send it to me."

![A Bruno request saved as a plain text file and reviewed in a pull request like any other code change (image: Bruno on GitHub)](/blog/bruno-k9s-herdr/bruno-pull-request.png)

Environments work the way you'd expect. I usually have a local one, a staging one, and a production one, with things like the base URL and tokens stored as variables. Secrets stay out of the committed files, so you can share the collection without sharing your keys.

You can also script requests. A pre-request script can grab a fresh auth token, and a post-response script can pull a value out of the response for the next request, or check that the response looks right. Pair that with the Bruno CLI ("bru run") and the same collection you click through by hand can run as a test suite in CI. That's the part that won me over. The requests I write while building a feature turn into checks that keep running long after I've moved on.

## K9s: Kubernetes without typing kubectl a hundred times

Anyone who has worked with Kubernetes knows the routine. Get pods. Copy a pod name. Describe it. Get the logs. Realize it restarted and the name changed. Get pods again. None of it is hard, it's just a lot of typing to answer simple questions.

[K9s](https://k9scli.io/) is a terminal UI that sits on top of your cluster and watches it for you. You open it and you're looking at a live list of pods that updates on its own, with status, restarts, CPU, and memory right there. Everything is a keystroke away. Type a colon and a resource name, like ":deploy" or ":svc", to jump to that view. Hit slash to filter. Select a pod and press "l" for logs, "d" to describe it, or "s" to open a shell inside the container. Port forwarding, scaling, and restarting a deployment are only a couple of keys too.

![K9s showing every pod in the cluster, with the main shortcuts listed along the top (image: K9s on GitHub)](/blog/bruno-k9s-herdr/k9s-pods.png)

What I like most is how fast it makes the boring questions. Why is this pod crashing? Which deployment owns it? Is the service actually pointing at it? In K9s that's a few seconds of moving around instead of a few minutes of copying names between commands. There's also an XRay view that shows how resources connect to each other, and a Pulses view that gives you a quick health check of the whole cluster. Switching clusters is just ":ctx", which is handy when you're bouncing between a local cluster and a shared one.

One habit I'd recommend: if you're looking at a cluster you shouldn't be changing, launch it with "k9s --readonly". When everything is one keystroke away, it's way too easy to delete the wrong thing.

## Herdr: a home for my AI coding agents

This is the newest one for me, and honestly the one I use the most now.

A lot of my coding happens alongside AI agents like Claude Code these days. The problem is that one agent quickly turns into three. One is refactoring, one is writing tests, and there's a dev server and a log tail running in between. In a normal terminal that becomes a mess of windows and tabs, and I keep checking each one to see if it's done or stuck waiting for me to approve something.

[Herdr](https://herdr.dev/) is a terminal workspace built for exactly this. You organize things into workspaces, tabs, and panes, a lot like tmux. The difference is that Herdr knows when an agent is running in a pane, and it can tell whether that agent is working, finished, or blocked waiting on you. So instead of checking every pane, I glance at the sidebar and see which one needs me.

![The sidebar shows every agent and flags the one waiting on you (image: herdr.dev)](/blog/bruno-k9s-herdr/herdr.png)

Sessions stick around too. Herdr runs a small server in the background, so if I close the window or detach, everything keeps running and I can come back to it exactly how I left it. It can even attach to a session on another machine over SSH.

The part I find most interesting is that Herdr has a CLI the agents themselves can use. I've set up Claude Code so that when it needs to run something long, like a dev server, a test suite, or a build, it splits off a new pane and runs it there instead of hiding it in the background. I can watch the output as it happens, and the agent can read that same output back to check whether the tests passed. It can even start a second agent in its own pane and hand it a task. That turns "the AI is doing something somewhere" into "I can see exactly what the AI is doing," and that matters a lot more than I expected.

## What they have in common

Put the three side by side and the pattern is pretty clear. They're all local first, and they keep things as files or terminals I can see instead of hiding them behind a web dashboard. Bruno keeps my API requests in git. K9s puts a whole cluster on one keyboard-driven screen. Herdr turns a pile of mystery windows into agents I can actually keep track of.

For a small studio like ours, that matters. Clients never see these tools, but they feel the difference. APIs get tested the same way every time, problems in a cluster get spotted faster, and AI-assisted work stays something I can watch and check. None of it is flashy. It just means fewer surprises, and that's most of what good engineering comes down to.

All three are free to try. If any of them sound useful, start with whichever one matches the thing that annoys you most right now.`,
  },
  {
    slug: "php2shell-what-happened",
    title: "PHP2Shell: What Happened, and What It Means for Your Website",
    excerpt:
      "Two critical PHP bugs let attackers take over web servers without a password. Here's how the attack actually works, how it was handled, and what to check if you own a website.",
    date: "2026-10-30",
    category: "security",
    content: `About 70% of the web runs on PHP. So when two critical PHP bugs went public last week, roughly 70% of the web was suddenly exposed. That includes WordPress, along with a surprising number of routers, firewalls, and admin panels. PHP isn't the cool choice anymore, and new sites tend to go on Wix, Shopify, or a modern JavaScript stack. But if your business site is a few years old, or anyone has ever mentioned WordPress to you, odds are it's PHP.

The bugs are called PHP2Shell (CVE-2026-109618 and CVE-2026-109619), and the name says it all. Send the right request to a vulnerable server, and you get a shell on it. No login, no password, no one clicking a bad link. I've spent the week reading the advisories and the original research, so here's my attempt at explaining what happened in plain language, and more importantly, what you should actually do about it.

## The short version

Researchers at [Calif](https://calif.io/php2shell/) found two ways to crash PHP in the middle of setting up a web request, and then abuse the mess it leaves behind. They reported it to the PHP team in August, and a fix was scheduled for October 22. Then the details leaked on social media on October 20, and things moved fast.

![Calif's write up, which walks through the bugs all the way back to a related PHP flaw from 2004](/blog/php2shell-what-happened/calif-writeup.png)

PHP shipped patched versions on October 21: 8.5.12, 8.4.27, 8.3.36, and 8.2.35. Amazon later said its honeypots had seen an exploitation attempt as early as October 17, nearly a week before the patch was public. By October 26, the US cybersecurity agency CISA added both bugs to its list of vulnerabilities known to be exploited in the wild, which is about as loud as a security alarm gets.

![CISA's alert, updated on October 26 once both bugs were confirmed as exploited](/blog/php2shell-what-happened/cisa-alert.png)

## What's actually going on under the hood

Every time someone visits a PHP page or submits a form, PHP does some setup before your website's code even runs. It reads the incoming data and sorts it into tables, like the list of form fields and the list of uploaded files. PHP also has a memory limit per request (128MB by default), and if a request goes over it, PHP stops everything and cleans up.

The first bug is about the order of operations in that setup. When PHP adds a new entry to one of those tables, it bumps the entry count first and writes the entry's name second. If memory runs out exactly between those two steps, the request dies, but the cleanup code sees a table that claims to have one more entry than it really does. It then tries to tidy up an entry that was never finished, and it trusts whatever garbage happens to be sitting in that slot.

![PHP's own advisory for the first bug: rated critical at 9.2 out of 10, with no login or user interaction needed](/blog/php2shell-what-happened/php-advisory.png)

The obvious question is how an attacker makes memory run out at exactly the right moment. This is where the research gets clever. PHP checks the size of an upload against the size the request says it is, not the bytes it actually receives, so a request sent in chunks can slip past that limit. On top of that, upload fields with an empty filename don't count as uploads, but PHP still builds several table entries for each one. Combine that with deeply nested field names, and a request under 8MB can fill the whole 128MB budget, with the attacker choosing which allocation is the one that tips it over.

The second bug is a classic "use after free." PHP's session upload progress feature (the thing that lets a page show a progress bar for uploads) starts tracking session data while the upload is still being read. If the request crashes at that point, PHP frees the memory but never clears the session feature's pointers to it. Those pointers now point at memory that will be reused for something else. The attacker then sends a second request to the same PHP process, and the cleanup code follows those stale pointers into memory the attacker has since filled.

## Why some servers were worse off than others

PHP can sit behind a web server in a few different ways, and that turned out to matter a lot.

With Apache's mod_php, PHP lives inside the Apache process itself. When the setup crashes, that process cleans up and keeps going, then serves the next visitor with the stale state still in memory. That's exactly what both attacks need, and it all happens before any of your website's own code runs. So even a blank PHP page was enough.

With PHP-FPM, which most modern setups use, a crash during setup kills the worker outright, so the stale state dies with it. That blocked the easy path. But the researchers found a second route that crashes PHP slightly later, while it's decoding saved data, and in that case the FPM worker survives. That route needs the website to decode stored data somewhere, which is common. Session handling does it, and so does WordPress. Wiz showed working attacks against WordPress, Drupal, and Joomla, plus a separate path that could leak passwords, API keys, and certificates straight out of server memory.

## How it was handled, and where things stand

The PHP Foundation ran a confidential embargo, so big hosting companies and Linux distributions got patches ahead of time and could move the moment it went public. Security vendors also pushed out firewall rules to block the attack while everyone else caught up. TechCrunch reported a few days later that the internet had broadly avoided mass exploitation, which is a sentence I was happy to read.

![TechCrunch's take on the week: two critical web bugs that almost broke the internet](/blog/php2shell-what-happened/techcrunch.png)

But it's not over. Cloudflare's CEO described an exponential jump in exploit attempts after disclosure, and proof of concept code is now public on GitHub, so anyone can try it. On October 23, PHP also disclosed a third bug, though it only affects unusual setups. And the systems most likely to stay vulnerable are exactly the ones nobody is watching: old servers, forgotten staging sites, and anything running PHP 8.1 or older, which no longer gets official updates.

That last group worries me the most, and I think it's going to keep growing. It has never been easier to put something online. You can spin up a WordPress site with one click from a hosting panel, install a dozen plugins in an afternoon, or have an AI tool build you a working app over a weekend. I use these tools every day, and they're great. But they make the building part feel finished, when really it's only the start.

A website or app isn't a poster you hang once. It's software running on a server that the whole internet can reach, and the pieces underneath it (PHP, plugins, libraries, the server itself) keep getting security fixes long after launch. When building something took a team and a budget, there was usually someone whose job included keeping it updated. Now it's often one person, or a freelancer who finished the project and moved on, and nobody is quite sure who's responsible. The site keeps working, so nobody touches it, and that's exactly how a server ends up running a PHP version that stopped getting fixes years ago.

Big companies have security teams watching for this stuff. A small shop with a WordPress site built five years ago usually doesn't, and the attackers don't care how small you are. They aren't choosing targets. Their tools sweep the whole internet looking for anything unpatched.

## What you should do if you own a website

You don't need to understand any of the technical part above to protect yourself. Here's what I'd do, depending on your setup.

### If your site is on Wix, Squarespace, or Shopify

You can mostly relax. Those platforms don't run your site on PHP, and keeping their servers patched is their job, not yours.

### If your site is on WordPress or a rental server

Log into your hosting control panel and check which PHP version your site is on. Most panels show this clearly. If it's older than 8.2, move it to a supported version (test your site afterward, since very old themes and plugins sometimes break). If you're not sure where to look, email your host and ask two things: what PHP version is my site running, and has the PHP2Shell patch been applied? A good host will answer that in one line.

### If someone built your site for you

Send your developer or agency the same two questions. If they can't answer, or you don't have anyone to ask anymore, that's the real problem to fix, and it's bigger than this one bug.

### If you run your own server

Update to 8.5.12, 8.4.27, 8.3.36, or 8.2.35, or install your Linux distribution's patched package. Then restart PHP-FPM or Apache. This step gets skipped more than you'd think, and until you restart, the old code is still the one running. If you can't patch right away, the official guidance is to set session.upload_progress.enabled to Off in php.ini, put the site behind a web application firewall, or take it offline until you can. PHP itself says no configuration change fully fixes this, so treat those as a bandage, not a cure.

## How to tell if you were already hit

Patching closes the door, but it doesn't tell you whether someone walked in before you closed it. If your site was exposed between mid October and whenever you patched, a few things are worth checking.

Look for PHP or web server processes starting things they normally never would, like a shell, curl, wget, or Python. That's the clearest sign of a successful attack. Check your website's folder for new files you didn't add, especially PHP files with random names. Check for new scheduled tasks and new admin accounts in your CMS. And because one of the attack paths could leak secrets from memory, it's worth rotating your database password, API keys, and payment or email credentials if you were unpatched for any real length of time. It's an annoying afternoon, but much less annoying than finding out later.

If you do find something, don't just delete it. Save your logs first, then get help. Cleaning up a compromised server without understanding how they got in usually means they get back in.

## The bigger lesson

What strikes me about PHP2Shell is how old the underlying problem is. A related memory limit bug was found back in 2004, and a version of this issue was spotted in 2024 but wasn't considered exploitable. It took a determined team in 2026, with some help from AI tools, to show it was. I think we're going to see more of this. Old, widely used software is getting a second, much sharper look, and bugs that sat quietly for years are going to keep surfacing.

You can't control when that happens. What you can control is how fast you can respond. That mostly comes down to three boring things: knowing what software your website runs on, having someone responsible for updating it, and keeping backups you could actually restore from. None of it is exciting, but it's the difference between a five minute fix and a very bad week.`,
  },
  {
    slug: "claude-on-the-go",
    title: "Claude On The Go",
    excerpt:
      "You can now run Claude Code from your phone. Here's how Remote Control and Dispatch actually work, what they're great at, and where they still fall short.",
    date: "2026-07-06",
    category: "aiTools",
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
    category: "career",
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
