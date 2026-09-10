// Idea transformation engine - deterministic, no API required
class IdeaTransformer {
  constructor(idea) {
    this.idea = idea.trim();
    this.hash = this.simpleHash(this.idea);
  }

  // Simple hash for deterministic output
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // Pick from array using hash
  pick(array) {
    return array[this.hash % array.length];
  }

  // Generate problem statement
  getProblem() {
    const problems = [
      "People struggle with {target} because of inefficiencies and lack of proper tools.",
      "Today's {target} face barriers that prevent them from {action}.",
      "{target} waste time and resources on manual processes that should be automated.",
      "There's a gap in the market for solutions that truly address {target}'s core needs.",
      "{target} often feel unsupported by existing solutions that don't understand their challenges."
    ];

    const actions = [
      "reaching their goals",
      "scaling their efforts",
      "staying organized",
      "connecting effectively",
      "managing their time"
    ];

    const template = this.pick(problems);
    const target = this.extractTarget();
    const action = this.pick(actions);

    return template
      .replace("{target}", target)
      .replace("{action}", action);
  }

  // Extract target audience from idea
  extractTarget() {
    const keywords = this.idea.toLowerCase();
    
    if (keywords.includes("freelancer")) return "freelancers";
    if (keywords.includes("creator")) return "creators";
    if (keywords.includes("small business") || keywords.includes("entrepreneur")) return "entrepreneurs";
    if (keywords.includes("remote")) return "remote workers";
    if (keywords.includes("designer") || keywords.includes("developer")) return "creative professionals";
    if (keywords.includes("student")) return "students";
    if (keywords.includes("team")) return "teams";
    if (keywords.includes("user")) return "users";
    
    return "people in this space";
  }

  // Generate audience description
  getAudience() {
    const audiences = [
      "{target} who are looking to {verb} their workflow.",
      "Ambitious {target} who want to {verb} and stay ahead.",
      "{target} frustrated with existing solutions and seeking something better.",
      "Forward-thinking {target} ready to embrace new ways of working.",
      "{target} who value efficiency and want to focus on what matters most."
    ];

    const verbs = [
      "streamline",
      "optimize",
      "revolutionize",
      "transform",
      "accelerate"
    ];

    const template = this.pick(audiences);
    const target = this.extractTarget();
    const verb = this.pick(verbs);

    return template
      .replace("{target}", target)
      .replace("{verb}", verb);
  }

  // Generate solution
  getSolution() {
    const solutions = [
      "A unified platform that brings together all the tools {target} need, eliminating context switching and reducing friction.",
      "{action} solution that empowers {target} to work smarter, not harder, with intelligent automation and intuitive design.",
      "A community-driven ecosystem where {target} can collaborate, share insights, and grow together.",
      "An intelligent system that learns from user behavior and adapts to provide personalized experiences for {target}.",
      "A comprehensive toolkit that combines simplicity with power, making complex tasks feel effortless for {target}."
    ];

    const actions = [
      "An all-in-one",
      "A smart",
      "An elegant",
      "A powerful",
      "A seamless"
    ];

    const template = this.pick(solutions);
    const target = this.extractTarget();
    const action = this.pick(actions);

    return template
      .replace("{target}", target)
      .replace("{action}", action);
  }

  // Generate first key feature
  getFeature() {
    const features = [
      "Smart Dashboard: A unified view that gives {target} instant visibility into what matters most, with real-time insights and actionable recommendations.",
      "Intelligent Automation: Workflows that learn from user patterns and automatically handle repetitive tasks, freeing up time for strategic work.",
      "Seamless Integration: One-click connections with tools {target} already use, creating a cohesive ecosystem without vendor lock-in.",
      "Collaborative Hub: Real-time collaboration features that let teams work together effortlessly, regardless of location or timezone.",
      "Personalized Analytics: Deep insights tailored to each user's goals, showing progress and suggesting optimizations they might have missed.",
      "Mobile-First Experience: A powerful mobile app that puts full functionality in {target}'s pocket, enabling work from anywhere."
    ];

    const template = this.pick(features);
    const target = this.extractTarget();

    return template.replace("{target}", target);
  }

  // Generate tagline
  getTagline() {
    const taglines = [
      "Work smarter, not harder.",
      "The {action} that transforms how {target} work.",
      "Built for {target} who refuse to settle.",
      "Where simplicity meets power.",
      "The {target} platform for the modern era.",
      "Your competitive edge in one place.",
      "Less busy. More impact.",
      "The way {target} were meant to work.",
      "Elegantly powerful, remarkably simple.",
      "From overwhelmed to organized."
    ];

    const actions = [
      "platform",
      "tool",
      "system",
      "solution",
      "app"
    ];

    const template = this.pick(taglines);
    const target = this.extractTarget();
    const action = this.pick(actions);

    return template
      .replace("{action}", action)
      .replace("{target}", target);
  }

  // Get complete concept
  getConcept() {
    return {
      idea: this.idea,
      problem: this.getProblem(),
      audience: this.getAudience(),
      solution: this.getSolution(),
      feature: this.getFeature(),
      tagline: this.getTagline()
    };
  }
}

// UI Controller
class App {
  constructor() {
    this.ideaInput = document.getElementById("ideaInput");
    this.buildBtn = document.getElementById("buildBtn");
    this.backBtn = document.getElementById("backBtn");
    this.landing = document.getElementById("landing");
    this.results = document.getElementById("results");
    this.exampleBtns = document.querySelectorAll(".example-btn");

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.buildBtn.addEventListener("click", () => this.handleBuild());
    this.backBtn.addEventListener("click", () => this.handleBack());
    this.ideaInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleBuild();
    });

    this.exampleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const idea = btn.dataset.idea;
        this.ideaInput.value = idea;
        this.handleBuild();
      });
    });
  }

  handleBuild() {
    const idea = this.ideaInput.value.trim();

    if (!idea) {
      this.ideaInput.focus();
      this.ideaInput.style.borderColor = "var(--color-accent)";
      setTimeout(() => {
        this.ideaInput.style.borderColor = "";
      }, 300);
      return;
    }

    this.transformIdea(idea);
  }

  handleBack() {
    this.landing.style.display = "block";
    this.results.style.display = "none";
    this.ideaInput.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  transformIdea(idea) {
    const transformer = new IdeaTransformer(idea);
    const concept = transformer.getConcept();

    // Populate results
    document.getElementById("ideaResult").textContent = concept.idea;
    document.getElementById("problemResult").textContent = concept.problem;
    document.getElementById("audienceResult").textContent = concept.audience;
    document.getElementById("solutionResult").textContent = concept.solution;
    document.getElementById("featureResult").textContent = concept.feature;
    document.getElementById("taglineResult").textContent = concept.tagline;

    // Show results with animation
    this.landing.style.display = "none";
    this.results.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new App();
});
