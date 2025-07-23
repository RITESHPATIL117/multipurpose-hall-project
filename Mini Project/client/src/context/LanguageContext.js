import React, { createContext, useState, useContext } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' }
];

const TRANSLATIONS = {
  en: {
    common: {
      booking: "Booking",
      payment: "Payment",
      services: "Services",
      totalAmount: "Total Amount",
      date: "Date",
      time: "Time",
      guests: "Guests",
      eventType: "Event Type",
      home: "Home",
      about: "About",
      events: "Events",
      gallery: "Gallery",
      contact: "Contact",
      login: "Login",
      signup: "Sign Up",
      profile: "Profile",
      logout: "Logout",
      welcome: "Welcome",
      search: "Search",
      menu: "Menu"
    },
    payment: {
      paymentDetails: "Payment Details",
      creditDebitCard: "Credit/Debit Card",
      upiPayment: "UPI Payment",
      selectUpiApp: "Select UPI App",
      pay: "Pay",
      bookingSummary: "Booking Summary",
      paymentSuccessful: "Payment successful! Your booking is confirmed.",
      paymentError: "There was an error processing your payment. Please try again."
    },
    home: {
      heroTitle: "Welcome to Our Multipurpose Hall",
      heroSubtitle: "Your Perfect Venue for Every Occasion",
      exploreServices: "Explore Our Services",
      viewGallery: "View Gallery",
      bookNow: "Book Now"
    },
    about: {
      welcome: "Welcome to EventHall",
      tagline: "Where Moments Become Memories",
      title: "About Us",
      description: "Since 2015, EventHall has been the premier destination for creating unforgettable experiences in the heart of the city. Our multipurpose halls combine elegant design with cutting-edge facilities to provide the perfect setting for your special occasions.",
      spaces: {
        title: "Our Spaces"
      },
      hall1: {
        title: "Grand Celebration Hall",
        description: "Our flagship venue perfect for weddings and large corporate events"
      },
      hall2: {
        title: "Executive Conference Center",
        description: "State-of-the-art facilities for business meetings and conferences"
      },
      hall3: {
        title: "Cultural Event Space",
        description: "Versatile space for performances, exhibitions, and cultural gatherings"
      },
      features: {
        title: "Why Choose Us",
        versatile: {
          title: "Versatile Spaces",
          description: "From intimate gatherings to grand celebrations, our halls adapt to your needs"
        },
        amenities: {
          title: "Modern Amenities",
          description: "State-of-the-art sound systems, lighting, and climate control"
        },
        support: {
          title: "Expert Support",
          description: "Dedicated event coordinators to ensure flawless execution"
        },
        location: {
          title: "Prime Location",
          description: "Easily accessible with ample parking space"
        }
      },
      capacity: {
        title: "Venue Capacity",
        grand: {
          title: "Grand Hall",
          description: "Up to 1000 guests"
        },
        conference: {
          title: "Conference Center",
          description: "Up to 300 delegates"
        },
        cultural: {
          title: "Cultural Space",
          description: "Up to 500 attendees"
        }
      },
      contact: {
        title: "Get in Touch",
        description: "Let us help you create your perfect event. Contact us for bookings and inquiries.",
        phone: "📞 Phone: +91 1234567890",
        email: "✉️ Email: info@eventhall.com",
        address: "📍 Location: 123 Event Street, City Center, PIN: 400001"
      }
    },
    services: {
      title: "Our Services",
      subtitle: "Making your events extraordinary with our comprehensive services",
      decorations: "Decorations",
      catering: "Catering",
      soundLighting: "Sound & Lighting",
      photography: "Photography",
      descriptions: {
        decorations: "Transform your venue into a magical space with our premium decoration services.",
        catering: "Delight your guests with our exquisite catering services and diverse menu options.",
        soundLighting: "State-of-the-art sound and lighting equipment for the perfect ambiance.",
        photography: "Capture your special moments with our professional photography services."
      },
      features: {
        decorations: {
          theme: "Themed Decorations",
          floral: "Floral Arrangements",
          lighting: "Lighting Setup",
          stage: "Stage Design",
          table: "Table Settings"
        },
        catering: {
          menu: "Multi-Cuisine Menu",
          live: "Live Cooking Stations",
          buffet: "Buffet Setup",
          staff: "Professional Staff",
          custom: "Customized Menus"
        },
        soundLighting: {
          dj: "Professional DJ",
          sound: "Sound Systems",
          lighting: "Mood Lighting",
          effects: "Special Effects",
          live: "Live Performance Setup"
        },
        photography: {
          photographers: "Professional Photographers",
          video: "Video Coverage",
          drone: "Drone Shots",
          booth: "Photo Booth",
          edits: "Same Day Edits"
        }
      },
      whatWeOffer: "What We Offer:",
      viewPackages: "View Packages",
      customPackage: {
        title: "Need a Custom Package?",
        description: "We can create a personalized service package tailored to your specific needs.",
        contact: "Contact Us"
      }
    },
    contact: {
      title: {
        en: 'Contact Us',
        hi: 'संपर्क करें',
        mr: 'आमच्याशी संपर्क साधा'
      },
      departments: {
        general: {
          en: 'General Inquiry',
          hi: 'सामान्य पूछताछ',
          mr: 'सामान्य चौकशी'
        },
        bookings: {
          en: 'Bookings & Reservations',
          hi: 'बुकिंग और आरक्षण',
          mr: 'बुकिंग आणि आरक्षण'
        },
        catering: {
          en: 'Catering Services',
          hi: 'खानपान सेवाएं',
          mr: 'खानपान सेवा'
        },
        decor: {
          en: 'Decoration Services',
          hi: 'सजावट सेवाएं',
          mr: 'सजावट सेवा'
        },
        technical: {
          en: 'Technical Support',
          hi: 'तकनीकी सहायता',
          mr: 'तांत्रिक सहाय्य'
        },
        feedback: {
          en: 'Feedback & Suggestions',
          hi: 'प्रतिक्रिया और सुझाव',
          mr: 'अभिप्राय आणि सूचना'
        }
      },
      timeSlots: {
        morning: {
          en: 'Morning (9 AM - 12 PM)',
          hi: 'सुबह (9 बजे - 12 बजे)',
          mr: 'सकाळ (9 वाजता - 12 वाजता)'
        },
        afternoon: {
          en: 'Afternoon (12 PM - 4 PM)',
          hi: 'दोपहर (12 बजे - 4 बजे)',
          mr: 'दुपार (12 वाजता - 4 वाजता)'
        },
        evening: {
          en: 'Evening (4 PM - 8 PM)',
          hi: 'शाम (4 बजे - 8 बजे)',
          mr: 'संध्याकाळ (4 वाजता - 8 वाजता)'
        }
      },
      validation: {
        fillRequired: {
          en: 'Please fill in all required fields before proceeding.',
          hi: 'कृपया आगे बढ़ने से पहले सभी आवश्यक फ़ील्ड भरें।',
          mr: 'कृपया पुढे जाण्यापूर्वी सर्व आवश्यक फील्ड भरा.'
        }
      },
      submit: {
        success: {
          en: 'Thank you for contacting us! We will get back to you soon.',
          hi: 'हमसे संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
          mr: 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू.'
        }
      },
      steps: {
        method: {
          title: {
            en: 'How would you like to be contacted?',
            hi: 'आप किस तरह से संपर्क करना चाहेंगे?',
            mr: 'तुम्हाला कशी संपर्क साधायची आहे?'
          },
          email: {
            en: 'Email',
            hi: 'ईमेल',
            mr: 'ईमेल'
          },
          phone: {
            en: 'Phone',
            hi: 'फोन',
            mr: 'फोन'
          }
        },
        contact: {
          title: {
            en: 'Your Contact Information',
            hi: 'आपकी संपर्क जानकारी',
            mr: 'तुमची संपर्क माहिती'
          },
          name: {
            en: 'Full Name',
            hi: 'पूरा नाम',
            mr: 'पूर्ण नाव'
          },
          email: {
            en: 'Email Address',
            hi: 'ईमेल पता',
            mr: 'ईमेल पत्ता'
          },
          phone: {
            en: 'Phone Number',
            hi: 'फोन नंबर',
            mr: 'फोन नंबर'
          }
        },
        department: {
          title: {
            en: 'Select Department',
            hi: 'विभाग चुनें',
            mr: 'विभाग निवडा'
          },
          select: {
            en: 'Select a department',
            hi: 'एक विभाग चुनें',
            mr: 'एक विभाग निवडा'
          }
        },
        subject: {
          title: {
            en: 'Subject',
            hi: 'विषय',
            mr: 'विषय'
          },
          placeholder: {
            en: 'Enter subject',
            hi: 'विषय दर्ज करें',
            mr: 'विषय प्रविष्ट करा'
          }
        },
        time: {
          title: {
            en: 'Preferred Contact Time',
            hi: 'पसंदीदा संपर्क समय',
            mr: 'पसंतीचा संपर्क वेळ'
          },
          select: {
            en: 'Select a time slot',
            hi: 'एक समय स्लॉट चुनें',
            mr: 'एक वेळ स्लॉट निवडा'
          }
        },
        message: {
          title: {
            en: 'Your Message',
            hi: 'आपका संदेश',
            mr: 'तुमचा संदेश'
          },
          placeholder: {
            en: 'Enter your message',
            hi: 'अपना संदेश दर्ज करें',
            mr: 'तुमचा संदेश प्रविष्ट करा'
          }
        }
      },
      navigation: {
        back: {
          en: 'Back',
          hi: 'वापस',
          mr: 'मागे'
        },
        next: {
          en: 'Next',
          hi: 'अगला',
          mr: 'पुढे'
        },
        submit: {
          en: 'Send Message',
          hi: 'संदेश भेजें',
          mr: 'संदेश पाठवा'
        }
      }
    }
  },
  hi: {
    common: {
      booking: "बुकिंग",
      payment: "भुगतान",
      services: "सेवाएं",
      totalAmount: "कुल राशि",
      date: "तारीख",
      time: "समय",
      guests: "अतिथि",
      eventType: "कार्यक्रम का प्रकार",
      home: "होम",
      about: "हमारे बारे में",
      events: "कार्यक्रम",
      gallery: "गैलरी",
      contact: "संपर्क",
      login: "लॉग इन",
      signup: "साइन अप",
      profile: "प्रोफाइल",
      logout: "लॉग आउट",
      welcome: "इवेंटहॉल में आपका स्वागत है",
      search: "खोजें",
      menu: "मेनू"
    },
    payment: {
      paymentDetails: "भुगतान विवरण",
      creditDebitCard: "क्रेडिट/डेबिट कार्ड",
      upiPayment: "यूपीआई भुगतान",
      selectUpiApp: "यूपीआई ऐप चुनें",
      pay: "भुगतान करें",
      bookingSummary: "बुकिंग सारांश",
      paymentSuccessful: "भुगतान सफल! आपकी बुकिंग की पुष्टि हो गई है।",
      paymentError: "आपके भुगतान को संसाधित करने में त्रुटि हुई। कृपया पुनः प्रयास करें।"
    },
    home: {
      heroTitle: "हमारे मल्टीपर्पस हॉल में आपका स्वागत है",
      heroSubtitle: "हर अवसर के लिए आपका सही स्थान",
      exploreServices: "हमारी सेवाएं देखें",
      viewGallery: "गैलरी देखें",
      bookNow: "अभी बुक करें"
    },
    about: {
      welcome: "इवेंटहॉल में आपका स्वागत है",
      tagline: "जहां पल यादें बनते हैं",
      title: "हमारे बारे में",
      description: "2015 से, इवेंटहॉल शहर के केंद्र में अविस्मरणीय अनुभव बनाने के लिए प्रमुख स्थान रहा है। हमारे बहुउद्देशीय हॉल आपके विशेष अवसरों के लिए आधुनिक सुविधाओं के साथ सुंदर डिजाइन प्रदान करते हैं।",
      spaces: {
        title: "हमारी जगहें"
      },
      hall1: {
        title: "ग्रैंड सेलिब्रेशन हॉल",
        description: "शादियों और बड़े कॉर्पोरेट कार्यक्रमों के लिए आदर्श ठिकाण"
      },
      hall2: {
        title: "एग्जीक्यूटिव कॉन्फ्रेंस सेंटर",
        description: "व्यावसायिक बैठकों और सम्मेलनों के लिए आधुनिक सुविधाएं"
      },
      hall3: {
        title: "सांस्कृतिक कार्यक्रम स्थल",
        description: "प्रदर्शनों, प्रदर्शनियों और सांस्कृतिक समारोहों के लिए बहुमुखी स्थान"
      },
      features: {
        title: "हमें क्यों चुनें",
        versatile: {
          title: "बहुमुखी स्थान",
          description: "छोटे समारोहों से लेकर बड़े उत्सवों तक, हमारे हॉल आपकी आवश्यकताओं के अनुसार अनुकूलित हैं"
        },
        amenities: {
          title: "आधुनिक सुविधाएं",
          description: "आधुनिक साउंड सिस्टम, लाइटिंग और जलवायु नियंत्रण"
        },
        support: {
          title: "विशेषज्ञ सहायता",
          description: "निर्दोष कार्यक्रम के लिए समर्पित इवेंट कोऑर्डिनेटर"
        },
        location: {
          title: "प्रमुख स्थान",
          description: "आसान पहुंच और पर्याप्त पार्किंग स्थान"
        }
      },
      capacity: {
        title: "स्थान क्षमता",
        grand: {
          title: "ग्रैंड हॉल",
          description: "1000 अतिथियों तक"
        },
        conference: {
          title: "कॉन्फ्रेंस सेंटर",
          description: "300 प्रतिनिधियों तक"
        },
        cultural: {
          title: "सांस्कृतिक स्थान",
          description: "500 उपस्थित लोगों तक"
        }
      },
      contact: {
        title: "संपर्क करें",
        description: "हमें आपके सही कार्यक्रम को बनाने में मदद करें। बुकिंग और पूछताछ के लिए संपर्क करें।",
        phone: "📞 फोन: +91 1234567890",
        email: "✉️ ईमेल: info@eventhall.com",
        address: "📍 पता: 123 इवेंट स्ट्रीट, सिटी सेंटर, पिन: 400001"
      }
    },
    services: {
      title: "हमारी सेवाएं",
      subtitle: "हमारी व्यापक सेवाओं के साथ आपके कार्यक्रमों को असाधारण बनाएं",
      decorations: "सजावट",
      catering: "खानपान",
      soundLighting: "साउंड और लाइटिंग",
      photography: "फोटोग्राफी",
      descriptions: {
        decorations: "हमारी प्रीमियम सजावट सेवाओं के साथ अपने स्थान को एक जादुई स्थान में बदलें।",
        catering: "हमारी उत्कृष्ट खानपान सेवाओं और विविध मेनू विकल्पों के साथ अपने अतिथियों को प्रसन्न करें।",
        soundLighting: "सही माहौल के लिए अत्याधुनिक साउंड और लाइटिंग उपकरण।",
        photography: "हमारी पेशेवर फोटोग्राफी सेवाओं के साथ अपने विशेष पलों को कैप्चर करें।"
      },
      features: {
        decorations: {
          theme: "थीम्ड सजावट",
          floral: "फूलों की व्यवस्था",
          lighting: "लाइटिंग सेटअप",
          stage: "स्टेज डिझाइन",
          table: "टेबल सेटिंग्स"
        },
        catering: {
          menu: "मल्टी-क्विजिन मेनू",
          live: "लाइव कुकिंग स्टेशन",
          buffet: "बुफे सेटअप",
          staff: "पेशेवर स्टाफ",
          custom: "कस्टमाइज्ड मेनू"
        },
        soundLighting: {
          dj: "पेशेवर डीजे",
          sound: "साउंड सिस्टम",
          lighting: "मूड लाइटिंग",
          effects: "विशेष प्रभाव",
          live: "लाइव परफॉरमेंस सेटअप"
        },
        photography: {
          photographers: "पेशेवर फोटोग्राफर",
          video: "वीडियो कव्हरेज",
          drone: "ड्रोन शॉट्स",
          booth: "फोटो बूथ",
          edits: "साम डे एडिट्स"
        }
      },
      whatWeOffer: "हम क्या प्रदान करते हैं:",
      viewPackages: "पैकेज देखें",
      customPackage: {
        title: "कस्टम पैकेज चाहिए?",
        description: "हम आपकी विशिष्ट आवश्यकताओं के अनुसार एक व्यक्तिगत सेवा पैकेज बना सकते हैं।",
        contact: "संपर्क करें"
      },
      timeSlots: {
        morning: {
          en: 'Morning (9 AM - 12 PM)',
          hi: 'सुबह (9 बजे - 12 बजे)',
          mr: 'सकाळ (9 वाजता - 12 वाजता)'
        },
        afternoon: {
          en: 'Afternoon (12 PM - 4 PM)',
          hi: 'दोपहर (12 बजे - 4 बजे)',
          mr: 'दुपार (12 वाजता - 4 वाजता)'
        },
        evening: {
          en: 'Evening (4 PM - 8 PM)',
          hi: 'शाम (4 बजे - 8 बजे)',
          mr: 'संध्याकाळ (4 वाजता - 8 वाजता)'
        }
      },
      validation: {
        fillRequired: {
          en: 'Please fill in all required fields before proceeding.',
          hi: 'कृपया आगे बढ़ने से पहले सभी आवश्यक फ़ील्ड भरें।',
          mr: 'कृपया पुढे जाण्यापूर्वी सर्व आवश्यक फील्ड भरा.'
        }
      },
      submit: {
        success: {
          en: 'Thank you for contacting us! We will get back to you soon.',
          hi: 'हमसे संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
          mr: 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू.'
        }
      },
      steps: {
        method: {
          title: {
            en: 'How would you like to be contacted?',
            hi: 'आप किस तरह से संपर्क करना चाहेंगे?',
            mr: 'तुम्हाला कशी संपर्क साधायची आहे?'
          },
          email: {
            en: 'Email',
            hi: 'ईमेल',
            mr: 'ईमेल'
          },
          phone: {
            en: 'Phone',
            hi: 'फोन',
            mr: 'फोन'
          }
        },
        contact: {
          title: {
            en: 'Your Contact Information',
            hi: 'आपकी संपर्क जानकारी',
            mr: 'तुमची संपर्क माहिती'
          },
          name: {
            en: 'Full Name',
            hi: 'पूरा नाम',
            mr: 'पूर्ण नाव'
          },
          email: {
            en: 'Email Address',
            hi: 'ईमेल पता',
            mr: 'ईमेल पत्ता'
          },
          phone: {
            en: 'Phone Number',
            hi: 'फोन नंबर',
            mr: 'फोन नंबर'
          }
        },
        department: {
          title: {
            en: 'Select Department',
            hi: 'विभाग चुनें',
            mr: 'विभाग निवडा'
          },
          select: {
            en: 'Select a department',
            hi: 'एक विभाग चुनें',
            mr: 'एक विभाग निवडा'
          }
        },
        subject: {
          title: {
            en: 'Subject',
            hi: 'विषय',
            mr: 'विषय'
          },
          placeholder: {
            en: 'Enter subject',
            hi: 'विषय दर्ज करें',
            mr: 'विषय प्रविष्ट करा'
          }
        },
        time: {
          title: {
            en: 'Preferred Contact Time',
            hi: 'पसंतीचा संपर्क वेळ',
            mr: 'पसंतीचा संपर्क वेळ'
          },
          select: {
            en: 'Select a time slot',
            hi: 'एक वेळ स्लॉट निवडा',
            mr: 'एक वेळ स्लॉट निवडा'
          }
        },
        message: {
          title: {
            en: 'Your Message',
            hi: 'तुमचा संदेश',
            mr: 'तुमचा संदेश'
          },
          placeholder: {
            en: 'Enter your message',
            hi: 'तुमचा संदेश प्रविष्ट करा',
            mr: 'तुमचा संदेश प्रविष्ट करा'
          }
        }
      },
      navigation: {
        back: {
          en: 'Back',
          hi: 'वापस',
          mr: 'मागे'
        },
        next: {
          en: 'Next',
          hi: 'अगला',
          mr: 'पुढे'
        },
        submit: {
          en: 'Send Message',
          hi: 'संदेश पाठवा',
          mr: 'संदेश पाठवा'
        }
      }
    },
    contact: {
      title: {
        en: 'Contact Us',
        hi: 'संपर्क करें',
        mr: 'आमच्याशी संपर्क साधा'
      },
      departments: {
        general: {
          en: 'General Inquiry',
          hi: 'सामान्य पूछताछ',
          mr: 'सामान्य चौकशी'
        },
        bookings: {
          en: 'Bookings & Reservations',
          hi: 'बुकिंग और आरक्षण',
          mr: 'बुकिंग आणि आरक्षण'
        },
        catering: {
          en: 'Catering Services',
          hi: 'खानपान सेवाएं',
          mr: 'खानपान सेवा'
        },
        decor: {
          en: 'Decoration Services',
          hi: 'सजावट सेवाएं',
          mr: 'सजावट सेवा'
        },
        technical: {
          en: 'Technical Support',
          hi: 'तकनीकी सहायता',
          mr: 'तांत्रिक सहाय्य'
        },
        feedback: {
          en: 'Feedback & Suggestions',
          hi: 'प्रतिक्रिया और सुझाव',
          mr: 'अभिप्राय आणि सूचना'
        }
      },
      timeSlots: {
        morning: {
          en: 'Morning (9 AM - 12 PM)',
          hi: 'सुबह (9 बजे - 12 बजे)',
          mr: 'सकाळ (9 वाजता - 12 वाजता)'
        },
        afternoon: {
          en: 'Afternoon (12 PM - 4 PM)',
          hi: 'दोपहर (12 बजे - 4 बजे)',
          mr: 'दुपार (12 वाजता - 4 वाजता)'
        },
        evening: {
          en: 'Evening (4 PM - 8 PM)',
          hi: 'शाम (4 बजे - 8 बजे)',
          mr: 'संध्याकाळ (4 वाजता - 8 वाजता)'
        }
      },
      validation: {
        fillRequired: {
          en: 'Please fill in all required fields before proceeding.',
          hi: 'कृपया आगे बढ़ने से पहले सभी आवश्यक फ़ील्ड भरें।',
          mr: 'कृपया पुढे जाण्यापूर्वी सर्व आवश्यक फील्ड भरा.'
        }
      },
      submit: {
        success: {
          en: 'Thank you for contacting us! We will get back to you soon.',
          hi: 'हमसे संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
          mr: 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू.'
        }
      },
      steps: {
        method: {
          title: {
            en: 'How would you like to be contacted?',
            hi: 'आप किस तरह से संपर्क करना चाहेंगे?',
            mr: 'तुम्हाला कशी संपर्क साधायची आहे?'
          },
          email: {
            en: 'Email',
            hi: 'ईमेल',
            mr: 'ईमेल'
          },
          phone: {
            en: 'Phone',
            hi: 'फोन',
            mr: 'फोन'
          }
        },
        contact: {
          title: {
            en: 'Your Contact Information',
            hi: 'आपकी संपर्क जानकारी',
            mr: 'तुमची संपर्क माहिती'
          },
          name: {
            en: 'Full Name',
            hi: 'पूरा नाम',
            mr: 'पूर्ण नाव'
          },
          email: {
            en: 'Email Address',
            hi: 'ईमेल पता',
            mr: 'ईमेल पत्ता'
          },
          phone: {
            en: 'Phone Number',
            hi: 'फोन नंबर',
            mr: 'फोन नंबर'
          }
        },
        department: {
          title: {
            en: 'Select Department',
            hi: 'विभाग चुनें',
            mr: 'विभाग निवडा'
          },
          select: {
            en: 'Select a department',
            hi: 'एक विभाग चुनें',
            mr: 'एक विभाग निवडा'
          }
        },
        subject: {
          title: {
            en: 'Subject',
            hi: 'विषय',
            mr: 'विषय'
          },
          placeholder: {
            en: 'Enter subject',
            hi: 'विषय दर्ज करें',
            mr: 'विषय प्रविष्ट करा'
          }
        },
        time: {
          title: {
            en: 'Preferred Contact Time',
            hi: 'पसंतीचा संपर्क वेळ',
            mr: 'पसंतीचा संपर्क वेळ'
          },
          select: {
            en: 'Select a time slot',
            hi: 'एक वेळ स्लॉट निवडा',
            mr: 'एक वेळ स्लॉट निवडा'
          }
        },
        message: {
          title: {
            en: 'Your Message',
            hi: 'तुमचा संदेश',
            mr: 'तुमचा संदेश'
          },
          placeholder: {
            en: 'Enter your message',
            hi: 'तुमचा संदेश प्रविष्ट करा',
            mr: 'तुमचा संदेश प्रविष्ट करा'
          }
        }
      },
      navigation: {
        back: {
          en: 'Back',
          hi: 'वापस',
          mr: 'मागे'
        },
        next: {
          en: 'Next',
          hi: 'अगला',
          mr: 'पुढे'
        },
        submit: {
          en: 'Send Message',
          hi: 'संदेश पाठवा',
          mr: 'संदेश पाठवा'
        }
      }
    }
  },
  mr: {
    common: {
      booking: "बुकिंग",
      payment: "पेमेंट",
      services: "सेवा",
      totalAmount: "एकूण रक्कम",
      date: "तारीख",
      time: "वेळ",
      guests: "पाहुणे",
      eventType: "कार्यक्रमाचा प्रकार",
      home: "होम",
      about: "आमच्याबद्दल",
      events: "कार्यक्रम",
      gallery: "गॅलरी",
      contact: "संपर्क",
      login: "लॉगिन",
      signup: "साइन अप",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      welcome: "इव्हेंटहॉलमध्ये आपले स्वागत आहे",
      search: "शोधा",
      menu: "मेनू"
    },
    payment: {
      paymentDetails: "पेमेंट तपशील",
      creditDebitCard: "क्रेडिट/डेबिट कार्ड",
      upiPayment: "यूपीआई पेमेंट",
      selectUpiApp: "यूपीआई ऍप निवडा",
      pay: "पेमेंट करा",
      bookingSummary: "बुकिंग सारांश",
      paymentSuccessful: "पेमेंट यशस्वी! तुमची बुकिंग पुष्टी झाली आहे.",
      paymentError: "तुमच्या पेमेंट प्रक्रियेत त्रुटी आली आहे. कृपया पुन्हा प्रयत्न करा."
    },
    home: {
      heroTitle: "आमच्या मल्टीपर्पस हॉलमध्ये आपले स्वागत आहे",
      heroSubtitle: "प्रत्येक प्रसंगासाठी आपली परिपूर्ण जागा",
      exploreServices: "आमच्या सेवा पहा",
      viewGallery: "गॅलरी पहा",
      bookNow: "आता बुक करा"
    },
    about: {
      welcome: "इव्हेंटहॉलमध्ये आपले स्वागत आहे",
      tagline: "जिथे क्षण स्मृती बनतात",
      title: "आमच्याबद्दल",
      description: "2015 पासून, इव्हेंटहॉल शहराच्या मध्यभागी अविस्मरणीय अनुभव तयार करण्यासाठी प्रमुख ठिकाण आहे. आमचे बहुउद्देशीय हॉल आपल्या विशेष प्रसंगांसाठी आधुनिक सुविधांसह सुंदर डिझाइन प्रदान करतात.",
      spaces: {
        title: "आमची जागा"
      },
      hall1: {
        title: "ग्रँड सेलिब्रेशन हॉल",
        description: "लग्न आणि मोठ्या कॉर्पोरेट कार्यक्रमांसाठी आदर्श ठिकाण"
      },
      hall2: {
        title: "एग्झिक्युटिव्ह कॉन्फरन्स सेंटर",
        description: "व्यवसाय बैठकी आणि परिषदांसाठी आधुनिक सुविधा"
      },
      hall3: {
        title: "सांस्कृतिक कार्यक्रम जागा",
        description: "प्रदर्शन, प्रदर्शने आणि सांस्कृतिक सभांसाठी बहुउपयोगी जागा"
      },
      features: {
        title: "आम्हाला का निवडा",
        versatile: {
          title: "बहुउपयोगी जागा",
          description: "लहान सभांपासून मोठ्या उत्सवांपर्यंत, आमचे हॉल आपल्या गरजांनुसार जुळवून घेतात"
        },
        amenities: {
          title: "आधुनिक सुविधा",
          description: "आधुनिक साउंड सिस्टम, लाइटिंग आणि हवामान नियंत्रण"
        },
        support: {
          title: "तज्ज्ञ सहाय्य",
          description: "निर्दोष कार्यक्रमासाठी समर्पित इव्हेंट कोऑर्डिनेटर"
        },
        location: {
          title: "प्रमुख स्थान",
          description: "सहज प्रवेश आणि पुरेसा पार्किंग स्थान"
        }
      },
      capacity: {
        title: "स्थान क्षमता",
        grand: {
          title: "ग्रँड हॉल",
          description: "1000 पाहुण्यांपर्यंत"
        },
        conference: {
          title: "कॉन्फरन्स सेंटर",
          description: "300 प्रतिनिधींपर्यंत"
        },
        cultural: {
          title: "सांस्कृतिक जागा",
          description: "500 उपस्थितांपर्यंत"
        }
      },
      contact: {
        title: "संपर्क साधा",
        description: "आपला परिपूर्ण कार्यक्रम तयार करण्यात आम्हाला मदत करू द्या. बुकिंग आणि चौकशीसाठी संपर्क साधा.",
        phone: "📞 फोन: +91 1234567890",
        email: "✉️ ईमेल: info@eventhall.com",
        address: "📍 पत्ता: 123 इव्हेंट स्ट्रीट, सिटी सेंटर, पिन: 400001"
      }
    },
    services: {
      title: "आमच्या सेवा",
      subtitle: "आमच्या व्यापक सेवांसह तुमचे कार्यक्रम असाधारण बनवा",
      decorations: "सजावट",
      catering: "खाद्यपदार्थ",
      soundLighting: "साउंड आणि लाइटिंग",
      photography: "फोटोग्राफी",
      descriptions: {
        decorations: "आमच्या प्रीमियम सजावट सेवांसह तुमच्या जागेला जादुई जागेत रूपांतरित करा.",
        catering: "आमच्या उत्कृष्ट खाद्यपदार्थ सेवा आणि विविध मेनू पर्यायांसह तुमच्या पाहुण्यांना आनंदीत करा.",
        soundLighting: "परिपूर्ण वातावरणासाठी अत्याधुनिक साउंड आणि लाइटिंग उपकरणे.",
        photography: "आमच्या व्यावसायिक फोटोग्राफी सेवांसह तुमचे विशेष क्षण कॅप्चर करा."
      },
      features: {
        decorations: {
          theme: "थीम्ड सजावट",
          floral: "फुलांची मांडणी",
          lighting: "लाइटिंग सेटअप",
          stage: "स्टेज डिझाइन",
          table: "टेबल सेटिंग्स"
        },
        catering: {
          menu: "मल्टी-क्विजिन मेनू",
          live: "लाइव्ह कुकिंग स्टेशन्स",
          buffet: "बुफे सेटअप",
          staff: "व्यावसायिक कर्मचारी",
          custom: "कस्टमाइज्ड मेनू"
        },
        soundLighting: {
          dj: "व्यावसायिक डीजे",
          sound: "साउंड सिस्टम",
          lighting: "मूड लाइटिंग",
          effects: "विशेष प्रभाव",
          live: "लाइव्ह परफॉरमन्स सेटअप"
        },
        photography: {
          photographers: "व्यावसायिक फोटोग्राफर",
          video: "व्हिडिओ कव्हरेज",
          drone: "ड्रोन शॉट्स",
          booth: "फोटो बूथ",
          edits: "साम डे एडिट्स"
        }
      },
      whatWeOffer: "आम्ही काय ऑफर करतो:",
      viewPackages: "पॅकेज पहा",
      customPackage: {
        title: "कस्टम पॅकेज हवा आहे?",
        description: "आम्ही तुमच्या विशिष्ट गरजांनुसार एक वैयक्तिकृत सेवा पॅकेज तयार करू शकतो.",
        contact: "संपर्क साधा"
      },
      timeSlots: {
        morning: {
          en: 'Morning (9 AM - 12 PM)',
          hi: 'सकाळ (9 वाजता - 12 वाजता)',
          mr: 'सकाळ (9 वाजता - 12 वाजता)'
        },
        afternoon: {
          en: 'Afternoon (12 PM - 4 PM)',
          hi: 'दुपार (12 वाजता - 4 वाजता)',
          mr: 'दुपार (12 वाजता - 4 वाजता)'
        },
        evening: {
          en: 'Evening (4 PM - 8 PM)',
          hi: 'संध्याकाळ (4 वाजता - 8 वाजता)',
          mr: 'संध्याकाळ (4 वाजता - 8 वाजता)'
        }
      },
      validation: {
        fillRequired: {
          en: 'Please fill in all required fields before proceeding.',
          hi: 'कृपया आगे बढ़ने से पहले सभी आवश्यक फ़ील्ड भरें।',
          mr: 'कृपया पुढे जाण्यापूर्वी सर्व आवश्यक फील्ड भरा.'
        }
      },
      submit: {
        success: {
          en: 'Thank you for contacting us! We will get back to you soon.',
          hi: 'हमसे संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
          mr: 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू.'
        }
      },
      steps: {
        method: {
          title: {
            en: 'How would you like to be contacted?',
            hi: 'तुम्हाला कशी संपर्क साधायची आहे?',
            mr: 'तुम्हाला कशी संपर्क साधायची आहे?'
          },
          email: {
            en: 'Email',
            hi: 'ईमेल',
            mr: 'ईमेल'
          },
          phone: {
            en: 'Phone',
            hi: 'फोन',
            mr: 'फोन'
          }
        },
        contact: {
          title: {
            en: 'Your Contact Information',
            hi: 'तुमची संपर्क माहिती',
            mr: 'तुमची संपर्क माहिती'
          },
          name: {
            en: 'Full Name',
            hi: 'पूरा नाम',
            mr: 'पूर्ण नाव'
          },
          email: {
            en: 'Email Address',
            hi: 'ईमेल पता',
            mr: 'ईमेल पत्ता'
          },
          phone: {
            en: 'Phone Number',
            hi: 'फोन नंबर',
            mr: 'फोन नंबर'
          }
        },
        department: {
          title: {
            en: 'Select Department',
            hi: 'विभाग निवडा',
            mr: 'विभाग निवडा'
          },
          select: {
            en: 'Select a department',
            hi: 'एक विभाग चुनें',
            mr: 'एक विभाग निवडा'
          }
        },
        subject: {
          title: {
            en: 'Subject',
            hi: 'विषय',
            mr: 'विषय'
          },
          placeholder: {
            en: 'Enter subject',
            hi: 'विषय दर्ज करें',
            mr: 'विषय प्रविष्ट करा'
          }
        },
        time: {
          title: {
            en: 'Preferred Contact Time',
            hi: 'पसंतीचा संपर्क वेळ',
            mr: 'पसंतीचा संपर्क वेळ'
          },
          select: {
            en: 'Select a time slot',
            hi: 'एक वेळ स्लॉट निवडा',
            mr: 'एक वेळ स्लॉट निवडा'
          }
        },
        message: {
          title: {
            en: 'Your Message',
            hi: 'तुमचा संदेश',
            mr: 'तुमचा संदेश'
          },
          placeholder: {
            en: 'Enter your message',
            hi: 'तुमचा संदेश प्रविष्ट करा',
            mr: 'तुमचा संदेश प्रविष्ट करा'
          }
        }
      },
      navigation: {
        back: {
          en: 'Back',
          hi: 'मागे',
          mr: 'मागे'
        },
        next: {
          en: 'Next',
          hi: 'पुढे',
          mr: 'पुढे'
        },
        submit: {
          en: 'Send Message',
          hi: 'संदेश पाठवा',
          mr: 'संदेश पाठवा'
        }
      }
    },
    contact: {
      title: {
        en: 'Contact Us',
        hi: 'संपर्क करें',
        mr: 'आमच्याशी संपर्क साधा'
      },
      departments: {
        general: {
          en: 'General Inquiry',
          hi: 'सामान्य पूछताछ',
          mr: 'सामान्य चौकशी'
        },
        bookings: {
          en: 'Bookings & Reservations',
          hi: 'बुकिंग और आरक्षण',
          mr: 'बुकिंग आणि आरक्षण'
        },
        catering: {
          en: 'Catering Services',
          hi: 'खानपान सेवाएं',
          mr: 'खानपान सेवा'
        },
        decor: {
          en: 'Decoration Services',
          hi: 'सजावट सेवाएं',
          mr: 'सजावट सेवा'
        },
        technical: {
          en: 'Technical Support',
          hi: 'तकनीकी सहायता',
          mr: 'तांत्रिक सहाय्य'
        },
        feedback: {
          en: 'Feedback & Suggestions',
          hi: 'प्रतिक्रिया और सुझाव',
          mr: 'अभिप्राय आणि सूचना'
        }
      },
      timeSlots: {
        morning: {
          en: 'Morning (9 AM - 12 PM)',
          hi: 'सकाळ (9 वाजता - 12 वाजता)',
          mr: 'सकाळ (9 वाजता - 12 वाजता)'
        },
        afternoon: {
          en: 'Afternoon (12 PM - 4 PM)',
          hi: 'दुपार (12 वाजता - 4 वाजता)',
          mr: 'दुपार (12 वाजता - 4 वाजता)'
        },
        evening: {
          en: 'Evening (4 PM - 8 PM)',
          hi: 'संध्याकाळ (4 वाजता - 8 वाजता)',
          mr: 'संध्याकाळ (4 वाजता - 8 वाजता)'
        }
      },
      validation: {
        fillRequired: {
          en: 'Please fill in all required fields before proceeding.',
          hi: 'कृपया आगे बढ़ने से पहले सभी आवश्यक फ़ील्ड भरें।',
          mr: 'कृपया पुढे जाण्यापूर्वी सर्व आवश्यक फील्ड भरा.'
        }
      },
      submit: {
        success: {
          en: 'Thank you for contacting us! We will get back to you soon.',
          hi: 'हमसे संपर्क करने के लिए धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे।',
          mr: 'आमच्याशी संपर्क साधल्याबद्दल धन्यवाद! आम्ही लवकरच तुमच्याशी संपर्क साधू.'
        }
      },
      steps: {
        method: {
          title: {
            en: 'How would you like to be contacted?',
            hi: 'तुम्हाला कशी संपर्क साधायची आहे?',
            mr: 'तुम्हाला कशी संपर्क साधायची आहे?'
          },
          email: {
            en: 'Email',
            hi: 'ईमेल',
            mr: 'ईमेल'
          },
          phone: {
            en: 'Phone',
            hi: 'फोन',
            mr: 'फोन'
          }
        },
        contact: {
          title: {
            en: 'Your Contact Information',
            hi: 'तुमची संपर्क माहिती',
            mr: 'तुमची संपर्क माहिती'
          },
          name: {
            en: 'Full Name',
            hi: 'पूरा नाम',
            mr: 'पूर्ण नाव'
          },
          email: {
            en: 'Email Address',
            hi: 'ईमेल पता',
            mr: 'ईमेल पत्ता'
          },
          phone: {
            en: 'Phone Number',
            hi: 'फोन नंबर',
            mr: 'फोन नंबर'
          }
        },
        department: {
          title: {
            en: 'Select Department',
            hi: 'विभाग निवडा',
            mr: 'विभाग निवडा'
          },
          select: {
            en: 'Select a department',
            hi: 'एक विभाग चुनें',
            mr: 'एक विभाग निवडा'
          }
        },
        subject: {
          title: {
            en: 'Subject',
            hi: 'विषय',
            mr: 'विषय'
          },
          placeholder: {
            en: 'Enter subject',
            hi: 'विषय दर्ज करें',
            mr: 'विषय प्रविष्ट करा'
          }
        },
        time: {
          title: {
            en: 'Preferred Contact Time',
            hi: 'पसंतीचा संपर्क वेळ',
            mr: 'पसंतीचा संपर्क वेळ'
          },
          select: {
            en: 'Select a time slot',
            hi: 'एक वेळ स्लॉट निवडा',
            mr: 'एक वेळ स्लॉट निवडा'
          }
        },
        message: {
          title: {
            en: 'Your Message',
            hi: 'तुमचा संदेश',
            mr: 'तुमचा संदेश'
          },
          placeholder: {
            en: 'Enter your message',
            hi: 'तुमचा संदेश प्रविष्ट करा',
            mr: 'तुमचा संदेश प्रविष्ट करा'
          }
        }
      },
      navigation: {
        back: {
          en: 'Back',
          hi: 'मागे',
          mr: 'मागे'
        },
        next: {
          en: 'Next',
          hi: 'पुढे',
          mr: 'पुढे'
        },
        submit: {
          en: 'Send Message',
          hi: 'संदेश पाठवा',
          mr: 'संदेश पाठवा'
        }
      }
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const t = (key) => {
    const keys = key.split('.');
    let translation = TRANSLATIONS[currentLanguage];
    for (const k of keys) {
      translation = translation[k];
    }
    return translation || key;
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 