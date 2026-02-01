/**
 * Dashboard Page Component
 * Main authenticated view with system info and user profile
 */

import { useState, useEffect } from 'react';
import { Button } from '@auteur/ui/components/button';
import { Input } from '@auteur/ui/components/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@auteur/ui/components/card';
import { useAuth } from '../contexts/auth';

interface SystemInfo {
  platform: string;
  arch: string;
  version: string;
  electron: string;
  chrome: string;
  node: string;
  appVersion: string;
  appPlatform: string;
  appName: string;
}

export function DashboardPage() {
  const { user, logout } = useAuth();
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [storageTest, setStorageTest] = useState<string>('');
  const [storageValue, setStorageValue] = useState<string>('');

  useEffect(() => {
    loadSystemInfo();
  }, []);

  const loadSystemInfo = async () => {
    if (window.electronAPI) {
      const info = await window.electronAPI.system.getInfo();
      const version = await window.electronAPI.app.getVersion();
      const platform = await window.electronAPI.app.getPlatform();
      const name = await window.electronAPI.app.getName();

      setSystemInfo({
        ...info,
        appVersion: version,
        appPlatform: platform,
        appName: name,
      });
    }
  };

  const handleStorageTest = async () => {
    if (window.electronAPI && storageTest) {
      await window.electronAPI.storage.set('test-key', storageTest);
      const value = await window.electronAPI.storage.get<string>('test-key');
      setStorageValue(value || 'Not found');
    }
  };

  const handleMinimize = () => {
    window.electronAPI?.window.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI?.window.maximize();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Auteur <span className="text-[#00E054]">Desktop</span>
          </h1>
          <p className="text-gray-400">AI-Powered Video Editing Platform</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleMinimize}>
            Minimize
          </Button>
          <Button variant="outline" size="sm" onClick={handleMaximize}>
            Maximize
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Authenticated via @auteur/auth</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="font-mono">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">User ID:</span>
                <span className="font-mono text-xs">{user?.id.slice(0, 16)}...</span>
              </div>
              {user?.name && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="font-mono">{user.name}</span>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-500/50"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* System Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Electron API integration test</CardDescription>
          </CardHeader>
          <CardContent>
            {systemInfo ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">App Name:</span>
                  <span className="font-mono">{systemInfo.appName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="font-mono">{systemInfo.appVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform:</span>
                  <span className="font-mono">{systemInfo.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Architecture:</span>
                  <span className="font-mono">{systemInfo.arch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Electron:</span>
                  <span className="font-mono">{systemInfo.electron}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chrome:</span>
                  <span className="font-mono">{systemInfo.chrome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Node:</span>
                  <span className="font-mono">{systemInfo.node}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading system info...</p>
            )}
          </CardContent>
        </Card>

        {/* Storage Test Card */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Test</CardTitle>
            <CardDescription>Test electron-store via IPC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Enter a test value:</label>
              <Input
                type="text"
                placeholder="Type something..."
                value={storageTest}
                onChange={(e) => setStorageTest(e.target.value)}
              />
            </div>

            <Button onClick={handleStorageTest} className="w-full">
              Save & Retrieve
            </Button>

            {storageValue && (
              <div className="p-4 bg-[#141414] rounded-lg border border-[#2A2A2A]">
                <p className="text-sm text-gray-400 mb-1">Retrieved value:</p>
                <p className="font-mono text-[#00E054]">{storageValue}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle>Package Integration</CardTitle>
            <CardDescription>Successfully integrated shared packages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#141414] rounded-lg border border-[#2A2A2A] text-center">
                <div className="text-2xl mb-1">🎨</div>
                <p className="text-sm text-gray-400">@auteur/ui</p>
              </div>
              <div className="p-4 bg-[#141414] rounded-lg border border-[#2A2A2A] text-center">
                <div className="text-2xl mb-1">🔐</div>
                <p className="text-sm text-gray-400">@auteur/auth</p>
              </div>
              <div className="p-4 bg-[#141414] rounded-lg border border-[#2A2A2A] text-center">
                <div className="text-2xl mb-1">🌐</div>
                <p className="text-sm text-gray-400">@auteur/api-client</p>
              </div>
              <div className="p-4 bg-[#141414] rounded-lg border border-[#2A2A2A] text-center">
                <div className="text-2xl mb-1">💾</div>
                <p className="text-sm text-gray-400">@auteur/storage</p>
              </div>
            </div>

            <div className="p-4 bg-[#00E054]/10 border border-[#00E054]/30 rounded-lg">
              <p className="text-sm text-[#00E054]">
                <strong>✨ INFRA-0.4 Complete:</strong> All shared packages integrated successfully!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
