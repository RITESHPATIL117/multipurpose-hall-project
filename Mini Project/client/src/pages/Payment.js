import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Payment.css';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

const UPI_OPTIONS = [
  { 
    id: 'gpay', 
    name: 'Google Pay', 
    upiId: 'your-upi-id@okaxis',
    image: '/images/payment/gpay.svg'
  },
  { 
    id: 'phonepe', 
    name: 'PhonePe', 
    upiId: 'your-upi-id@ybl',
    image: '/images/payment/phonepe.svg'
  },
  { 
    id: 'paytm', 
    name: 'Paytm', 
    upiId: 'your-upi-id@paytm',
    image: '/images/payment/paytm.svg'
  },
  { 
    id: 'bhim', 
    name: 'BHIM', 
    upiId: 'your-upi-id@upi',
    image: '/images/payment/bhim.svg'
  }
];

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
      eventType: "Event Type"
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
      eventType: "कार्यक्रम का प्रकार"
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
      eventType: "कार्यक्रमाचा प्रकार"
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
    }
  }
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedUpi, setSelectedUpi] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      navigate('/booking');
    }
  }, [location, navigate]);

  const handlePaymentSuccess = async (paymentMethod) => {
    try {
      console.log('Payment successful:', paymentMethod);
      alert(t('payment.paymentSuccessful'));
      navigate('/booking-confirmation', {
        state: {
          bookingDetails,
          paymentDetails: paymentMethod
        }
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      alert(t('payment.paymentError'));
    }
  };

  const handleUpiPayment = () => {
    if (!selectedUpi) {
      alert(t('payment.selectUpiApp'));
      return;
    }
    const upiLink = `upi://pay?pa=${UPI_OPTIONS.find(upi => upi.id === selectedUpi).upiId}&pn=Your%20Business%20Name&am=${bookingDetails.totalAmount}&cu=INR&tn=Event%20Booking`;
    window.open(upiLink, '_blank');
  };

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
  };

  if (!bookingDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="payment-page">
      <div className="language-selector">
        <div className="language-radio-group">
          {LANGUAGES.map((lang) => (
            <label key={lang.code} className="language-radio-label">
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={currentLanguage === lang.code}
                onChange={() => changeLanguage(lang.code)}
                className="language-radio"
              />
              <span className="language-name">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="payment-container">
        <div className="booking-summary">
          <h2>{t('payment.bookingSummary')}</h2>
          <div className="summary-details">
            <p><strong>{t('common.eventType')}:</strong> {bookingDetails.eventType}</p>
            <p><strong>{t('common.date')}:</strong> {bookingDetails.date}</p>
            <p><strong>{t('common.time')}:</strong> {bookingDetails.time}</p>
            <p><strong>{t('common.guests')}:</strong> {bookingDetails.guests}</p>
            <p><strong>{t('common.services')}:</strong></p>
            <ul>
              {bookingDetails.services?.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <p className="total-amount"><strong>{t('common.totalAmount')}:</strong> ₹{bookingDetails.totalAmount}</p>
          </div>
        </div>

        <div className="payment-section">
          <h2>{t('payment.paymentDetails')}</h2>
          <div className="payment-methods">
            <div className="payment-method-tabs">
              <button
                className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                {t('payment.creditDebitCard')}
              </button>
              <button
                className={`payment-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                {t('payment.upiPayment')}
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <Elements stripe={stripePromise}>
                <PaymentForm 
                  amount={bookingDetails.totalAmount}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>
            ) : (
              <div className="upi-payment-section">
                <h3>{t('payment.selectUpiApp')}</h3>
                <div className="upi-options">
                  {UPI_OPTIONS.map(upi => (
                    <div
                      key={upi.id}
                      className={`upi-option ${selectedUpi === upi.id ? 'selected' : ''}`}
                      onClick={() => setSelectedUpi(upi.id)}
                    >
                      <img src={upi.image} alt={upi.name} />
                      <span>{upi.name}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="upi-pay-button"
                  onClick={handleUpiPayment}
                  disabled={!selectedUpi}
                >
                  {t('payment.pay')} ₹{bookingDetails.totalAmount}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 