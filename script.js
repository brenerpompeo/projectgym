document.addEventListener('DOMContentLoaded', () => {
    const bodyEl = document.body;
    
    // --- Lógica do Header e Menu ---
    (function headerInit() {
        const header = document.getElementById('site-header');
        if (!header) return;
        
        const onScroll = () => header.classList.toggle('elev', window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        const drawer = document.getElementById('drawer');
        const btnOpen = document.getElementById('btn-open');
        const btnClose = document.getElementById('btn-close');
        if (!drawer || !btnOpen || !btnClose) return;

        const openMenu = () => {
            drawer.classList.remove('hidden');
            drawer.setAttribute('aria-hidden', 'false');
            bodyEl.classList.add('overflow-hidden');
        };

        const closeMenu = () => {
            drawer.classList.add('hidden');
            drawer.setAttribute('aria-hidden', 'true');
            bodyEl.classList.remove('overflow-hidden');
        };

        btnOpen.addEventListener('click', openMenu);
        btnClose.addEventListener('click', closeMenu);
        drawer.addEventListener('click', (e) => {
            if (e.target.id === 'drawer') closeMenu();
        });
        document.querySelectorAll('#drawer .drawer__link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    })();
    
    // --- Lógica do Botão Flutuante de WhatsApp ---
    (function fabWhatsapp() {
        const fab = document.getElementById('whatsapp-fab');
        if(!fab) return;

        const onScroll = () => {
            if (window.scrollY > 400) {
                fab.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
            } else {
                fab.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    })();

    // --- Lógica de Animação no Scroll ---
    (function scrollReveal() {
        const scrollRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    scrollRevealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => {
            scrollRevealObserver.observe(el);
        });
    })();

    // --- Lógica do FAQ (Accordion) ---
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // --- Lógica do Rodapé e Modal de Políticas ---
    (function policyModal() {
        const modal = document.getElementById('policy-modal');
        if (!modal) return;

        const modalContainer = modal.querySelector('div');
        const closeBtn = document.getElementById('modal-close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const links = document.querySelectorAll('[data-policy]');

        const policies = {
            terms: {
                title: 'Termos de Uso',
                content: `
                    <h4 class="font-bold mb-2 text-white">1. Aceitação dos Termos</h4>
                    <p class="mb-4">Ao se matricular e utilizar as instalações da Project Gym, você concorda em cumprir estes Termos de Uso e todas as regras da academia.</p>
                    <h4 class="font-bold mb-2 text-white">2. Pagamento e Matrícula</h4>
                    <p class="mb-4">Os pagamentos dos planos devem ser realizados nas datas de vencimento. Atrasos podem resultar em taxas ou suspensão do acesso.</p>
                    <h4 class="font-bold mb-2 text-white">3. Conduta</h4>
                    <p class="mb-4">Esperamos que todos os membros mantenham uma conduta respeitosa. O uso correto dos equipamentos é obrigatório.</p>
                `
            },
            privacy: {
                title: 'Política de Privacidade',
                content: `
                    <h4 class="font-bold mb-2 text-white">1. Coleta de Dados</h4>
                    <p class="mb-4">Coletamos dados (nome, contato, pagamento) para gerenciar seu plano. Dados de saúde da avaliação física são usados para personalizar seu treino, com seu consentimento.</p>
                    <h4 class="font-bold mb-2 text-white">2. Uso de Dados</h4>
                    <p class="mb-4">Seus dados são usados para processar pagamentos, gerenciar seu acesso e enviar comunicações sobre a Project Gym. Não vendemos seus dados.</p>
                    <h4 class="font-bold mb-2 text-white">3. Compartilhamento de Dados</h4>
                    <p class="mb-4">Compartilhamos informações com processadores de pagamento e plataformas de benefícios (Wellhub, Totalpass) que você utiliza. Links externos (Google Maps, WhatsApp) têm suas próprias políticas de privacidade.</p>
                    <h4 class="font-bold mb-2 text-white">4. Seus Direitos</h4>
                    <p>Você tem o direito de acessar, corrigir ou solicitar a exclusão dos seus dados. Para exercer esses direitos, envie um e-mail para <a href="mailto:privacidade@projectgym.com.br" class="underline">privacidade@projectgym.com.br</a>.</p>
                `
            }
        };

        const openModal = (type) => {
            const policy = policies[type];
            if (!policy) return;

            modalTitle.textContent = policy.title;
            modalContent.innerHTML = policy.content;
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            bodyEl.classList.add('overflow-hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modalContainer.classList.remove('scale-95');
            }, 10);
        };

        const closeModal = () => {
            modal.classList.add('opacity-0');
            modalContainer.classList.add('scale-95');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                if (document.getElementById('drawer').classList.contains('hidden')) {
                   bodyEl.classList.remove('overflow-hidden');
                }
            }, 300);
        };

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const policyType = e.target.dataset.policy;
                openModal(policyType);
            });
        });

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
          if (e.key === "Escape" && !modal.classList.contains('hidden')) {
            closeModal();
          }
        });
    })();
    
    // --- Lógica do Banner de Cookies ---
    (function cookieBanner() {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');

        if (!banner || !acceptBtn || !declineBtn) return;

        setTimeout(() => {
            if (!localStorage.getItem('cookie_consent')) {
                banner.classList.remove('hidden', 'translate-y-24', 'opacity-0');
                banner.classList.add('flex');
            }
        }, 2000);

        const handleConsent = (consent) => {
            localStorage.setItem('cookie_consent', consent);
            banner.classList.add('opacity-0', 'translate-y-24');
            setTimeout(() => {
                banner.classList.add('hidden');
                banner.classList.remove('flex');
            }, 500);
        };

        acceptBtn.addEventListener('click', () => handleConsent('accepted'));
        declineBtn.addEventListener('click', () => handleConsent('declined'));
    })();

    // --- Proteção de Conteúdo ---
    (function contentProtection() {
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.addEventListener('keydown', event => {
            if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) || (event.ctrlKey && event.key.toUpperCase() === 'U')) {
                event.preventDefault();
            }
        });
    })();
    
     // --- Atualiza o ano no Footer ---
    (function year() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    })();

});
