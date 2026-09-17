import React from 'react';
import { MessageCircle } from 'lucide-react';
import { companyData } from '../data/companyData';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${companyData.contact.whatsapp}?text=Hello%20Droworang%20International%2C%20I%20would%20like%20to%20inquire%20about%20your%20leather%20manufacturing%20and%20export%20services.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      data-cursor="WHATSAPP"
      aria-label="Chat on WhatsApp with Droworang International"
    >
      <div className="whatsapp-label">
        CHAT WITH US • +91 82738 00957
      </div>
      <div className="whatsapp-circle">
        <MessageCircle size={28} />
      </div>
    </a>
  );
}
