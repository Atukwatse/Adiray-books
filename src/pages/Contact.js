import { PROJECT_PHONE } from '../utils/constants';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Adiray Books";
  }, []);

  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'seller',
      text: 'Hi, welcome to Adiray Books. Tell us which book you want and we will help you buy it.'
    }
  ]);

  const phoneNumber = PROJECT_PHONE;
  const emails = ['info@adiraybooks.com', 'marketingandsales@adiraybooks.com'];

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = chatInput.trim();
    if (!message) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'buyer', text: message },
      {
        id: Date.now() + 1,
        sender: 'seller',
        text: 'Thanks. A seller will respond shortly. You can also share the book title, author, or screenshot here.'
      }
    ]);
    setChatInput('');
  };

  const contactOptions = [
    {
      label: 'Email Us',
      icon: 'fas fa-envelope',
      href: `mailto:${emails[0]}`,
      sublabel: emails[0]
    },
    {
      label: 'Sales & Marketing',
      icon: 'fas fa-bullhorn',
      href: `mailto:${emails[1]}`,
      sublabel: emails[1]
    },
    {
      label: 'WhatsApp',
      icon: 'fab fa-whatsapp',
      href: `https://wa.me/${phoneNumber.replace('+', '')}`,
      sublabel: phoneNumber,
      external: true,
    },
    {
      label: 'Instagram',
      icon: 'fab fa-instagram',
      href: 'https://instagram.com/adiraybooks',
      sublabel: '@adiraybooks',
      external: true,
    },
    {
      label: 'Facebook',
      icon: 'fab fa-facebook',
      href: 'https://facebook.com/adiraybooks',
      sublabel: 'adiraybooks',
      external: true,
    },
    {
      label: 'TikTok',
      icon: 'fab fa-tiktok',
      href: 'https://tiktok.com/@adiraybooks',
      sublabel: '@adiraybooks',
      external: true,
    },
    {
      label: 'Live Chat',
      icon: 'fas fa-comments',
      action: () => setShowChat(true),
      sublabel: 'Talk to a seller'
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F2EB] flex items-start justify-center px-4 py-16 sm:py-20">
      <section className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {contactOptions.map(option => {
            const content = (
              <>
                <i className={`${option.icon} text-2xl leading-none w-10 shrink-0 text-[#B8860B] group-hover:text-[#D4AF37] transition-colors`}></i>
                <div className="ml-2 flex flex-col items-start text-left">
                  <span className="text-sm font-bold tracking-wide">{option.label}</span>
                  {option.sublabel && <span className="text-[10px] text-gray-500 font-medium">{option.sublabel}</span>}
                </div>
              </>
            );
            const className = "h-20 bg-white border border-gray-200 hover:border-[#D4AF37] hover:bg-[#FFFDF7] text-charcoal flex items-center px-5 sm:px-6 transition-all group shadow-sm hover:shadow-md";

            return option.action ? (
              <button
                key={option.label}
                type="button"
                onClick={option.action}
                className={className}
              >
                {content}
              </button>
            ) : (
              <a
                key={option.label}
                href={option.href}
                target={option.external ? '_blank' : undefined}
                rel={option.external ? 'noreferrer' : undefined}
                className={className}
              >
                {content}
              </a>
            );
          })}
        </div>
      </section>

      {showChat && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
          <section className="w-full max-w-md bg-white border border-gray-200 shadow-2xl">
            <header className="h-14 bg-charcoal text-white flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-comments text-[#D4AF37] text-lg"></i>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wide">Adiray Live Chat</h2>
                  <p className="text-[10px] text-gray-300">Seller support</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowChat(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white"
                aria-label="Close live chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </header>

            <div className="h-80 overflow-y-auto bg-[#F5F2EB] p-4 space-y-3">
              {chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <p className={`max-w-[82%] px-4 py-2 text-sm leading-relaxed ${
                    message.sender === 'buyer'
                      ? 'bg-charcoal text-white'
                      : 'bg-white border border-gray-200 text-charcoal'
                  }`}>
                    {message.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 h-11 border border-gray-300 px-3 text-sm outline-none focus:border-charcoal"
              />
              <button
                type="submit"
                className="h-11 w-12 bg-charcoal text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-charcoal transition-colors"
                aria-label="Send message"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Contact;
