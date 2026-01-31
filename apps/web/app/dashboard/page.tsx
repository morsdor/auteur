export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-primary p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard</h1>
          <p className="text-text-secondary">
            Welcome to Auteur AI - Your AI-powered video editing platform
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder cards */}
          <div className="bg-bg-component border border-border-default rounded-lg p-6 hover:border-border-strong transition-colors">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Create New Project</h2>
            <p className="text-sm text-text-tertiary">Start a new video editing project</p>
          </div>

          <div className="bg-bg-component border border-border-default rounded-lg p-6 hover:border-border-strong transition-colors">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Recent Projects</h2>
            <p className="text-sm text-text-tertiary">View and manage your projects</p>
          </div>

          <div className="bg-bg-component border border-border-default rounded-lg p-6 hover:border-border-strong transition-colors">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Templates</h2>
            <p className="text-sm text-text-tertiary">Browse project templates</p>
          </div>
        </div>

        <div className="mt-12 bg-bg-component border border-border-default rounded-lg p-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Getting Started</h2>
          <p className="text-text-secondary mb-4">
            This is a placeholder dashboard page. The full dashboard with project management will be
            implemented in Phase 2.
          </p>
          <div className="flex gap-3">
            <button className="bg-accent-primary hover:bg-accent-primary-hover text-bg-primary font-semibold px-6 py-2 rounded-md shadow-glow-green transition-all">
              Get Started
            </button>
            <button className="border border-border-medium hover:bg-bg-elevated text-text-primary px-6 py-2 rounded-md transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
