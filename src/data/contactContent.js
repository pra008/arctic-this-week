// Icons used here are mapped in Contact.tsx using lucide-react-native
const contactContent = {
  title: 'Contact',
  brand: 'The Arctic Institute',
  sections: [
    {
      type: 'email',
      label: 'Email Us',
      icon: 'mail',
      lines: ['info@thearcticinstitute.org'],
      url: 'mailto:info@thearcticinstitute.org',
    },
    {
      type: 'address',
      label: 'Visit Us',
      icon: 'map-pin',
      lines: [
        'Center for Circumpolar Security Studies',
        'Washington, DC 20007',
      ],
      url: 'https://maps.google.com/?q=Center for Circumpolar Security Studies, Washington, DC 20007',
    },
    {
      type: 'phone',
      label: 'Call Us',
      icon: 'phone',
      lines: ['+1 (202) 350-1384'],
      url: 'tel:+12023501384',
    },
    {
      type: 'media',
      label: 'Media Inquiries',
      icon: 'mail',
      lines: ['media@thearcticinstitute.org'],
      url: 'mailto:media@thearcticinstitute.org',
    },
  ],
};

export default contactContent;
