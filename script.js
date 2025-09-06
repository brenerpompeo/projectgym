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
        onScroll(); // Executa uma vez para verificar o estado inicial
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
                    <p class="mb-4">Ao se matricular e utilizar as instalações da Project Gym, você concorda em cumprir estes Termos de Uso e todas as regras da academia. Se você não concordar com qualquer parte dos termos, não deverá utilizar nossos serviços.</p>
                    <h4 class="font-bold mb-2 text-white">2. Pagamento e Matrícula</h4>
                    <p class="mb-4">Os pagamentos dos planos devem ser realizados nas datas de vencimento estipuladas. Atrasos podem resultar em taxas adicionais ou suspensão do acesso. A matrícula é pessoal e intransferível.</p>
                    <h4 class="font-bold mb-2 text-white">3. Conduta e Utilização</h4>
                    <p class="mb-4">Esperamos que todos os membros mantenham uma conduta respeitosa. O uso correto dos equipamentos é obrigatório. A Project Gym não se responsabiliza por lesões resultantes de uso inadequado dos equipamentos ou da não observância das orientações dos instrutores.</p>
                    <h4 class="font-bold mb-2 text-white">4. Cancelamento</h4>
                    <p>As políticas de cancelamento variam de acordo com o plano contratado. Consulte o contrato de adesão ou a recepção para obter detalhes sobre multas e prazos.</p>
                `
            },
            privacy: {
                title: 'Política de Privacidade',
                content: `
                    <h4 class="font-bold mb-2 text-white">1. Coleta de Dados</h4>
                    <p class="mb-4">Coletamos informações pessoais (nome, contato, dados de pagamento) no momento da sua matrícula para a gestão do seu plano e para comunicação. Podemos coletar dados de saúde através da avaliação física, com seu consentimento explícito, para personalizar seu treino.</p>
                    <h4 class="font-bold mb-2 text-white">2. Uso de Dados</h4>
                    <p class="mb-4">Seus dados são utilizados para processar pagamentos, gerenciar seu acesso, enviar comunicações sobre seu plano, eventos e promoções da Project Gym. Dados de saúde são usados exclusivamente pela nossa equipe para garantir a segurança e eficácia do seu programa de treinos.</p>
                    <h4 class="font-bold mb-2 text-white">3. Compartilhamento de Dados</h4>
                    <p class="mb-4">Não compartilhamos suas informações pessoais com terceiros, exceto com processadores de pagamento e, se aplicável, com as plataformas de benefícios corporativos (Wellhub, Totalpass, etc.) que você utiliza para acessar nossos serviços.</p>
                     <h4 class="font-bold mb-2 text-white">4. Seus Direitos</h4>
                    <p>Você tem o direito de acessar, corrigir ou solicitar a exclusão dos seus dados pessoais. Para exercer esses direitos, entre em contato com nossa recepção.</p>
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
                // Apenas remove a classe se o menu mobile não estiver aberto
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
    
    // --- PROTEÇÃO DE CÓDIGO: Lógica para desabilitar interações indesejadas ---
    (() => {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            // Bloqueia F12, Ctrl+Shift+I/J/C, Ctrl+U
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) || (e.ctrlKey && e.key.toUpperCase() === 'U')) {
                e.preventDefault();
            }
        });
    })();
    
     // --- Atualiza o ano no Footer ---
    (function year() {
        const el = document.getElementById('year');
        if (el) el.textContent = new Date().getFullYear();
    })();

});
