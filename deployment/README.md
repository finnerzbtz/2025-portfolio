# 🚀 Production Deployment Guide

This guide will help you deploy Finley Howard's AI Portfolio on your Hetzner server using Docker and Nginx.

## 📋 Prerequisites

- Ubuntu/Debian server (Hetzner VPS)
- Domain name pointing to your server
- Root or sudo access
- OpenAI API key

## 🔧 Server Setup

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install docker.io docker-compose nginx certbot python3-certbot-nginx -y

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group (optional, to avoid sudo)
sudo usermod -aG docker $USER
# Log out and back in for this to take effect
```

### 2. Clone Repository

```bash
# Clone the repository
git clone <your-repo-url> /home/$USER/portfolio
cd /home/$USER/portfolio
```

### 3. Environment Setup

```bash
# Create environment file
cp .env.example .env.local
nano .env.local
```

Add your OpenAI API key:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
```

### 4. Build and Deploy with Docker

```bash
# Build and start the application
sudo docker-compose up -d --build

# Check if it's running
sudo docker-compose ps
sudo docker-compose logs -f
```

### 5. Configure Nginx

```bash
# Copy the nginx configuration
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio

# Edit the configuration with your domain
sudo nano /etc/nginx/sites-available/portfolio
# Replace 'your-domain.com' with your actual domain

# Enable the site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 6. SSL Certificate (Let's Encrypt)

```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

## 🔍 Monitoring & Maintenance

### Check Application Status

```bash
# View logs
sudo docker-compose logs -f

# Check container stats
sudo docker stats

# Restart if needed
sudo docker-compose restart
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
sudo docker-compose down
sudo docker-compose up -d --build
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload nginx (without downtime)
sudo nginx -s reload

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

## 🛡️ Security Checklist

- [ ] Firewall configured (ufw enable)
- [ ] SSL certificate installed
- [ ] Environment variables secured
- [ ] Regular security updates enabled
- [ ] Fail2ban installed (optional)

### Basic Firewall Setup

```bash
# Enable firewall
sudo ufw enable

# Allow SSH (adjust port if needed)
sudo ufw allow 22

# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
```

## 📊 Performance Tips

1. **Monitoring**: Use `htop` or `docker stats` to monitor resource usage
2. **Logs**: Rotate logs with `logrotate` to save disk space
3. **Backup**: Regularly backup your environment file and any custom configurations
4. **Updates**: Keep Docker images and system packages updated

## 🚨 Troubleshooting

### Common Issues

**Container won't start:**
```bash
sudo docker-compose logs portfolio
```

**Nginx 502 error:**
- Check if the application is running on port 3000
- Verify Docker container is healthy

**SSL issues:**
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
```

**Permission issues:**
```bash
sudo chown -R $USER:$USER /home/$USER/portfolio
```

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Verify all environment variables are set
3. Ensure domain DNS is pointing to your server
4. Check firewall rules

## 🔄 Automatic Backups (Optional)

Create a backup script:

```bash
#!/bin/bash
# backup.sh
cd /home/$USER/portfolio
sudo docker-compose exec portfolio npm run export
tar -czf backup-$(date +%Y%m%d).tar.gz .env.local public/ 
```

Set up cron job:
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /home/$USER/portfolio/backup.sh
```

---

🎉 **Your portfolio should now be live at https://your-domain.com!** 