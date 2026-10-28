(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownTrigger = document.querySelector(".dropdown-trigger");

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    primaryNav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  dropdownTrigger?.addEventListener("click", () => {
    const open = dropdownTrigger.getAttribute("aria-expanded") !== "true";
    dropdownTrigger.setAttribute("aria-expanded", String(open));
    dropdown?.classList.toggle("is-open", open);
  });

  document.addEventListener("click", (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      dropdown.classList.remove("is-open");
      dropdownTrigger?.setAttribute("aria-expanded", "false");
    }
    if (primaryNav?.classList.contains("is-open") &&
        !primaryNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });

  document.querySelectorAll('#primary-nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
      dropdown?.classList.remove("is-open");
      dropdownTrigger?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      dropdown?.classList.remove("is-open");
      dropdownTrigger?.setAttribute("aria-expanded", "false");
    }
  });

  // Filtros de projetos com estado acessível e atualização do contador.
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll(".project-card")];
  const resultsCount = document.querySelector(".results-count");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      let visible = 0;
      projectCards.forEach(card => {
        const show = filter === "todos" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visible++;
      });
      if (resultsCount) resultsCount.textContent = `Exibindo ${visible} ${visible === 1 ? "projeto" : "projetos"}`;
    });
  });

  // Favoritar projetos (estado local da sessão).
  document.querySelectorAll(".save-button").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const saved = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = saved ? "♥" : "♡";
      const project = button.closest(".project-card")?.querySelector("h3")?.textContent || "Projeto";
      showToast(saved ? `${project} foi salvo na sua lista.` : `${project} foi removido da sua lista.`, "success");
    });
  });

  // Feedback toast acessível.
  const toastRegion = document.querySelector("#toast-region");
  function showToast(message, type = "success") {
    if (!toastRegion) return;
    const toast = document.createElement("div");
    toast.className = `toast${type === "error" ? " toast--error" : ""}`;
    const text = document.createElement("div");
    text.className = "toast__text";
    text.textContent = message;
    const close = document.createElement("button");
    close.className = "toast__close";
    close.type = "button";
    close.setAttribute("aria-label", "Fechar notificação");
    close.textContent = "×";
    close.addEventListener("click", () => toast.remove());
    toast.append(text, close);
    toastRegion.append(toast);
    window.setTimeout(() => toast.remove(), 5000);
  }

  // Modal de informação.
  const modal = document.querySelector("#info-modal");
  const modalTitle = document.querySelector("#modal-title");
  const modalDescription = document.querySelector("#modal-description");
  function openInfoModal(title, description) {
    if (!modal) return;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    if (typeof modal.showModal === "function") modal.showModal();
    else showToast(description);
  }
  document.querySelectorAll(".modal__close, .modal__ok").forEach(button => {
    button.addEventListener("click", () => modal?.close());
  });
  modal?.addEventListener("click", event => {
    if (event.target === modal) modal.close();
  });
  document.querySelectorAll("[data-demo-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openInfoModal("Informação demonstrativa", "Esta área é ilustrativa nesta versão acadêmica. Em uma plataforma real, aqui estaria publicada a política correspondente.");
    });
  });

  // Seletor de valores da doação.
  const amountButtons = [...document.querySelectorAll(".amount-option")];
  const customAmount = document.querySelector("#custom-amount");
  let selectedAmount = 50;
  amountButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.amount) === selectedAmount));
    button.addEventListener("click", () => {
      selectedAmount = Number(button.dataset.amount);
      customAmount.value = "";
      amountButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-selected", active);
        item.setAttribute("aria-pressed", String(active));
      });
      customAmount.removeAttribute("aria-invalid");
    });
  });
  customAmount?.addEventListener("input", () => {
    if (customAmount.value !== "") {
      amountButtons.forEach(item => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });
    }
    customAmount.removeAttribute("aria-invalid");
  });

  // Validação de formulários com mensagens de feedback; nenhum pagamento real.
  const donationForm = document.querySelector("#donation-form");
  donationForm?.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.querySelector("#donor-email");
    const message = document.querySelector("#donation-message");
    const custom = customAmount.value.trim();
    const amount = custom !== "" ? Number(custom) : selectedAmount;
    const validEmail = email.checkValidity() && email.value.trim() !== "";
    if (!Number.isFinite(amount) || amount < 5) {
      customAmount.setAttribute("aria-invalid", "true");
      message.className = "form-message is-error";
      message.textContent = "Informe um valor de doação igual ou superior a R$ 5,00.";
      (custom !== "" ? customAmount : amountButtons[0]).focus();
      return;
    }
    if (!validEmail) {
      email.setAttribute("aria-invalid", "true");
      message.className = "form-message is-error";
      message.textContent = "Digite um e-mail válido para continuar.";
      email.focus();
      return;
    }
    email.removeAttribute("aria-invalid");
    customAmount.removeAttribute("aria-invalid");
    message.className = "form-message is-success";
    message.textContent = `Tudo certo! Sua intenção de doar ${amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} foi registrada nesta demonstração. Nenhum pagamento foi realizado.`;
    showToast("Obrigado por querer fazer a diferença!");
  });
  document.querySelector("#donor-email")?.addEventListener("input", event => event.currentTarget.removeAttribute("aria-invalid"));

  const newsletterForm = document.querySelector("#newsletter-form");
  newsletterForm?.addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("#newsletter-email");
    const message = document.querySelector("#newsletter-message");
    if (!input.checkValidity() || !input.value.trim()) {
      input.setAttribute("aria-invalid", "true");
      message.className = "form-message is-error";
      message.textContent = "Informe um endereço de e-mail válido.";
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    message.className = "form-message is-success";
    message.textContent = "Inscrição demonstrativa concluída! Obrigado por se conectar à nossa causa.";
    newsletterForm.reset();
    showToast("Você entrou para a nossa rede de boas notícias.");
  });
  document.querySelector("#newsletter-email")?.addEventListener("input", event => event.currentTarget.removeAttribute("aria-invalid"));

  // Links de apoio direcionam para o formulário e dão feedback.
  document.querySelectorAll('a[href="#doar"]').forEach(link => {
    if (link.closest(".donation-form")) return;
    link.addEventListener("click", () => {
      const label = link.textContent.trim().replace(/\s+/g, " ");
      if (/apoiar projeto/i.test(label)) {
        const project = link.closest(".project-card")?.querySelector("h3")?.textContent;
        if (project) {
          const heading = document.querySelector(".donation-form h3");
          if (heading) heading.textContent = `Apoie: ${project}`;
        }
      }
    });
  });
})();
