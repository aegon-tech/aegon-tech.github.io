/* ==========================================================================
   MANVENDRA PRATAP SINGH — PORTFOLIO CLIENT LOGIC & REAL CONTACT HANDLER
   High-Performance, Zero-Lag, Real FormSubmit Delivery
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure permanent Day Mode (Light Theme)
  document.documentElement.removeAttribute('data-theme');
  try {
    localStorage.removeItem('theme');
  } catch (e) {
    // Ignore storage restrictions
  }

  initSpotlight();
  initStickyHeader();
  initMobileMenu();
  initProjectFilters();
  initProjectModals();
  initInteractiveTerminal();
  initCopyEmail();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. High-Performance GPU-Accelerated Spotlight (Desktop Only)
   -------------------------------------------------------------------------- */
function initSpotlight() {
  const spotlight = document.querySelector('.spotlight');
  if (!spotlight || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        spotlight.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Sticky Header Elevation on Scroll (Passive Listener)
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      if (currentScrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = currentScrollY;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const backdrop = document.getElementById('mobileMenuBackdrop');

  if (!toggleBtn || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove('mobile-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.classList.remove('is-active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('nav-locked');
  };

  const openMenu = () => {
    navLinks.classList.add('mobile-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.classList.add('is-active');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('nav-locked');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('mobile-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && navLinks.classList.contains('mobile-open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Project Filtering Logic
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'grid';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Modal Deep-Dives
   -------------------------------------------------------------------------- */
const PROJECT_DETAILS = {
  examshield: {
    title: "ExamShield AI — In-Memory Forensic PDF Security Suite",
    category: "Forensic Security • AI Workflows",
    image: "assets/images/examshield_preview.jpg",
    liveDemo: "https://examshield-ai.streamlit.app",
    github: "https://github.com/aegon-tech/ExamShield-AI",
    description: "An advanced forensic examination protection platform developed to eliminate test paper leaks and guarantee accountability across decentralized examination centers. It uses dynamic steganographic watermarking embedded into in-memory PDF buffers without ever touching persistent disk storage.",
    architecture: [
      "Zero-Disk Persistence Buffer: Generates and serializes encrypted examination question papers completely in RAM via PyMuPDF (fitz) memory streams.",
      "Steganographic Leak Tracing: Microscopic, high-density invisible watermarks carry unique candidate and examination center cryptographically signed tokens.",
      "Google Gemini Integration: Dynamic multi-variant question paper generation and question permutation to prevent collusion.",
      "Batch Processing Engine: High-throughput CSV mapping pipeline capable of generating thousands of center-individualized papers in minutes."
    ],
    techStack: ["Python", "Streamlit", "Google Gemini API", "PyMuPDF", "OpenCV", "In-Memory Cryptography"]
  },
  agentflow: {
    title: "AgentFlow Studio — Visual Multi-Agent DAG Orchestration Engine",
    category: "AI Agent Workflows • Full-Stack Systems",
    image: "assets/images/agentflow_preview.jpg",
    github: "https://github.com/aegon-tech/AgentFlow_Studio",
    description: "A production-grade visual workflow platform for orchestrating interconnected multi-agent reasoning chains. Built with Next.js and FastAPI, it incorporates parallel topological layered DAG execution and prompt-injection XML isolation.",
    architecture: [
      "Topological DAG Execution: Deconstructs complex node graphs into parallel layered execution waves, ensuring zero race conditions.",
      "Google Gemini 1.5 Integration: Real-time dynamic reasoning nodes with strict Pydantic structured output validation.",
      "Prompt-Injection Defense: Multi-layered XML boundary sanitization preventing prompt bleed and adversarial payload propagation.",
      "Async Persistence Engine: Non-blocking asynchronous JSON storage for continuous saving and restoration of agent workflows."
    ],
    techStack: ["Next.js", "React", "TypeScript", "FastAPI", "Python", "Google Gemini SDK", "Tailwind CSS"]
  },
  attrivance: {
    title: "Attrivance — Enterprise Customer Retention Intelligence",
    category: "Machine Learning • Decision Support",
    image: "assets/images/attrivance_preview.jpg",
    github: "https://github.com/aegon-tech/Attrivance",
    description: "An enterprise decision-support application for proactive customer churn identification, risk triage, and retention workflow management. Operationalizes machine learning models with explainable AI to surface individual churn drivers.",
    architecture: [
      "Portfolio Decile Distribution: Real-time risk distribution across deciles with automated high-risk cohort flagging.",
      "TreeSHAP Explainability: Interactive waterfall feature attribution breakdown explaining specific behavioral drivers behind churn scores.",
      "Dual Operating Policy Thresholds: Instant switching between 0.35 High Recall (catch ~88% of churn) and 0.50 Precision Focus without mutating underlying probabilities.",
      "Account-Level Triage Queue: Real-time sorting, filtering, and bulk CSV batch ingestion for frontline account managers."
    ],
    techStack: ["Python", "Machine Learning", "TreeSHAP", "Scikit-Learn", "Streamlit", "Pandas", "NumPy"]
  },
  zenithlead: {
    title: "ZenithLead AI — Intelligent B2B Lead Generation & Outreach Suite",
    category: "AI Automation • Full-Stack",
    image: "assets/images/zenithlead_preview.jpg",
    github: "https://github.com/aegon-tech/Zenithlead-AI",
    description: "A comprehensive B2B lead discovery and enrichment platform. Integrates intelligent web discovery, multi-source scraping, Google Gemini AI enrichment, and automated personalized outreach orchestration.",
    architecture: [
      "AI-Powered Lead Scoring: Ranks leads based on technographic fit, recent hiring signals, and company growth indicators.",
      "Gemini Copywriting Engine: Generates deeply personalized email drafts referencing specific company news and technological needs.",
      "Authoritative Full-Stack Architecture: Unified Express/TypeScript server running Vite React frontend with resilient state persistence.",
      "Hardened Multi-Tenant Security: BYOK (Bring Your Own Key) architecture with encrypted credential storage."
    ],
    techStack: ["React", "Vite", "TypeScript", "Node.js", "Express", "Google Gemini API", "SerpAPI", "Resend"]
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalDetails');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal || !modalContent) return;

  document.querySelectorAll('[data-open-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = trigger.getAttribute('data-open-project');
      const data = PROJECT_DETAILS[projKey];
      if (!data) return;

      modalContent.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="modal-image-preview" loading="lazy">
        <span class="section-pill">${data.category}</span>
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-desc">${data.description}</p>
        
        <h3 class="modal-section-title">Architectural Highlights & Engineering Innovations</h3>
        <ul class="modal-features-list">
          ${data.architecture.map(item => `<li><strong>${item.split(':')[0]}:</strong>${item.split(':')[1] || ''}</li>`).join('')}
        </ul>

        <h3 class="modal-section-title">Technologies Utilized</h3>
        <div class="tech-stack-wrap">
          ${data.techStack.map(t => `<span class="tech-tag featured">${t}</span>`).join('')}
        </div>

        <div class="modal-actions">
          ${data.liveDemo ? `<a href="${data.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">🚀 Launch Live Demo</a>` : ''}
          ${data.github ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">📂 View GitHub Repository</a>` : ''}
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Live Terminal Console
   -------------------------------------------------------------------------- */
function initInteractiveTerminal() {
  const terminalBody = document.querySelector('.terminal-body');
  const termInput = document.getElementById('termInput');
  const actionPills = document.querySelectorAll('.term-action-pill');

  if (!terminalBody || !termInput) return;

  const COMMANDS = {
    help: "Available commands:\n  • whoami    : About Manvendra Pratap Singh\n  • skills    : Technical competencies & frameworks\n  • projects  : List key enterprise projects\n  • services  : View what I can build for you\n  • examshield: Inspect ExamShield AI forensic suite\n  • agentflow : Inspect AgentFlow Studio DAG engine\n  • contact   : Get email, GitHub & LinkedIn links\n  • resume    : Download verified Resume (PDF)\n  • clear     : Clear terminal history",
    whoami: "Manvendra Pratap Singh\nRole: Python Developer & AI Systems Engineer\nLocation: Gorakhpur, UP, India\nSpecialization: In-memory document security, Google Gemini workflows, and predictive analytics.\nEducation: B.C.A Data Analytics @ Amity University Online",
    skills: "Languages: Python, TypeScript, SQL, R, Shell Scripting\nFrameworks: FastAPI, Streamlit, Next.js, PyMuPDF, Pandas, OpenCV\nAI & Agents: Google Gemini SDK, Topological DAGs, Prompt Isolation\nAnalytics: TreeSHAP, Churn Modeling, Forensic Steganography",
    projects: "1. ExamShield AI  [Forensic PDF Security Suite | Streamlit + Gemini + PyMuPDF]\n2. AgentFlow Studio [Visual Multi-Agent DAG Engine | Next.js + FastAPI]\n3. Attrivance       [Customer Retention Intelligence | ML + TreeSHAP]\n4. ZenithLead AI    [Intelligent B2B Lead Generation | TypeScript + Gemini]",
    services: "What I Can Build For You:\n• Business Websites & Landing Pages (modern, fast, high-converting)\n• Portfolio Websites (distinctive, editorial, interactive showcases)\n• Business Automation Tools (Python scripts, batch processors, workflows)\n• Lead Generation Tools (prospect discovery, scraping & qualification)\n• Custom Web Applications (dashboards, trackers, and business tools)\n\nReady to start? Email: manvendrapratapsingh7781@gmail.com or type 'contact'",
    examshield: "ExamShield AI\n• Status: Production / Live\n• Demo: https://examshield-ai.streamlit.app\n• GitHub: https://github.com/aegon-tech/ExamShield-AI\n• Innovation: Zero disk persistence PDF watermarking & AI variant questions",
    agentflow: "AgentFlow Studio\n• Status: Active Development\n• GitHub: https://github.com/aegon-tech/AgentFlow_Studio\n• Innovation: Parallel layered DAG execution with Google Gemini structured reasoning",
    attrivance: "Attrivance\n• Status: Active\n• GitHub: https://github.com/aegon-tech/Attrivance\n• Innovation: TreeSHAP feature attribution with dual policy threshold simulation",
    zenithlead: "ZenithLead AI\n• Status: Active\n• GitHub: https://github.com/aegon-tech/Zenithlead-AI\n• Innovation: AI lead qualification & automated personalized email outreach",
    contact: "Email: manvendrapratapsingh7781@gmail.com\nGitHub: https://github.com/aegon-tech\nLinkedIn: https://linkedin.com/in/manvendra-python-dev",
    resume: "Initiating download for Manvendra_Pratap_Singh_Resume.pdf..."
  };

  function executeCmd(cmdText) {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      terminalBody.innerHTML = `
        <div class="term-line">
          <span class="term-prompt">manvendra@portfolio:~$</span>
          <span class="term-output"> Terminal cleared. Type 'help' for options.</span>
        </div>
      `;
      return;
    }

    if (trimmed === 'resume') {
      window.open('assets/Manvendra_Pratap_Singh_Resume.pdf', '_blank');
    }

    const output = COMMANDS[trimmed] || `Command not found: '${trimmed}'. Type 'help' to see valid commands.`;

    const cmdRow = document.createElement('div');
    cmdRow.className = 'term-line';
    cmdRow.innerHTML = `<span class="term-prompt">manvendra@portfolio:~$</span> <span class="term-cmd">${escapeHtml(cmdText)}</span>\n<div class="term-output">${escapeHtml(output)}</div>`;
    terminalBody.appendChild(cmdRow);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCmd(termInput.value);
      termInput.value = '';
    }
  });

  actionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.getAttribute('data-cmd');
      executeCmd(cmd);
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* --------------------------------------------------------------------------
   8. Copy Email to Clipboard
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.querySelector('.copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = "manvendrapratapsingh7781@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      showToast("Email copied to clipboard! 📋");
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = "Copy"; }, 2500);
    }).catch(() => {
      showToast("Email: " + email);
    });
  });
}

/* --------------------------------------------------------------------------
   9. Real Contact Delivery (FormSubmit.co API + Mailto Fallback)
   Guaranteed Message Delivery to manvendrapratapsingh7781@gmail.com
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const statusBanner = document.getElementById('formStatus');
  const directMailtoBtn = document.getElementById('directMailtoBtn');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  // Dynamically update direct mailto link as the user types
  const updateMailto = () => {
    if (!directMailtoBtn) return;
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const msg = messageInput ? messageInput.value.trim() : '';

    const subject = encodeURIComponent(name ? `Portfolio Inquiry from ${name}` : 'Portfolio Inquiry for Manvendra');
    const body = encodeURIComponent(`${msg}\n\nFrom: ${name} (${email})`);
    directMailtoBtn.href = `mailto:manvendrapratapsingh7781@gmail.com?subject=${subject}&body=${body}`;
  };

  if (nameInput) nameInput.addEventListener('input', updateMailto);
  if (emailInput) emailInput.addEventListener('input', updateMailto);
  if (messageInput) messageInput.addEventListener('input', updateMailto);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all required fields.", "error");
      return;
    }

    // Set loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending Message...</span>`;
    showStatus("Delivering message to Manvendra...", "loading");

    try {
      // POST to FormSubmit AJAX endpoint
      const response = await fetch("https://formsubmit.co/ajax/manvendrapratapsingh7781@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Message from ${name}`,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        showStatus("✅ Message sent successfully! I have received your message and will reply to your email shortly.", "success");
        showToast("Message delivered to Manvendra! ✨");
        form.reset();
        updateMailto();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      console.warn("AJAX form submission error, opening mailto fallback:", err);
      showStatus("Opening your email client to send directly...", "loading");
      
      // Fallback: Trigger mailto client immediately
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
      window.location.href = `mailto:manvendrapratapsingh7781@gmail.com?subject=${subject}&body=${body}`;

      showStatus("✉️ If your email client didn't open automatically, please click 'Send Directly via Your Email App' below.", "success");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showStatus(msg, type) {
    if (!statusBanner) return;
    statusBanner.className = `form-status-banner ${type}`;
    statusBanner.textContent = msg;
    statusBanner.style.display = 'block';
  }
}

/* --------------------------------------------------------------------------
   10. Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
