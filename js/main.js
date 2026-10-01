(() => {
  const progress = document.getElementById('reading-progress');
  const backtop = document.getElementById('backtop');
  const search = document.getElementById('topic-search');
  const results = document.getElementById('search-results');
  const navLinks = [...document.querySelectorAll('.navin a[href^="#"]')];
  const sections = [...document.querySelectorAll('section[id]')];
  const headings = [...document.querySelectorAll('section h2, section h3, section h4')];

  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = `${heading.closest('section').id}-topic-${index + 1}`;
  });

  const updateScrollUI = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    backtop.classList.toggle('show', scrollY > 650);
    let current = sections[0]?.id;
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 120) current = section.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };
  addEventListener('scroll', updateScrollUI, {passive:true});
  addEventListener('resize', updateScrollUI);
  updateScrollUI();
  backtop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

  const closeResults = () => { results.classList.remove('show'); results.replaceChildren(); };
  const runSearch = () => {
    const query = search.value.trim().toLocaleLowerCase('th');
    results.replaceChildren();
    if (query.length < 2) return closeResults();
    const matches = headings.filter(h => h.textContent.toLocaleLowerCase('th').includes(query)).slice(0, 14);
    if (!matches.length) {
      const empty = document.createElement('a'); empty.textContent = 'ไม่พบหัวข้อ ลองใช้คำที่สั้นลง'; results.append(empty);
    } else {
      matches.forEach(heading => {
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        const label = document.createElement('small');
        label.textContent = heading.closest('section').querySelector('h2')?.textContent || 'หัวข้อ';
        link.append(label, document.createTextNode(heading.textContent));
        link.addEventListener('click', () => { closeResults(); search.value = ''; });
        results.append(link);
      });
    }
    results.classList.add('show');
  };
  search?.addEventListener('input', runSearch);
  search?.addEventListener('keydown', event => { if (event.key === 'Escape') { search.value = ''; closeResults(); search.blur(); } });
  document.addEventListener('click', event => { if (!results.contains(event.target) && event.target !== search) closeResults(); });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && document.activeElement !== search) { event.preventDefault(); search?.focus(); }
  });

  let openedForPrint = [];
  addEventListener('beforeprint', () => {
    openedForPrint = [...document.querySelectorAll('details:not([open])')];
    openedForPrint.forEach(item => item.open = true);
  });
  addEventListener('afterprint', () => openedForPrint.forEach(item => item.open = false));
})();
