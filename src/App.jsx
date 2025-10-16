import React, { useState, useEffect, useRef } from 'react';
import { Bot, MessageSquareText, ShieldCheck, DollarSign, Users, FormInput, FileText, ArrowRight, Clock, Zap, Sun, Moon, Mail, Phone, Heart } from 'lucide-react';
import l1 from './tripit_logo.png'; 
import { inject } from '@vercel/analytics'; 


// --- Theme Definitions ---
const darkTheme = {
    bgPrimary: 'bg-gray-900', // Base page color (Darkest)
    bgSecondary: 'bg-gray-800', 
    textPrimary: 'text-white',
    textSecondary: 'text-gray-400',
    cardBg: 'bg-gray-900', 
    cardBorder: 'border-gray-700',
    primaryColor: 'text-blue-400',
    accent: 'bg-blue-600',
    accentHover: 'hover:bg-blue-700',
    accentShadow: 'shadow-blue-500/50',
    accentRing: 'ring-gray-900',
    accentButton: 'bg-blue-600 text-white',
    accentButtonHover: 'hover:hover:bg-blue-700',
    whatsappBg: 'bg-green-600',
    whatsappDot: 'bg-green-300',
    whatsappChatBg: 'bg-gray-100', // 👈 CONSISTENT (Light Gray)
    whatsappBubbleOutgoing: 'bg-[#005c4b]', 
    whatsappBubbleIncoming: 'bg-white', // Incoming bubble color
};

const lightTheme = {
    bgPrimary: 'bg-white',
    bgSecondary: 'bg-gray-100',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    cardBg: 'bg-white',
    cardBorder: 'border-gray-200',
    primaryColor: 'text-indigo-600',
    accent: 'bg-indigo-600',
    accentHover: 'hover:bg-indigo-700',
    accentShadow: 'shadow-indigo-500/50',
    accentRing: 'ring-white',
    accentButton: 'bg-indigo-600 text-white',
    accentButtonHover: 'hover:bg-indigo-700',
    whatsappBg: 'bg-emerald-500',
    whatsappDot: 'bg-emerald-300',
    whatsappChatBg: 'bg-gray-100', // 👈 CONSISTENT (Light Gray)
    whatsappBubbleOutgoing: 'bg-[#D9FDD3]', 
    whatsappBubbleIncoming: 'bg-white', // Incoming bubble color
};

// --- Data Structures ---
const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'problem', label: 'The Pain' },
    { id: 'solution', label: 'tripIT Bot' },
    { id: 'workflow', label: 'How It Works' },
    { id: 'roi', label: 'ROI' }, 
    { id: 'testimonials', label: 'Testimonials' },
];

const PAIN_POINTS = [
    { icon: MessageSquareText, title: "Scaling Nightmare", description: "Two-way traveller communication is nearly impossible to scale for large MICE and Leisure companies.", color: "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400" },
    { icon: ShieldCheck, title: "Inconsistent Experience", description: "Delivering high-quality, consistent service across multiple projects is impossible with manual processes.", color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" },
    { icon: DollarSign, title: "High Labour Costs", description: "Scaling manual operations always translates to higher labour costs and reduced team efficiency.", color: "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400" },
];

const WORKFLOW_STEPS = [
    { icon: Users, title: "Upload Traveller Data", description: "Import group details in bulk securely.", delay: 0 },
    { icon: FormInput, title: "Design & Launch Forms", description: "Collect documents and preferences via custom forms.", delay: 100 },
    { icon: ShieldCheck, title: "Verify & Approve", description: "Validate traveller data seamlessly via the admin panel.", delay: 200 },
    { icon: FileText, title: "Distribute Docs", description: "Upload tickets, itineraries, and confirmations centrally.", delay: 300 },
    { icon: Bot, title: "WhatsApp Assistant", description: "Travellers chat with tripIT Bot to access all their documents instantly, anytime.", delay: 400 },
];

// --- Utility Functions ---
const ScrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const getInitialTheme = () => {
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) { 
        return 'dark';
    }
    return 'light';
};

// -----------------------------------------------------------------------------
//                                 COMPONENTS
// -----------------------------------------------------------------------------

/**
 * Header Component (Navigation, Logo, Theme Toggle)
 */
