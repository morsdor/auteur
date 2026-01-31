import { Button } from '@auteur/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@auteur/ui';

export default async function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <div className="min-h-screen bg-bg-primary p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Video Editor</h1>
          <p className="text-text-secondary">Project ID: {projectId}</p>
        </header>

        <Card>
          <CardContent className="py-20 text-center">
            <CardTitle className="mb-4">Editor Placeholder</CardTitle>
            <CardDescription className="mb-6">
              The full video editor with timeline, preview, and text-based editing will be
              implemented in Phase 3-4.
            </CardDescription>
            <div className="flex gap-3 justify-center">
              <Button>Import Media</Button>
              <Button variant="outline">Generate Transcript</Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Timeline</CardTitle>
              <CardDescription className="text-xs">Coming in Phase 3</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Transcript Editor</CardTitle>
              <CardDescription className="text-xs">Coming in Phase 4</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">AI Features</CardTitle>
              <CardDescription className="text-xs">Coming in Phase 5-7</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
