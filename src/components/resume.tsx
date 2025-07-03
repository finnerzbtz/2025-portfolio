'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, Download, Eye, File } from 'lucide-react';
import Image from 'next/image';

export function Resume() {
  // Resume details
  const resumeDetails = {
    title: "Raphael's Resume",
    description: 'Full Stack Developer • AI Specialist',
    fileType: 'PDF',
    lastUpdated: 'March 2025',
    fileSize: '0.5 MB',
    previewImageSrc: '/resume_giraud_preview.png',
    downloadUrl: '/resume_giraud.pdf',
  };

  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = resumeDetails.downloadUrl;
    link.download = resumeDetails.downloadUrl.split('/').pop() || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto w-full py-8 font-sans">
      {/* Remove or replace Raphael's resume section */}
    </div>
  );
}

export default Resume;