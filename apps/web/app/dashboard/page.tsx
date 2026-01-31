import { Button } from '@auteur/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@auteur/ui';

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
          <Card className="hover:border-border-strong transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>Start a new video editing project</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-strong transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>View and manage your projects</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-border-strong transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Browse project templates</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              This is a placeholder dashboard page. The full dashboard with project management will
              be implemented in Phase 2.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
