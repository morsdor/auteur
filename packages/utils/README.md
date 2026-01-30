# @auteur/utils

Shared utility functions for Auteur AI (no UI dependencies).

## Installation

```bash
# In your package.json
{
  "dependencies": {
    "@auteur/utils": "workspace:*"
  }
}
```

## Usage

### EDL Utilities

```typescript
import { calculateTotalDuration, findClipAt, parseEDL } from '@auteur/utils';

const duration = calculateTotalDuration(tracks);
const clip = findClipAt(track, 5000); // Find clip at 5 seconds
```

### Credit Utilities

```typescript
import { calculateJobCost, formatCredits } from '@auteur/utils';

const cost = calculateJobCost('transcription', 2.5); // 2.5 minutes
const formatted = formatCredits(1500); // "1,500"
```

### Time Utilities

```typescript
import { formatTimecode, parseTimecode, formatDuration } from '@auteur/utils';

const timecode = formatTimecode(125000); // "00:02:05:00"
const ms = parseTimecode('00:02:05:00'); // 125000
const duration = formatDuration(135000); // "2m 15s"
```

### Validation Utilities

```typescript
import { isValidEmail, isValidMediaType } from '@auteur/utils';

const valid = isValidEmail('user@example.com'); // true
const supported = isValidMediaType('video/mp4'); // true
```
