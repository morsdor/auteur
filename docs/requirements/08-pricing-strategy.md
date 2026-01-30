# Auteur AI Pricing Strategy

## Credit System

**1 Credit = $0.05 USD**

This provides good granularity and competitive pricing compared to industry standards.

---

## Subscription Plans

### 🌟 **Starter Plan - $29/month**

**Target Audience**: Individual creators, YouTubers, small projects

**Monthly Credits**: 600 credits ($30 value)

**Bundled Unlimited Features** (No credits required):

- ✅ Transcription (unlimited minutes)
- ✅ Basic text-based editing (cut, trim, rearrange)
- ✅ Filler word removal ("um", "uh", etc.)
- ✅ Basic TTS (text-to-speech)
- ✅ Overdub (edit words in transcript)
- ✅ Insert speech (add new dialogue)
- ✅ Export up to 1080p

**Credit-Based Features**:

- Lip sync: 30 credits/min ($1.50/min)
- Audio generation: 20 credits/min ($1/min)

**Limits**:

- 10 projects
- 50GB storage
- 30 hours transcription/month

---

### 🚀 **Pro Plan - $49/month**

**Target Audience**: Professional creators, agencies, power users

**Monthly Credits**: 1,000 credits ($50 value)

**All Starter Features PLUS**:

**Additional Bundled Unlimited**:

- ✅ Lip sync (unlimited)
- ✅ Gaze correction
- ✅ Advanced export options

**Pro-Exclusive Credit Features**:

- Video generation: 300 credits per 5-sec ($15 per 5-sec)
- Performance cloning: 100 credits/min ($5/min)
- Video Q&A: 10 credits/query ($0.50/query)
- Audio generation: 20 credits/min ($1/min)

**Limits**:

- Unlimited projects
- 500GB storage
- Unlimited transcription
- Priority processing
- API access

---

## Credit Costs Breakdown

| Feature             | Credits   | USD Cost    | Actual API Cost | Markup |
| ------------------- | --------- | ----------- | --------------- | ------ |
| Transcription       | 2/min     | $0.10/min   | $0.015/min      | 6x     |
| TTS                 | 5/min     | $0.25/min   | $0.225/min      | 1.1x   |
| Lip Sync            | 30/min    | $1.50/min   | ~$1.00/min      | 1.5x   |
| Video Gen           | 300/5-sec | $15/5-sec   | ~$15/5-sec      | 1x     |
| Overdub             | 5/min     | $0.25/min   | $0.225/min      | 1.1x   |
| Insert Speech       | 5/min     | $0.25/min   | $0.225/min      | 1.1x   |
| Performance Cloning | 100/min   | $5/min      | ~$4/min         | 1.25x  |
| Gaze Correction     | 50/min    | $2.50/min   | ~$2/min         | 1.25x  |
| Video Q&A           | 10/query  | $0.50/query | ~$0.30/query    | 1.6x   |
| Audio Gen           | 20/min    | $1/min      | ~$0.80/min      | 1.25x  |

---

## Business Strategy

### Why This Works:

1. **Competitive Positioning**:
   - Descript Pro: $24/month (unlimited basic features)
   - Our Starter: $29/month (unlimited basics + 600 credits)
   - Our Pro: $49/month (more unlimited features + 1000 credits)

2. **Credit Allocation Math**:
   - Starter ($29): 600 credits allows:
     - 20 minutes of lip sync, OR
     - 30 minutes of audio generation, OR
     - 1 5-second video generation clip
   - Pro ($49): 1000 credits allows significantly more

3. **Bundled Features Strategy**:
   - Core editing features unlimited → removes friction
   - High-value AI features on credits → monetizes power users
   - Clear upgrade path from Starter to Pro

4. **Margins**:
   - Bundled features: High markup (6x on transcription) = profitable even unlimited
   - Credit features: Lower markup (1.1x-1.6x) = competitive pricing
   - GPU-heavy features: Moderate markup (1.25x-1.5x) = sustainable

---

## Recommended Implementation

### In Database Schema:

```typescript
interface Subscription {
  plan: 'starter' | 'pro';
  monthly_credits: number; // 600 or 1000
  credits_remaining: number;
  unlimited_features: string[]; // ['transcription', 'tts', 'overdub']
}
```

### Credit Deduction Logic:

```typescript
// Check if feature is bundled (free)
const UNLIMITED_FEATURES = {
  starter: ['transcription', 'tts', 'overdub', 'insert_speech'],
  pro: ['transcription', 'tts', 'overdub', 'insert_speech', 'lip_sync', 'gaze_correction'],
};

function shouldChargeCredits(plan: Plan, jobType: JobType): boolean {
  return !UNLIMITED_FEATURES[plan].includes(jobType);
}
```

---

## Competitive Advantages

✅ **More generous than Descript** on bundled features  
✅ **Transparent credit pricing** (Descript hidden costs)  
✅ **Flexible hybrid model** (subscription + pay-as-you-go)  
✅ **Better value for power users** (Pro plan)

---

## Future Considerations

- **Credit rollover**: Let unused credits roll over 1 month
- **Credit bundles**: Sell additional credits ($10 for 200 credits = same $0.05/credit)
- **Enterprise tier**: Custom pricing, dedicated support
- **Free tier**: 50 credits/month, limited projects (for acquisition)
