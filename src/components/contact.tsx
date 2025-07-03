'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Linkedin, Youtube, Instagram, Github, BookOpen } from 'lucide-react';

export function Contact() {
  // Contact information
  const contactInfo = {
    name: 'Finley Howard',
    email: 'fin.howard03@gmail.com',
    handle: '@finnerz',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/finn-howard-151ab8ab/',
        icon: Linkedin,
      },
      {
        name: 'Youtube',
        url: 'https://www.youtube.com/@AISMRDailyVideos/shorts',
        icon: Youtube,
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/fieves.uk/',
        icon: Instagram,
      },
      {
        name: 'Github',
        url: 'https://github.com/finnerzbtz',
        icon: Github,
      },
      {
        name: 'Substack',
        url: 'https://substack.com/@finnerz1',
        icon: BookOpen,
      },
    ],
  };

  // Function to handle opening links
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
            Contacts
          </h2>
        </div>

        {/* Email Section */}
        <div className="mt-8 flex flex-col md:mt-10">
          <div
            className="group mb-5 cursor-pointer"
            onClick={() => openLink(`mailto:${contactInfo.email}`)}
          >
            <div className="flex items-center gap-1">
              <span className="text-base font-medium text-blue-500 hover:underline sm:text-lg">
                {contactInfo.email}
              </span>
              <ChevronRight className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-8">
            {contactInfo.socials.map((social) => {
              const IconComponent = social.icon;
              return (
              <button
                key={social.name}
                  className="text-muted-foreground hover:text-foreground flex items-center gap-2 cursor-pointer text-sm transition-colors"
                onClick={() => openLink(social.url)}
                title={social.name}
              >
                  <IconComponent className="h-4 w-4" />
                {social.name}
              </button>
              );
            })}
          </div>
        </div>


      </div>
    </div>
  );
}

export default Contact;
