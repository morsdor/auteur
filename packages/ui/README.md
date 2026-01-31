# @auteur/ui

Shared UI component library using shadcn/ui with Auteur design tokens.

## Components

- **Button** - Primary action button with variants (default, outline, ghost, link)
- **Input** - Text input field with Auteur styling
- **Label** - Form label component
- **Card** - Container component with header, title, description, content, and footer

## Usage

```typescript
import { Button, Input, Label, Card } from '@auteur/ui';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Form</CardTitle>
        <CardDescription>Fill out the form</CardDescription>
      </CardHeader>
      <CardContent>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Design Tokens

All components use Auteur design tokens from `@auteur/tailwind-config`:

- Colors: Spotify green accent, dark backgrounds
- Typography: Inter font
- Spacing: 8px base unit
- Shadows: Green glow effects

## Development

```bash
# Type check
pnpm typecheck

# Build
pnpm build
```
