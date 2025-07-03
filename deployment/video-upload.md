# 🎥 Large Video Files Setup

Since some video files exceed GitHub's 100MB limit, they need to be uploaded directly to your server.

## 📋 Required Video Files

The following files were excluded from git and need to be uploaded manually:

### **Large Video (425MB)**
- `public/Barz in Carz - Eva Lazarus.mp4`

## 🚀 Upload Methods

### **Option 1: SCP Upload (Recommended)**

From your local machine:
```bash
# Upload the large video file to your server
scp "public/Barz in Carz - Eva Lazarus.mp4" your-user@your-server:/home/your-user/portfolio/public/

# Verify the upload
ssh your-user@your-server "ls -lh /home/your-user/portfolio/public/*.mp4"
```

### **Option 2: Upload via Server**

If the file is too large for SCP:

1. **Upload to a file sharing service** (Google Drive, Dropbox, etc.)
2. **Download on server:**
```bash
# SSH into your server
ssh your-user@your-server

# Navigate to the public directory
cd /home/your-user/portfolio/public/

# Download the file (replace URL with your sharing link)
wget "YOUR_DIRECT_DOWNLOAD_LINK" -O "Barz in Carz - Eva Lazarus.mp4"

# Or use curl
curl -L "YOUR_DIRECT_DOWNLOAD_LINK" -o "Barz in Carz - Eva Lazarus.mp4"
```

### **Option 3: Use Git LFS (Advanced)**

If you prefer to keep videos in git:

```bash
# Install Git LFS
git lfs install

# Track large video files
git lfs track "*.mp4"
git lfs track "*.mov"

# Add and commit the video files
git add "public/Barz in Carz - Eva Lazarus.mp4"
git add .gitattributes
git commit -m "Add large video files with Git LFS"
git push
```

## ✅ Verification

After uploading, verify the file exists:

```bash
# Check file exists and has correct size (should be ~425MB)
ls -lh /home/your-user/portfolio/public/"Barz in Carz - Eva Lazarus.mp4"

# Test the application can serve it
curl -I http://localhost:3000/"Barz in Carz - Eva Lazarus.mp4"
```

## 🔧 Docker Volume Mount

The docker-compose.yml already includes a volume mount for the public directory:

```yaml
volumes:
  - ./public:/app/public:ro
```

This ensures your uploaded videos are accessible to the container.

## 📝 Notes

- The portfolio will work without the large video files, but the "Barz in Carz" project card will show a loading state
- All other videos (< 40MB) are included in the git repository
- Consider optimizing video files for web delivery (H.264, smaller resolution) if needed 