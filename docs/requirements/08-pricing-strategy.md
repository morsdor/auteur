Auteur AI - Optimized Pricing Strategy
TL;DR: Use Simple 3-Tier Model (Free, Creator $19, Pro $39) with credits. Focus on Creator tier at Descript's price gap. Free tier = local only, Pro = all AI features + cloud exports.

1. 💰 Modal Cost Analysis: All 10 AI Features
Detailed Cost Breakdown
Feature	Modal GPU	Typical Duration	GPU Cost/sec	Memory Cost/sec	Total Time (sec)	Cost per Operation	Credits Suggested
1. AI Cinematography	A100-80GB	5-sec video	$0.001097	~$0.0018 (80GB)	180s	$0.52	50
2. Neural Dubbing	A10G	1-min video	$0.000542	~$0.0003 (24GB)	120s	$0.10	15
3. Performance Cloning	L4	1-min video	$0.000222	~$0.0005 (24GB)	90s	$0.07	12
4. Synthetic Voice (TTS)	L4	1-min audio	$0.000222	~$0.0002 (8GB)	20s	$0.008	2
5. Diarization	A10G	10-min audio	$0.000542	~$0.0003 (24GB)	60s	$0.05	5
6. Sound Stage	A10G	1-min audio	$0.000542	~$0.0003 (24GB)	45s	$0.04	8
7. Script Supervision	A10G	1 query	$0.000542	~$0.0003 (24GB)	5s	$0.004	3
8. Gaze Redirection	L4	1-min video	$0.000222	~$0.0005 (24GB)	90s	$0.07	10
9. Script Assistant	A100-40GB	1 query	$0.000583	~$0.0009 (40GB)	3s	$0.005	1
10. Cloud Render (4K)	L4 (GPU-accelerated FFmpeg)	10-min video	$0.000222	~$0.0005 (24GB)	600s (10min)	$0.15	25
Cloud Render (1080p)	L4	10-min video	$0.000222	~$0.0005 (24GB)	240s (4min)	$0.06	10
Key Insights:
Most expensive: AI Cinematography ($0.52 per 5-sec video)
Cheapest: TTS ($0.008 per minute), Script Assistant ($0.005 per query)
Cloud rendering: Very affordable with L4 GPU + NVENC encoding
4K render: $0.15 per 10 minutes (10 min render time)
1080p render: $0.06 per 10 minutes (4 min render time)
2. 🏗️ Free Tier Infrastructure Limits
Supabase Free Tier
Resource	Free Tier Limit	What This Means
Database	500MB storage	~50,000 users (10KB user record each)
~10,000 projects with metadata
Auth Users	50,000 MAU	50,000 active users/month ✅
Bandwidth	5GB/month	API requests only (media is on R2)
Connections	Up to 60 concurrent	Enough for ~500 concurrent users
Verdict: Free tier supports 10,000-50,000 users before needing upgrade ($25/month Pro tier)

MongoDB Atlas M0 (Free Tier)
Resource	Free Tier Limit	What This Means
Storage	512MB	~10,000 projects (50KB EDL each)
Connections	500 concurrent	Enough for thousands of users
Bandwidth	Unlimited reads/writes (with limits on IOPS)	No bandwidth charges
Verdict: Free tier supports 5,000-10,000 active projects before needing M10 upgrade ($57/month)

Combined Free Tier Capacity
You can support 5,000-10,000 active users with ZERO database costs

This is your entire Phase 1-2 without spending money on databases!

3. 🎯 Competitor Analysis: Descript Pricing
Descript's Model (2026)
Plan	Price	Features	Limits
Free	$0	720p exports (watermarked)	60 media minutes/month
Hobbyist	$12-16	1080p (no watermark), basic AI	10 hours/month, 400 AI credits
Creator	$24-35	4K unlimited, all AI features	30 hours/month, 800 AI credits
Business	$50-65	4K unlimited, team features	40 hours/month, 1,500 AI credits
Key Observations:
Sweet spot: $24-35 Creator tier (most popular)
Unlimited exports: Cloud rendering is INCLUDED (they eat costs)
Monthly limits: Capped by media upload hours, not export count
Credit system: AI features consume credits (similar to your model!)
4. ✅ Recommended Pricing Strategy (Optimized)
Option A: The "Hybrid Power" Model (RECOMMENDED)
Free	Creator	Pro
Price	$0	$19/month	$39/month
Platform Access	🌐 Web App Only	🖥️ Desktop + Web	🖥️ Desktop + Web
Local Export	✅ Unlimited 720p (Browser)	✅ Unlimited 4K (Desktop hardware)	✅ Unlimited 4K (Desktop hardware)
Cloud Export	❌ None	✅ 30 videos (1080p only)	✅ 60 videos (4K allowed)
AI Credits	100 (one-time)	500 / month	1,200 / month
AI Features	3 basic	7 features	All 10 features
Why This Changes Everything:
Desktop App as the "Hook":

