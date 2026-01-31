export default function EditorPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="min-h-screen bg-bg-primary p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Video Editor</h1>
          <p className="text-text-secondary">Project ID: {params.projectId}</p>
        </header>

        <div className="bg-bg-component border border-border-default rounded-lg p-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Editor Placeholder</h2>
            <p className="text-text-secondary mb-6">
              The full video editor with timeline, preview, and text-based editing will be
              implemented in Phase 3-4.
            </p>
            <div className="flex gap-3 justify-center">
              <button className="bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold px-6 py-2 rounded-md shadow-glow-green transition-all">
                Import Media
              </button>
              <button className="border border-border-medium hover:bg-bg-elevated text-text-primary px-6 py-2 rounded-md transition-colors">
                Generate Transcript
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-component border border-border-default rounded-lg p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Timeline</h3>
            <p className="text-xs text-text-tertiary">Coming in Phase 3</p>
          </div>
          <div className="bg-bg-component border border-border-default rounded-lg p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-2">Transcript Editor</h3>
            <p className="text-xs text-text-tertiary">Coming in Phase 4</p>
          </div>
          <div className="bg-bg-component border border-border-default rounded-lg p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-2">AI Features</h3>
            <p className="text-xs text-text-tertiary">Coming in Phase 5-7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
