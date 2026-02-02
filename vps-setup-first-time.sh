#!/bin/bash

# ============================================
# Hetzner VPS Initial Setup Script
# Run this once on your fresh Hetzner VPS
# ============================================

set -e

echo "🚀 Starting Auteur AI VPS Setup..."

# ============================================
# 1. Update System
# ============================================
echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

# ============================================
# 2. Install Docker
# ============================================
echo "🐳 Installing Docker..."
apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
systemctl start docker
systemctl enable docker

echo "✅ Docker installed successfully"

# ============================================
# 3. Create Application Directory
# ============================================
echo "📁 Creating application directory..."
mkdir -p /opt/auteur
cd /opt/auteur

# ============================================
# 4. Create .env file
# ============================================
echo "📝 Creating .env file (you need to fill this in)..."
cat > .env << 'EOF'
# ============================================
# Auteur AI - Environment Variables
# FILL IN YOUR VALUES BELOW
# ============================================

DOMAIN=your-domain.com
ADMIN_EMAIL=your-email@example.com
IMAGE_TAG=latest
GITHUB_REPOSITORY_OWNER=your-github-username

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
SUPABASE_DB_URL=jdbc:postgresql://db.your-project.supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-db-password

# MongoDB Atlas
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/auteur

# Redis
REDIS_PASSWORD=CHANGE_THIS_TO_STRONG_PASSWORD

# Cloudflare R2
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY=your-access-key
R2_SECRET_KEY=your-secret-key
R2_BUCKET_NAME=auteur-media

# Modal
MODAL_TOKEN_ID=your-modal-token-id
MODAL_TOKEN_SECRET=your-modal-token-secret

# API
API_URL=https://your-domain.com/api
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# Spring Boot
SPRING_PROFILES_ACTIVE=production
JAVA_OPTS=-Xms384m -Xmx768m
EOF

# ============================================
# 5. Create Caddy directory and config
# ============================================
echo "🔧 Setting up Caddy configuration..."
mkdir -p /opt/auteur/caddy

# Download docker-compose.yml and Caddyfile
echo "📥 You need to upload your docker-compose.yml and caddy/Caddyfile to /opt/auteur"

# ============================================
# 6. Setup Firewall (UFW)
# ============================================
echo "🔥 Configuring firewall..."
apt-get install -y ufw

# Allow SSH (IMPORTANT - don't lock yourself out!)
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable

echo "✅ Firewall configured"

# ============================================
# 7. Setup Fail2Ban (Security)
# ============================================
echo "🛡️ Installing Fail2Ban for SSH protection..."
apt-get install -y fail2ban

systemctl start fail2ban
systemctl enable fail2ban

# ============================================
# 8. Setup Automatic Updates
# ============================================
echo "🔄 Configuring automatic security updates..."
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# ============================================
# 9. Create deploy user (optional but recommended)
# ============================================
echo "👤 Creating deploy user..."
useradd -m -s /bin/bash deploy
usermod -aG docker deploy

# Create .ssh directory for deploy user
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh

echo "📝 Add your GitHub Actions public SSH key to /home/deploy/.ssh/authorized_keys"

# ============================================
# 10. Setup Docker login helper script
# ============================================
cat > /opt/auteur/deploy.sh << 'DEPLOY_EOF'
#!/bin/bash
set -e

cd /opt/auteur

# Pull latest images (will use GITHUB_TOKEN from environment)
docker compose pull

# Deploy with zero downtime
docker compose up -d --remove-orphans

# Clean up old images
docker image prune -f

# Show status
docker compose ps
DEPLOY_EOF

chmod +x /opt/auteur/deploy.sh

# ============================================
# 11. Setup monitoring (optional)
# ============================================
echo "📊 Installing monitoring tools..."
apt-get install -y htop ncdu

# ============================================
# Final Instructions
# ============================================
cat << 'INSTRUCTIONS'

✅ VPS Setup Complete!

📋 Next Steps:

1. Edit /opt/auteur/.env with your actual credentials:
   nano /opt/auteur/.env

2. Upload your project files:
   - docker-compose.yml → /opt/auteur/
   - caddy/Caddyfile → /opt/auteur/caddy/

3. Login to GitHub Container Registry:
   echo YOUR_GITHUB_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin

4. Start the application:
   cd /opt/auteur
   docker compose up -d

5. Check logs:
   docker compose logs -f

6. Setup GitHub Secrets (in your repo settings):
   - VPS_HOST: Your VPS IP address
   - VPS_USERNAME: deploy (or root)
   - VPS_SSH_KEY: Your private SSH key
   - GITHUB_TOKEN: Auto-provided by GitHub Actions

7. Point your domain DNS to this VPS IP address

🔒 Security Checklist:
   ✓ Firewall enabled (UFW)
   ✓ Fail2Ban installed
   ✓ Automatic updates enabled
   ✓ Non-root deploy user created

📚 Useful Commands:
   - View logs: docker compose logs -f [service]
   - Restart: docker compose restart [service]
   - Update: ./deploy.sh
   - Check resources: htop
   - Check disk: ncdu /

INSTRUCTIONS

echo "🎉 Setup script completed!"