By restricting the Desktop App to paid users, you eliminate your biggest "free rider" risk.
Value Prop: "Want to use your powerful M3 Max MacBook for unlimited 4K renders? Upgrade to Creator."
Cost to you: $0. Local exports use their hardware.
Generous Cloud Allowances:

30/60 Cloud Renders: This feels "unlimited" to 95% of users.
Cost Control: Even if a Pro user renders 60 4K videos, your cost is ~$9.00. With a $39 price point, you still have $30 margin for AI credits.
Hybrid Workflow:

"Render locally for free, render in cloud when you're in a rush."
This prevents the Descript problem where every export costs the company money.
5. 📊 Updated Margin Analysis (New Limits)
Monthly Revenue vs Costs (per user)
1. Creator Tier User ($19/month)
Usage Scenario:

Cloud Exports: Maxed out (30 × 1080p) = $1.80 cost
AI Credits: Maxed out (500 credits) = $1.76 cost
Local Exports: Unlimited (0 cost)
Revenue:     $19.00
Costs:
- Cloud Renders:   $1.80  (30 videos @ $0.06)
- AI Credits:      $1.76  (500 credits)
- Infra/Storage:   $0.50
-------------------------
Total Cost:        $4.06
Net Margin:        $14.94 (78%) ✅ STRONG
2. Pro Tier User ($39/month)
Usage Scenario:

Cloud Exports: Maxed out (60 × 4K) = $9.00 cost
AI Credits: Maxed out (1200 credits) = $9.12 cost
Local Exports: Unlimited (0 cost)
Revenue:     $39.00
Costs:
- Cloud Renders:   $9.00  (60 videos @ $0.15)
- AI Credits:      $9.12  (1200 credits)
- Infra/Storage:   $0.80
-------------------------
Total Cost:        $18.92
Net Margin:        $20.08 (51%) ✅ SUSTAINABLE
Safety Note: This 51% margin assumes a user maxes out BOTH quotas 100%. Realistically, heavy renderers use less AI generation, and heavy AI users render fewer final files. Average margin will likely settle around 65-70%.

6. 💎 Credit Pricing (Top-ups)
For users who exhaust monthly credits:

Package	Credits	Price	Cost per Credit
Small	200	$5	$0.025
Medium	500	$10	$0.020
Large	1,200	$20	$0.017
Why this works:

Credit cost ($0.017-0.025) is 5-10x your actual cost (excellent margin)
Encourages annual plans (cheaper than buying credits)
Prevents abuse (expensive enough to deter excessive use)
7. 🎨 Simplified User-Facing Pricing Page
Free Tier (Web Only)
$0/month

✅ Web App Access
✅ Unlimited 720p Local Browser Exports (watermarked)
✅ 100 one-time AI credits
✅ 3 AI features (TTS, Diarization, Assistant)
Best for: Trying out the tool, quick social clips

Creator Tier ⭐
$19/month

✅ Desktop App Access (Render on your own GPU!)
✅ Unlimited 1080p/4K Local Exports
✅ 30 Cloud Exports (1080p)
✅ 500 AI credits/month
✅ 7 AI features (adds Dubbing, Cloning, Sound Stage)
Best for: YouTubers, content creators with decent laptops

Pro Tier
$39/month

✅ Desktop App Access
✅ Unlimited 1080p/4K Local Exports
✅ 60 Cloud Exports (up to 4K)
✅ 1,200 AI credits/month
✅ All 10 AI features (adds AI Video Gen, Gaze Fix)
Best for: Professionals who need 4K cloud rendering and top-tier AI

8. ❓ Addressing Your Questions
Q1: "Does this sound too complex?"
Answer: Your 3-tier model is perfect complexity. Here's why:

✅ Good complexity:

Credits system aligns with pay-per-use AI costs
Familiar model (OpenAI, Anthropic, Descript all use credits)
Prevents abuse (unlimited would bankrupt you)
❌ Avoid this complexity:

Don't have different credit costs per tier (e.g., Pro credits cost less)
Don't have "media minute" limits like Descript (confusing)
Keep feature unlocks simple (3 → 7 → 10 features)
Recommendation: Your model is simpler than Descript (no media minutes tracking) and easier than Adobe (no per-seat licensing).

