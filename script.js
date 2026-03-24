document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.section');
  const isInView = (elem) => {
    const rect = elem.getBoundingClientRect();
    return rect.top < window.innerHeight - 80;
  };

  const revealSections = () => {
    reveals.forEach((sec) => {
      if (isInView(sec)) sec.classList.add('visible');
    });
  };

  window.addEventListener('scroll', revealSections);
  revealSections();

  // Button micro interactions
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((btn) => {
    btn.addEventListener('mouseover', () => {
      btn.style.transform = 'translateY(-3px) scale(1.02)';
    });
    btn.addEventListener('mouseout', () => {
      btn.style.transform = '';
    });
  });

  // Animate skill bars once in view
  const skills = document.querySelectorAll('.progress');
  const animateSkills = () => {
    skills.forEach((skill) => {
      if (skill.dataset.animated) return;
      if (isInView(skill)) {
        const value = parseInt(skill.dataset.value, 10) || 0;
        skill.querySelector('span').style.width = `${value}%`;
        skill.dataset.animated = 'true';
      }
    });
  };

  // Counter animation
  const stats = document.querySelectorAll('.stat-value');
  const animateStats = () => {
    stats.forEach((stat) => {
      if (stat.dataset.animated) return;
      if (isInView(stat.parentElement)) {
        const target = parseInt(stat.dataset.target, 10) || 0;
        let count = 0;
        const step = Math.max(1, Math.round(target / 50));
        const interval = setInterval(() => {
          count += step;
          stat.textContent = count >= target ? target : count;
          if (count >= target) {
            clearInterval(interval);
            stat.textContent = `${target}`;
          }
        }, 25);
        stat.dataset.animated = 'true';
      }
    });
  };

  window.addEventListener('scroll', () => {
    animateSkills();
    animateStats();
  });
  animateSkills();
  animateStats();

  // Dark mode toggle
  const toggleBtn = document.getElementById('toggleMode');
  const root = document.documentElement;
  const getMode = () => localStorage.getItem('theme') || 'light';

  const applyMode = (mode) => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '🌙';
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.textContent = '☀️';
    }
    localStorage.setItem('theme', mode);
  };

  toggleBtn.addEventListener('click', () => {
    applyMode(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
  });

  applyMode(getMode());
});