const Header = ({ theme, toggleTheme, activeSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [vanishThemeButton, setVanishThemeButton] = useState(false);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const oppositeTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setIsSticky(isScrolled);
            setVanishThemeButton(isScrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = () => {
        window.location.reload(); 
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? `${currentTheme.bgSecondary} shadow-xl py-3` : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
                
                {/* LOGO: Image + Text (TRIPIT) - Refreshes on click */}
                <button 
                    onClick={handleLogoClick}
                    className="text-3xl font-extrabold flex items-center tracking-tight focus:outline-none"
                >
                    {/* LOGO IMAGE IMPLEMENTATION */}
                    <img 
                        src={l1}
                        alt="TRIPIT Logo"
                        className="h-7 w-auto mr-2 md:h-8"
                        style={{ filter: theme === 'dark' ? 'brightness(1.2)' : 'none' }}
                    />

                    <span className={`text-3xl font-extrabold ${currentTheme.textPrimary}`}>TRIPIT</span>
                </button>
                
                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-8 items-center">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => ScrollToSection(item.id)}
                            className={`
                                ${currentTheme.textSecondary} 
                                ${currentTheme.primaryColor.replace('text', 'hover:text')} 
                                font-medium transition duration-300 relative group
                                ${activeSection === item.id ? `${currentTheme.primaryColor} !font-bold` : ''} 
                            `}
                        >
                            {item.label}
                            {/* Active/Hover Underline */}
                            <span className={`absolute left-0 bottom-0 w-full h-0.5 ${currentTheme.primaryColor.replace('text', 'bg')} origin-left transition-transform duration-300 ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </button>
                    ))}
                    {/* Theme Toggle Button (Desktop) - Highlighted and vanishing */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition duration-300 ml-4 
                            ${currentTheme.accentButtonHover.replace('hover:bg', 'bg-').split(' ')[0].replace('bg-indigo', 'bg-gray').replace('bg-blue', 'bg-gray')}
                            ${vanishThemeButton 
                                ? 'opacity-0 scale-90 pointer-events-none' 
                                : 'opacity-100 scale-100 shadow-xl ring-4 ring-yellow-400/50 dark:ring-blue-400/50' 
                            }
                            transition-all duration-500
                        `}
                        aria-label={`Switch to ${oppositeTheme} theme`}
                        disabled={vanishThemeButton}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                    </button>
                </nav>

                {/* CTA and Mobile Menu */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => ScrollToSection('contact')}
                        className={`hidden md:block px-4 py-2 ${currentTheme.accentButton} font-semibold rounded-full shadow-lg ${currentTheme.accentButtonHover} transition duration-300 transform hover:scale-105`}
                    >
                        Contact Us
                    </button>
                    {/* Theme Toggle Button (Mobile - stays visible) */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full md:hidden 
                            ${currentTheme.accentButtonHover.replace('hover:bg', 'bg-').split(' ')[0].replace('bg-indigo', 'bg-gray').replace('bg-blue', 'bg-gray')} transition duration-300`}
                        aria-label={`Switch to ${oppositeTheme} theme`}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
                    </button>
                    <button
                        className={`lg:hidden p-2 ${currentTheme.textSecondary} ${currentTheme.primaryColor.replace('text', 'hover:text')}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu Dropdown */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 mt-2 shadow-md ' + currentTheme.bgPrimary : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <nav className="flex flex-col p-4 space-y-2">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { ScrollToSection(item.id); setIsMenuOpen(false); }}
                            className={`py-2 text-left ${currentTheme.textPrimary} hover:opacity-70 rounded-lg px-4 transition duration-200 ${activeSection === item.id ? `font-bold ${currentTheme.primaryColor}` : ''}`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => { ScrollToSection('contact'); setIsMenuOpen(false); }}
                        className={`mt-4 px-4 py-2 ${currentTheme.accentButton} font-semibold rounded-lg ${currentTheme.accentButtonHover} transition duration-300`}
                    >
                        Contact Us
                    </button>
                </nav>
            </div>
        </header>
    );
};

/**
 * Animated Globe SVG Component
 */
const AnimatedGlobeSVG = ({ theme }) => {
    return (
        <div className={`w-full max-w-5xl mx-auto mt-12 mb-8 ${theme}`} style={{ height: '300px' }}>
            <svg viewBox="0 0 1000 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <style>{`
                    .globe-fill { fill: #9CA3AF; transition: fill 0.5s; }
                    .dark .globe-fill { fill: #4B5563; }
                    
                    .line { 
                        stroke-width: 2; 
                        stroke-dasharray: 1000; 
                        stroke-dashoffset: 1000; 
                        animation: draw 6s ease-out infinite;
                        transition: stroke 0.5s;
                    }
                    .dark .line { stroke: #3B82F6; }
                    .light .line { stroke: #6366F1; }

                    @keyframes draw {
                        0% { stroke-dashoffset: 1000; }
                        30% { stroke-dashoffset: 0; }
                        70% { stroke-dashoffset: 0; }
                        100% { stroke-dashoffset: -1000; }
                    }
                    .dot { 
                        fill: none; 
                        animation: pulse 2s ease-in-out infinite alternate;
                        transition: stroke 0.5s;
                        stroke-width: 4;
                    }
                    .dark .dot { stroke: #3B82F6; fill: #3B82F6; }
                    .light .dot { stroke: #6366F1; fill: #6366F1; }
                    
                    @keyframes pulse {
                        from { opacity: 0.5; transform: scale(0.8); }
                        to { opacity: 1; transform: scale(1.1); }
                    }
                `}</style>

                <circle cx="500" cy="150" r="140" className="globe-fill opacity-20" />
                <path d="M500 10c0 77.3-62.7 140-140 140S220 150.3 220 73v154c0 77.3 62.7 140 140 140s140-62.7 140-140V10z" className="globe-fill opacity-20" />
                <path d="M500 10c0 77.3 62.7 140 140 140s140-62.7 140-140v154c0 77.3-62.7 140-140 140s-140-62.7-140-140V10z" className="globe-fill opacity-20" />
                
                <path d="M250 150 C 400 50, 600 50, 750 150" fill="none" className={`line`} style={{ animationDelay: '0s' }} />
                <path d="M700 100 C 500 250, 400 250, 300 150" fill="none" className={`line`} style={{ animationDelay: '2s' }} />
                <path d="M350 200 C 500 100, 650 100, 750 200" fill="none" className={`line`} style={{ animationDelay: '4s' }} />
                
                <circle cx="250" cy="150" r="8" className="dot" style={{ animationDelay: '0s' }} />
                <circle cx="750" cy="150" r="8" className="dot" style={{ animationDelay: '2s' }} />
                <circle cx="500" cy="10" r="8" className="dot" style={{ animationDelay: '4s' }} />
                
            </svg>
        </div>
    );
};

/**
 * Animated WhatsApp Chat Demo
 */
const AnimatedWhatsAppChat = ({ theme }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    const messages = [
        { text: "Hello, tripIT Bot.", delay: 0, outgoing: true },
        { text: "Dear Traveller, Welcome! I see you are registered for the TEM Georgia trip.", delay: 1500, outgoing: false },
        { text: "Please select an option: 1. Download Documents 2. Submit Feedback 3. Contact Support", delay: 3500, outgoing: false },
        { text: "1. Download Documents", delay: 5500, outgoing: true },
        { text: "Fetching your documents...", delay: 7000, outgoing: false },
        { text: "✅ Your documents (Tickets, Itinerary, Insurance) are now ready to download via the link below.", delay: 8500, outgoing: false },
    ];

    useEffect(() => {
        let timer;
        if (currentMessageIndex < messages.length) {
            const prevDelay = messages[currentMessageIndex - 1]?.delay || 0;
            const delay = messages[currentMessageIndex].delay - prevDelay;
            timer = setTimeout(() => {
                setCurrentMessageIndex(prev => prev + 1);
            }, delay);
        } else {
            timer = setTimeout(() => setCurrentMessageIndex(0), 4000);
        }
        return () => clearTimeout(timer);
    }, [currentMessageIndex, messages]);

    const chatWindowBg = currentTheme.whatsappChatBg; 

    return (
        // Increased height to h-[700px]
        <div className={`w-full max-w-md h-[700px] p-4 rounded-3xl shadow-2xl overflow-hidden relative ${chatWindowBg} border ${currentTheme.cardBorder}`}>
            
            {/* Background image layer REMOVED to use solid color from chatWindowBg. */}
            
            {/* Header: WhatsApp style */}
            <div className={`absolute top-0 left-0 w-full h-16 ${currentTheme.whatsappBg} flex items-center justify-between p-4 rounded-t-[1.5rem] shadow-md z-10`}>
                <div className="flex items-center space-x-3">
                    <Bot className="w-6 h-6 text-white" />
                    <span className="text-white font-semibold">tripIT Bot</span>
                </div>
                <div className={`w-2.5 h-2.5 ${currentTheme.whatsappDot} rounded-full animate-pulse`}></div>
            </div>
            
            {/* Messages container - h-full is now based on the new 700px parent height */}
            <div className="pt-20 pb-12 h-full overflow-y-auto space-y-3 relative z-10">
                {messages.slice(0, currentMessageIndex).map((msg, index) => {
                    const isOutgoing = msg.outgoing;
                    
                    // Set text color explicitly for each bubble type:
                    const outgoingTextColor = isOutgoing 
                        ? 'text-white' // Outgoing is dark green, always use white text
                        : 'text-gray-900'; // Incoming is white/light gray, always use dark text

                    const bubbleClasses = isOutgoing 
                        ? `${currentTheme.whatsappBubbleOutgoing} ${outgoingTextColor} ml-auto rounded-tr-none`
                        : `${currentTheme.whatsappBubbleIncoming} ${outgoingTextColor} mr-auto rounded-tl-none`;

                    return (
                        <div
                            key={index}
                            className={`
                                opacity-0 translate-y-4
                                max-w-[80%] p-3 rounded-xl shadow-md
                                animate-fadeInUp ${bubbleClasses}
                                ${isOutgoing ? 'self-end' : 'self-start'}
                            `}
                            style={{ 
                                animationDelay: `${messages[index].delay - (messages[index - 1]?.delay || 0) + 100}ms`,
                                marginLeft: isOutgoing ? 'auto' : 'unset',
                                marginRight: isOutgoing ? 'unset' : 'auto',
                            }}
                        >
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    );
                })}
            </div>
            
            {/* Typing Indicator / Input Area Placeholder */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 ${currentTheme.bgSecondary} rounded-b-[1.5rem] z-10`}>
                {currentMessageIndex < messages.length && (
                    <div className={`p-2 mx-auto max-w-xs rounded-full flex items-center justify-center ${currentTheme.cardBg} shadow-inner`}>
                          <span className={`text-sm italic ${currentTheme.textSecondary} flex items-center`}>
                            {messages[currentMessageIndex].outgoing === false && "Bot is typing..."}
                            {messages[currentMessageIndex].outgoing === true && "Awaiting traveller input..."}
                        </span>
                    </div>
                )}
                {currentMessageIndex >= messages.length && (
                    <div className={`p-2 mx-auto max-w-xs rounded-full flex items-center justify-center ${currentTheme.cardBg} shadow-inner`}>
                          <span className={`text-sm italic ${currentTheme.textSecondary}`}>
                            Restarting demo...
                        </span>
                    </div>
                )}
            </div>
            
            <style jsx="true">{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp {
                    animation-name: fadeInUp;
                    animation-duration: 0.5s;
                    animation-fill-mode: forwards;
                }
            `}</style>
        </div>
    );
};

/**
 * Workflow Step Component
 */
const WorkflowStep = ({ step, index, isVisible, theme }) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const accentColor = currentTheme.primaryColor.replace('text', 'bg');
    const accentHoverShadow = theme === 'dark' ? 'group-hover:shadow-blue-500/70' : 'group-hover:shadow-indigo-300';
    const accentRing = theme === 'dark' ? 'ring-gray-900' : 'ring-white';
    
    return (
        <div
            id={`workflow-step-${index}`} 
            className={`relative flex flex-col items-center text-center p-4 group transition-all duration-700 ease-out 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
            style={{ transitionDelay: isVisible ? `${index * 150}ms` : '0ms' }}
        >
            {/* Step Circle */}
            <div className={`w-14 h-14 rounded-full ${accentColor} flex items-center justify-center ${currentTheme.textPrimary} font-bold text-xl mb-4 shadow-xl ring-8 ${accentRing} transform transition-all duration-500 group-hover:scale-110 ${accentHoverShadow}`} style={{ zIndex: 10 }}>
                {index + 1}
            </div>
            {/* Content Card */}
            <div className={`${currentTheme.cardBg} p-6 rounded-xl shadow-lg ${currentTheme.cardBorder} border mt-2 h-full transition-all duration-300 hover:${currentTheme.bgSecondary.replace('bg-', 'bg-')}`}>
                <step.icon className={`w-6 h-6 ${currentTheme.primaryColor} mx-auto mb-3`} />
                <h4 className={`text-lg font-bold ${currentTheme.textPrimary} mb-2`}>{step.title}</h4>
                <p className={`text-sm ${currentTheme.textSecondary}`}>{step.description}</p>
            </div>
            {/* Vertical line for mobile */}
            {index < WORKFLOW_STEPS.length - 1 && (
                <div className={`absolute left-1/2 top-14 bottom-[-3rem] w-0.5 ${accentColor}/30 transform -translate-x-1/2 lg:hidden`}></div>
            )}
        </div>
    );
};

/**
 * Animated Number Counter Component
 */
const NumberCounter = ({ targetValue, duration, theme }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!inView) return;

        let startTimestamp;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * targetValue));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [targetValue, duration, inView]);

    return (
        <span ref={ref} className={`text-5xl md:text-6xl font-extrabold ${currentTheme.primaryColor}`}>
            {count}
            {targetValue === 70 && '%'}
            {targetValue === 1000 && 's'}
        </span>
    );
};

/**
 * ROI Section Component
 */
const ROISection = ({ theme }) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const accentBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';

    return (
        <section id="roi" className={`py-20 md:py-32 ${currentTheme.bgPrimary}`}>
            <div className="container mx-auto px-4 sm:px-6">
                <h3 className={`text-3xl md:text-4xl font-extrabold text-center ${currentTheme.textPrimary} mb-16`}>
                    Quantifiable Returns on Investment
                </h3>
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto text-center">
                    {/* Metric 1: Manual Workload Reduction */}
                    <div className={`p-6 md:p-8 rounded-2xl ${accentBg} ${currentTheme.cardBorder} border shadow-xl transition-all duration-300 hover:${currentTheme.accentShadow} transform hover:-translate-y-1`}>
                        <Clock className={`w-8 h-8 md:w-10 md:h-10 text-red-400 mx-auto mb-4`} />
                        <NumberCounter targetValue={70} duration={1500} theme={theme} />
                        <p className={`text-xl font-semibold ${currentTheme.textPrimary} mt-4`}>Reduction in Manual Workload</p>
                        <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>Freeing up your operations team for strategic tasks.</p>
                    </div>

                    {/* Metric 2: Query Turnaround Time */}
                    <div className={`p-6 md:p-8 rounded-2xl ${accentBg} ${currentTheme.cardBorder} border shadow-xl transition-all duration-300 hover:${currentTheme.accentShadow} transform hover:-translate-y-1`}>
                        <Zap className={`w-8 h-8 md:w-10 md:h-10 text-green-500 mx-auto mb-4`} />
                        <span className={`text-5xl md:text-6xl font-extrabold ${currentTheme.primaryColor}`}>Instant</span>
                        <p className={`text-xl font-semibold ${currentTheme.textPrimary} mt-4`}>Traveller Query Resolution</p>
                        <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>Instant chatbot replies vs. hours or days of waiting.</p>
                    </div>

                    {/* Metric 3: Scalability */}
                    <div className={`p-6 md:p-8 rounded-2xl ${accentBg} ${currentTheme.cardBorder} border shadow-xl transition-all duration-300 hover:${currentTheme.accentShadow} transform hover:-translate-y-1`}>
                        <Users className={`w-8 h-8 md:w-10 md:h-10 text-yellow-500 mx-auto mb-4`} />
                        <NumberCounter targetValue={1000} duration={1800} theme={theme} />
                        <p className={`text-xl font-semibold ${currentTheme.textPrimary} mt-4`}>Travellers Managed Cost-Efficiently</p>
                        <p className={`text-sm ${currentTheme.textSecondary} mt-2`}>Handle thousands of groups with the same ops team.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * Contact/Form Section Component (Active Form)
 */
const ContactSection = ({ theme }) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const inputClasses = `w-full p-3 rounded-lg ${currentTheme.cardBg} ${currentTheme.cardBorder} border focus:ring-2 ${currentTheme.primaryColor.replace('text', 'focus:ring')} ${currentTheme.textPrimary} placeholder:${currentTheme.textSecondary}`;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [status, setStatus] = useState(null); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        
        console.log("Submitting form data:", formData);
        
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', company: '', message: '' });
            console.log("Form submitted successfully (simulated).");
            
            setTimeout(() => setStatus(null), 5000); 
        }, 2000); 
    };

    const isSubmitting = status === 'submitting';
    const isSuccess = status === 'success';

    return (
        <section id="contact" className={`py-20 md:py-32 ${currentTheme.bgPrimary} border-t ${currentTheme.cardBorder}`}>
            <div className="container mx-auto px-4 sm:px-6">
                <h3 className={`text-3xl md:text-4xl font-extrabold text-center ${currentTheme.textPrimary} mb-4`}>
                    Ready to Scale Your Operations?
                </h3>
                <p className={`text-xl ${currentTheme.textSecondary} text-center max-w-2xl mx-auto mb-12`}>
                    Get in touch to schedule a demo and see the tripIT Bot workflow in action.
                </p>

                <div className="max-w-3xl mx-auto">
                    <div className={`p-8 md:p-12 rounded-2xl shadow-2xl ${currentTheme.bgSecondary} ${currentTheme.cardBorder} border`}>
                        
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Your Name" 
                                    className={inputClasses} 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    disabled={isSubmitting}
                                />
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Work Email" 
                                    className={inputClasses} 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    disabled={isSubmitting}
                                />
                            </div>
                            <input 
                                type="text" 
                                name="company"
                                placeholder="Company Name" 
                                className={inputClasses} 
                                value={formData.company}
                                onChange={handleChange}
                                required 
                                disabled={isSubmitting}
                            />
                            <textarea 
                                name="message"
                                placeholder="Tell us about your MICE or Leisure needs..." 
                                rows="4" 
                                className={inputClasses} 
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            ></textarea>
                            
                            <button
                                type="submit"
                                className={`w-full px-8 py-3 ${currentTheme.accentButton} text-lg font-bold rounded-full shadow-lg ${currentTheme.accentShadow} ${currentTheme.accentButtonHover} transition duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-2 ${isSubmitting || isSuccess ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting || isSuccess}
                            >
                                {isSubmitting && (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isSuccess ? 'Request Sent Successfully! 🎉' : (isSubmitting ? 'Sending Request...' : 'Request a Demo')}
                            </button>
                            
                            {/* Success Message Display */}
                            {isSuccess && (
                                <p className="text-center text-green-500 font-semibold mt-4">
                                    We've received your request and will be in touch shortly!
                                </p>
                            )}
                        </form>

                        <div className={`mt-8 pt-6 border-t ${currentTheme.cardBorder}`}>
                            <p className={`text-center text-sm font-semibold ${currentTheme.textPrimary} mb-4`}>Or contact us directly:</p>
                            <div className="flex justify-center space-x-6">
                                <a href="mailto:anup@tripit.tech" className={`flex items-center ${currentTheme.textSecondary} hover:${currentTheme.primaryColor.replace('text', 'text')} transition`}>
                                    <Mail className="w-5 h-5 mr-2" />
                                    anup@tripit.tech
                                </a>
                                <a href="tel:9833686245" className={`flex items-center ${currentTheme.textSecondary} hover:${currentTheme.primaryColor.replace('text', 'text')} transition`}>
                                    <Phone className="w-5 h-5 mr-2" />
                                    +91 98336 86245
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};


// -----------------------------------------------------------------------------
//                             MAIN APP COMPONENT
// -----------------------------------------------------------------------------

const App = () => {
    const [activeTab, setActiveTab] = useState('testimonial1');
    const [visibleSteps, setVisibleSteps] = useState({});
    const [theme, setTheme] = useState(getInitialTheme);
    const [activeSection, setActiveSection] = useState('home');

    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

    // Apply dark class on initial load if theme is dark
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newTheme;
        });
    };
    
    // VERCEL ANALYTICS INJECTION
    useEffect(() => {
        // Initializes Vercel Analytics tracking scripts once on page load
        inject();
    }, []);

    // Intersection Observer for Workflow Steps
    useEffect(() => {
        const stepElements = [];
        for (let i = 0; i < WORKFLOW_STEPS.length; i++) {
            const el = document.getElementById(`workflow-step-${i}`);
            if (el) stepElements.push(el);
        }

        if (stepElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setVisibleSteps(prev => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting,
                    }));
                });
            },
            { 
                threshold: 0.5, 
                rootMargin: '0px 0px -100px 0px'
            }
        );

        stepElements.forEach(el => observer.observe(el));
        return () => stepElements.forEach(el => observer.unobserve(el));
    }, []);

    // Intersection Observer for Active Section Highlighting
    useEffect(() => {
        const sectionIds = NAV_ITEMS.map(item => item.id);
        const allIds = [...sectionIds, 'contact']; 
        const sectionElements = allIds.map(id => document.getElementById(id));

        const observer = new IntersectionObserver(
            (entries) => {
                const intersectingSections = entries
                    .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0.1)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (intersectingSections.length > 0) {
                    setActiveSection(intersectingSections[0].target.id);
                }
            },
            {
                threshold: [0.1, 0.2, 0.5, 0.9], 
                rootMargin: '-50px 0px -50% 0px', 
            }
        );

        sectionElements.filter(Boolean).forEach(el => observer.observe(el));
        
        return () => sectionElements.filter(Boolean).forEach(el => observer.unobserve(el));
    }, []);


    return (
        <div className={`min-h-screen ${currentTheme.bgPrimary} font-sans antialiased`}>
            
            <Header theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />

            {/* Hero Section */}
            <section id="home" className={`pt-32 pb-20 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-indigo-50 to-white'} md:pt-48 md:pb-32`}>
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <p className={`text-sm font-semibold uppercase tracking-widest ${currentTheme.primaryColor} mb-4 animate-fadeIn delay-100`}>
                        Automate MICE & Leisure Travel Operations
                    </p>
                    <h2 className={`text-5xl md:text-7xl font-extrabold ${currentTheme.textPrimary} leading-tight mb-6 animate-fadeIn delay-300`}>
                        Grow your <span className={currentTheme.primaryColor}>Operations</span>.
                        <br className="hidden sm:inline" /> seamlessly without Hiring ! 
                    </h2>
                    <p className={`text-xl ${currentTheme.textSecondary} max-w-3xl mx-auto mb-10 animate-fadeIn delay-500`}>
                        tripIT Bot is the WhatsApp-first Chatbot that automates traveller communication, document distribution, and data collection in one unified, cost-efficient platform.
                    </p>
                    <button
                        onClick={() => ScrollToSection('problem')}
                        className={`px-8 py-3 md:px-10 md:py-4 ${currentTheme.accentButton} text-lg font-bold rounded-full shadow-xl ${currentTheme.accentShadow} ${currentTheme.accentButtonHover} transition duration-300 transform hover:scale-105 active:scale-95 animate-bounceIn delay-700 flex items-center justify-center mx-auto`}
                    >
                        Start Your Trip <ArrowRight className="inline-block w-5 h-5 ml-2" />
                    </button>
                    <AnimatedGlobeSVG theme={theme} />
                </div>
            </section>

            {/* Problem Section */}
            <section id="problem" className={`py-20 md:py-32 ${currentTheme.bgPrimary}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <h3 className={`text-3xl md:text-4xl font-extrabold text-center ${currentTheme.textPrimary} mb-16`}>
                        Are Manual Processes Holding Your Business Back?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {PAIN_POINTS.map((point, index) => (
                            <div
                                key={index}
                                className={`p-6 md:p-8 rounded-2xl ${currentTheme.cardBorder} border ${currentTheme.cardBg} text-center transition-all duration-500 hover:shadow-lg hover:${currentTheme.primaryColor.replace('text', 'border')} transform hover:-translate-y-1 cursor-pointer`}
                            >
                                <div className={`p-4 mx-auto w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6 ${point.color}`}>
                                    <point.icon className="w-7 h-7" />
                                </div>
                                <h4 className={`text-xl font-bold ${currentTheme.textPrimary} mb-3`}>{point.title}</h4>
                                <p className={`text-sm ${currentTheme.textSecondary}`}>{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution & Animated Demo Section */}
            <section id="solution" className={`py-20 md:py-32 ${currentTheme.bgSecondary} border-t border-b ${currentTheme.cardBorder}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        
                        {/* Text Content */}
                        <div className="lg:w-1/2 lg:pr-12">
                            <span className={`inline-block px-3 py-1 text-sm font-semibold uppercase tracking-wider ${currentTheme.primaryColor} ${currentTheme.accent.replace('bg', 'bg').replace('600', '600/20')} rounded-full mb-4`}>
                                The Game Changer
                            </span>
                            <h3 className={`text-4xl md:text-5xl font-extrabold ${currentTheme.textPrimary} mb-6`}>
                                Meet tripIT Bot: Your <span className={currentTheme.primaryColor}>WhatsApp-First</span> Operations Assistant.
                            </h3>
                            <ul className={`space-y-4 text-lg ${currentTheme.textSecondary}`}>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">&#10003;</span>
                                    Simplifies traveller data collection, document distribution, and feedback collection in one unified platform.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">&#10003;</span>
                                    Reduces dependency on manual ops, ensuring scalability with quality improvement.
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-3 mt-1">&#10003;</span>
                                    Streamlines guest interaction through a WhatsApp-first chatbot.
                                </li>
                            </ul >
                        </div >

                        {/* Animated Chat Demo */}
                        <div className="lg:w-1/2 flex justify-center w-full mt-10 lg:mt-0">
                            <AnimatedWhatsAppChat theme={theme} />
                        </div>
                    </div >
                </div >
            </section >

            {/* Workflow Section (Now before ROI) */}
            <section id="workflow" className={`py-20 md:py-32 ${currentTheme.bgSecondary} border-t border-b ${currentTheme.cardBorder}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <h3 className={`text-3xl md:text-4xl font-extrabold text-center ${currentTheme.textPrimary} mb-16`}>
                        The 5-Step Automated Workflow
                    </h3>
                    
                    <div className="relative max-w-6xl mx-auto">
                        {/* The Connecting Line (Purely decorative background line for desktop) */}
                        <div className={`hidden lg:block absolute top-1/2 left-0 right-0 h-1 ${currentTheme.primaryColor.replace('text', 'bg')}/30 transform -translate-y-1/2`}>
                        </div>
                        
                        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 lg:gap-6">
                            {WORKFLOW_STEPS.map((step, index) => (
                                <WorkflowStep 
                                    key={index} 
                                    step={step} 
                                    index={index} 
                                    isVisible={visibleSteps[`workflow-step-${index}`]} 
                                    theme={theme}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ROI & Metrics Section (Now after Workflow) */}
            <ROISection theme={theme} />

            
            {/* Testimonials Section - FIXED BUTTON VISIBILITY AND ADDED ANIMATION LOGIC */}
            <section id="testimonials" className={`py-20 md:py-32 ${currentTheme.bgPrimary}`}>
                <div className="container mx-auto px-4 sm:px-6">
                    <h3 className={`text-3xl md:text-4xl font-extrabold text-center ${currentTheme.textPrimary} mb-12`}>
                        What Our Customers Say
                    </h3>
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-center mb-8 space-x-2">
                            {/* FIX: Using explicit background classes for visibility */}
                            <button onClick={() => setActiveTab('testimonial1')} className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeTab === 'testimonial1' ? `${currentTheme.primaryColor.replace('text', 'bg')} scale-125` : 'bg-gray-400 dark:bg-gray-600'}`}></button>
                            <button onClick={() => setActiveTab('testimonial2')} className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeTab === 'testimonial2' ? `${currentTheme.primaryColor.replace('text', 'bg')} scale-125` : 'bg-gray-400 dark:bg-gray-600'}`}></button>
                            <button onClick={() => setActiveTab('testimonial3')} className={`w-3 h-3 rounded-full transition-colors duration-300 ${activeTab === 'testimonial3' ? `${currentTheme.primaryColor.replace('text', 'bg')} scale-125` : 'bg-gray-400 dark:bg-gray-600'}`}></button>
                        </div>

                        <div className={`p-8 md:p-10 rounded-3xl shadow-2xl min-h-[250px] flex items-center transition-opacity duration-500 ${currentTheme.primaryColor.replace('text', 'bg')}/10 border ${currentTheme.primaryColor.replace('text', 'border')}/30`}>
                            {/* ENHANCEMENT: Using 'key' to trigger transition on content change */}
                            {activeTab === 'testimonial1' && (
                                <div key="t1" className="opacity-0 animate-fadeInUp-quick w-full">
                                    <p className={`text-xl md:text-2xl italic ${currentTheme.textPrimary} mb-6`}>
                                        “JOY transformed our group trip communications. No more late-night calls or missed emails — our travellers had everything at their fingertips.”
                                    </p>
                                    <p className={`text-lg font-semibold ${currentTheme.primaryColor}`}>— Head of MICE, Leading Travel Agency</p>
                                </div>
                            )}
                            {activeTab === 'testimonial2' && (
                                <div key="t2" className="opacity-0 animate-fadeInUp-quick w-full">
                                    <p className={`text-xl md:text-2xl italic ${currentTheme.textPrimary} mb-6`}>
                                        “The quick and standardized responses from JOY Chatbot for our 160+ traveller group to Hong Kong was a breeze. All travel documents being readily downloadable was a game changer.”
                                    </p>
                                    <p className={`text-lg font-semibold ${currentTheme.primaryColor}`}>— MICE Travel Manager, Branch Banking, Leading Commercial Bank</p>
                                </div>
                            )}
                            {activeTab === 'testimonial3' && (
                                <div key="t3" className="opacity-0 animate-fadeInUp-quick w-full">
                                    <p className={`text-xl md:text-2xl italic ${currentTheme.textPrimary} mb-6`}>
                                        “Feedback collection was effortless and gave us structured insights we never had before.”
                                    </p>
                                    <p className={`text-lg font-semibold ${currentTheme.primaryColor}`}>— Operations Manager, Leisure Tour Company</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* New Contact Section (With Active Form) */}
            <ContactSection theme={theme} />
            
            {/* CLEANED FOOTER */}
            <footer className={`py-12 ${currentTheme.bgSecondary} border-t ${currentTheme.cardBorder}`}>
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    
                    {/* Logo (Refreshes page on click) */}
                    <button onClick={() => window.location.reload()} className="inline-block mb-6 focus:outline-none">
                        <h1 className={`text-3xl font-extrabold ${currentTheme.textPrimary} tracking-tight flex items-center justify-center`}>
                            {/* LOGO IMAGE IMPLEMENTATION - Uses l1 (tripit_logo.png) */}
                            <img 
                                src={l1} 
                                alt="TRIPIT Logo" 
                                className={`h-7 w-auto mr-2 md:h-8`} 
                                style={{ filter: theme === 'dark' ? 'brightness(1.2)' : 'none' }}
                            />
                            <span className={`text-3xl font-extrabold ${currentTheme.textPrimary}`}>TRIPIT</span>
                        </h1>
                    </button>

                    {/* Policy and Essential Links */}
                    <div className="flex justify-center space-x-6 text-sm mb-4">
                        <a href="#" className={`hover:${currentTheme.primaryColor.replace('text', 'text')} transition ${currentTheme.textSecondary}`}>Privacy Policy</a>
                        <a href="#" className={`hover:${currentTheme.primaryColor.replace('text', 'text')} transition ${currentTheme.textSecondary}`}>Terms of Service</a>
                        <a href="mailto:anup@tripit.tech" className={`hover:${currentTheme.primaryColor.replace('text', 'text')} transition ${currentTheme.textSecondary}`}>Contact</a>
                    </div >

                    {/* Copyright and Made With Love */}
                    <p className={`text-sm ${currentTheme.textSecondary} mb-2`}>
                        &copy; {new Date().getFullYear()} **tripIT Solutions**. All rights reserved.
                    </p>
                    <p className={`text-xs flex items-center justify-center ${currentTheme.textSecondary}`}>
                        Made with <Heart className="w-3 h-3 mx-1 text-red-500" /> Mumbai, India.
                    </p>
                </div >
            </footer >
            
            {/* NEW CSS KEYFRAME FOR QUICKER TESTIMONIAL FADE */}
            <style jsx="true">{`
                @keyframes fadeInUp-quick {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp-quick {
                    animation-name: fadeInUp-quick;
                    animation-duration: 0.3s;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                }
            `}</style>

        </div >
    );
};

export default App;