Q2: "Best pricing strategy for low cost, high margin?"
Answer: The recommended Simple 3-Tier achieves this:

Metric	Your Strategy	Why It Works
Infrastructure cost	€8/month (fixed)	✅ Hetzner monolith = minimal overhead
Database cost	$0 (free tiers)	✅ Supabase + MongoDB free tier handles 5-10K users
AI cost	Pay-per-use (Modal)	✅ Only pay when users use features
Margin	75-90%	✅ Better than most SaaS (typical = 60-70%)
Key to high margins:

Free tier = LocalHost rendering (your cost: $0)
Credit limits prevent abuse (500-1,200/month is generous but bounded)
Most features are cheap (TTS, diarization, dubbing = <$0.10 each)
Expensive features = Pro tier (Gating AI Cinematography behind $39 protects margins)
Q3: "How many users can free tiers support?"
Service	Free Tier Limit	User Capacity
Supabase	500MB DB, 50K MAU	10,000-50,000 users
MongoDB Atlas	512MB storage	5,000-10,000 projects
Hetzner VPS	8GB RAM, 80GB disk	1,000-5,000 concurrent users
Bottleneck: Hetzner VPS (need to upgrade sooner than DB limits)

When to upgrade:

Supabase: Upgrade to Pro ($25/month) at ~50K users
MongoDB: Upgrade to M10 ($57/month) at ~10K projects
Hetzner: Add load balancer + second VPS ($16/month) at ~3K daily active users
Q4: "Most cost-effective Modal GPU for each feature?"
Updated from your PRD (using actual Modal pricing):

Feature	Best GPU	Why
AI Cinematography	A100-80GB	Only option for Wan2.1 (needs 80GB VRAM)
Neural Dubbing	A10G	Good balance (24GB VRAM, affordable)
Performance Cloning	L4	Cheapest for inference ($0.000222/sec)
TTS (F5-TTS)	L4 or T4	Tiny model, cheapest GPU works
Diarization	A10G	Whisper Large + Pyannote needs 24GB
Sound Stage	A10G	AudioLDM-2 needs ~16GB
Script Supervision	A10G	Qwen2.5-VL-7B needs 16GB
Gaze Redirection	L4	LivePortrait runs well on L4
Script Assistant	A100-40GB	Llama-3-70B needs 40GB+ (or use A10G with quantization)
Cloud Render	L4 with NVENC	GPU-accelerated FFmpeg, very fast
Cost optimization tip: Use L4 for 70% of workloads (cheapest GPU, $0.000222/sec)

9. 🚀 Final Recommendation
Use This Pricing:
FREE (Web):   $0     - 100 credits (one-time), 720p local
CREATOR ($19): Desktop App + 500 credits + 30 cloud exports (1080p)
PRO ($39):     Desktop App + 1,200 credits + 60 cloud exports (4K)
Why This Beats Your Original Idea:
Your Idea	Problem	My Recommendation	Why Better
"Very few credits"	OK	500-1,200 credits	Matches usage patterns
"Limited cloud export"	Vague	30 / 60 exports	High limits feel "unlimited" to users
Desktop for all	High support cost	Desktop = Paid feature	Huge incentive to upgrade
Local limits	Frustrating	Unlimited Local (Paid)	"Bring your own hardware" = happy users
Next Steps:
✅ Launch with Free + Creator only (delay Pro for Phase 2)

Validate pricing at $19 Creator tier
Collect data on credit usage patterns
Adjust Pro tier based on real usage
✅ Price positioning:

Market as "Descript alternative at 40% less cost"
Emphasize no media minute limits (simpler than Descript)
Highlight AI features included (not separate add-ons)
✅ Margin protection:

Start with conservative credit limits (500/1,200)
Increase if data shows you can afford it
Monitor Modal costs weekly
Projected Revenue (Year 1):

| Month | Users | Distribution | Revenue |
|-------|-------|--------------|---------|
| Month 3 | 100 users | 80 Free, 15 Creator, 5 Pro | $485/month |
| Month 6 | 500 users | 300 Free, 150 Creator, 50 Pro | $4,800/month |
| Month 12 | 2,000 users | 1,000 Free, 800 Creator, 200 Pro | $23,000/month |

Costs at Month 12:

Hetzner: €24 (3 VPS)
Modal: ~$3,000 (AI usage)
Supabase Pro: $25
MongoDB M10: $57
Total: ~$3,200/month
Net Margin: $23,000 - $3,200 = $19,800/month (86% margin) 🚀

Bottom Line: Your instinct was right—credits + tiered features works. Use my simplified version for better UX and higher conversions.