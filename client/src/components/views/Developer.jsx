import React from 'react';
/* eslint no-unused-vars: "off" */
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { SiGmail } from "react-icons/si";
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';

const TeamMember = ({ name, role, socialLinks }) => {
  return (
    <div className="bg-grey flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6">
      <div className="relative overflow-hidden bg-grey dark:bg-gray-800 mb-12 hover-grayscale-0 wow fadeInUp" data-wow-duration="1s" style={{ visibility: 'visible', animationDuration: '1s', animationName: 'fadeInUp' }}>
        {/* team block */}
        <div className="pt-6 text-center">
          <p className="text-lg leading-normal font-spartan mb-1">{name}</p>
          <p className="text-black leading-relaxed font-quick">{role}</p>
          {/* social icon */}
          <div className="mt-2 mb-5 space-x-2 flex justify-center">
            {socialLinks.map((socialLink, index) => (
              <a key={index} className="hover:text-blue-700" aria-label={socialLink.label} href={socialLink.url} target="_blank" rel="noopener noreferrer">
                {socialLink.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* end team block */}
    </div>
  );
};

const Developer = () => {
  const teamMembers = [
    {
      name: 'John Ignacio Tosso',
      role: 'UI/UX Developer',
      socialLinks: [
        {
          label: 'GitHub',
          url: 'https://github.com/JuanTosso',
          icon: <AiFillGithub />,
        },
        {
          label: 'Linkedin',
          url: 'https://www.linkedin.com/in/juanignaciotosso/',
          icon: <AiFillLinkedin />,
        },
        {
          label: 'Gmail',
          url: 'mailto:juantosso89@gmail.com',
          icon: <SiGmail />,
        },
      ],
    },
    {
      name: 'Daniel Gomez',
      role: 'UI/UX Developer',
      socialLinks: [
        {
          label: 'GitHub',
          url: 'https://github.com/Danogomez',
          icon: <AiFillGithub />,
        },
        {
          label: 'Linkedin',
          url: 'https://www.linkedin.com/in/daniel-gomez-5a1400199/',
          icon: <AiFillLinkedin />,
        },
        {
          label: 'Gmail',
          url: 'mailto:danovuksa3232@gmail.com',
          icon: <SiGmail />,
        },
      ],
    },
    {
      name: 'Wilson Sánchez',
      role: 'UI/UX Developer',
      socialLinks: [
        {
          label: 'GitHub',
          url: 'https://github.com/WilsonSanFullStack',
          icon: <AiFillGithub />,
        },
        {
          label: 'Linkedin',
          url: 'https://www.linkedin.com/in/wilson-san-280893265',
          icon: <AiFillLinkedin />,
        },
        {
          label: 'Gmail',
          url: 'mailto:clinicasystemlab@gmail.com',
          icon: <SiGmail />,
        },
      ],
    },
    {
      name: 'David Felipe Florido',
      role: 'UI/UX Developer',
      socialLinks: [
        {
          label: 'GitHub',
          url: 'https://github.com/DavidPaimon',
          icon: <AiFillGithub />,
        },
        {
          label: 'Linkedin',
          url: 'https://www.linkedin.com/in/david-felipe-florido-jim%C3%A9nez-a862bb262/',
          icon: <AiFillLinkedin />,
        },
        {
          label: 'Gmail',
          url: 'mailto:davidfelipe.fj@gmail.com',
          icon: <SiGmail />,
        },
      ],
    },
    {
     name: 'Sebastian Rasstelli',
     role: 'UI/UX Developer',
     socialLinks: [
      {
        label: 'GitHub',
        url: 'https://github.com/sebarastelli',
        icon: <AiFillGithub />,
      },
      {
        label: 'Linkedin',
        url: 'https://www.linkedin.com/in/sebasti%C3%A1n-rastelli-854876253/',
        icon: <AiFillLinkedin />,
      },
      {
        label: 'Gmail',
        url: 'mailto:seba-rastelli@hotmail.com',
        icon: <SiGmail />,
      },
        ],
      },
      {
     name: 'Pablo Bottoni',
     role: 'UI/UX Developer',
     socialLinks: [
      {
        label: 'GitHub',
        url: 'https://github.com/PabNic',
        icon: <AiFillGithub />,
      },
      {
        label: 'Linkedin',
        url: 'http://www.linkedin.com/in/pablo-bottoni-3a5621255',
        icon: <AiFillLinkedin />,
      },
      {
        label: 'Gmail',
        url: 'mailto:polches@gmail.com',
        icon: <SiGmail />,
      },
        ],
      },
      {
     name: 'Sebastian Tovar',
     role: 'UI Developer',
     socialLinks: [
      {
      label: 'GitHub',
      url: 'https://github.com/SebastiT',
      icon: <AiFillGithub />,
    },
    {
      label: 'Linkedin',
      url: 'http://www.linkedin.com/in/sebastian-tovar-28b7b1254',
      icon: <AiFillLinkedin />,
    },
    {
      label: 'Gmail',
      url: 'mailto:sebastiantovar1812@gmail.com',
      icon: <SiGmail />,
    },
        ],
      },
      {
     name: 'Yorvis Melendez',
     role: 'UI Developer',
     socialLinks: [
      {
      label: 'GitHub',
      url: 'https://github.com/yorvismel',
      icon: <AiFillGithub />,
    },
    {
      label: 'Linkedin',
      url: 'https://www.linkedin.com/in/yorvis-mel%C3%A9ndez-29421a259/',
      icon: <AiFillLinkedin />,
    },
    {
      label: 'Gmail',
      url: 'mailto:notfound',
      icon: <SiGmail />,
    },
        ],
      },
  ];

  return (
    <>
    <NavBar />
    <div id="team" className="section relative pt-20 pb-8 md:pt-16 bg-grey dark:bg-gray-800">
      <div className="container xl:max-w-6xl mx-auto px-4">
        {/* section header */}
        <header className="text-center mx-auto mb-12">
          <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
            <span className="font-light">Our</span> Developer <span className="font-light">Team</span>
          </h2>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 100 60"
            style={{ margin: '0 auto', height: '35px' }}
            xmlSpace="preserve"
          >
            {/* SVG Paths */}
          </svg>
        </header>
        {/* end section header */}
        {/* row */}
        <div className="flex flex-wrap flex-row -mx-4 justify-center">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} name={member.name} role={member.role} imgSrc={member.imgSrc} socialLinks={member.socialLinks} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Developer;
