# Conexão Solidária — Plataforma demonstrativa para ONGs

## Criador
Lucas Noel Gomes Batista - Engenharia de Software 

## Como executar

1. Extraia `conexao_solidaria.zip`.
2. Abra `index.html` no navegador.
3. Para uma experiência de desenvolvimento mais fiel, use a extensão **Live Server** no VS Code e abra a pasta do projeto.
4. A conexão com a internet permite carregar as fontes Google Fonts e fotografias do Unsplash. Sem internet, o site usa fontes genéricas, mas as imagens externas podem não aparecer.

Não é necessário instalar dependências nem executar um servidor de backend.

## Estrutura

```text
conexao_solidaria/
├── index.html
├── README.md
├── css/
│   ├── tokens.css       # Variáveis do design system, cores, fontes e espaçamentos
│   ├── base.css         # Reset, elementos globais, acessibilidade
│   ├── layout.css       # Estrutura principal com Grid e Flexbox
│   ├── components.css   # Botões, tags, filtros, estados e componentes
│   └── responsive.css   # Media queries e breakpoints
├── js/
│   └── main.js          # Menu, filtros, favoritos, toast, modal e formulários
└── assets/
    └── img/             # Diretório reservado para imagens locais
```

## Requisitos da Entrega II

- **Design system:** tokens CSS customizados, mais de 8 cores, hierarquia tipográfica com mais de 5 tamanhos e espaçamento modular incluindo 8, 16, 24, 32, 48 e 64 px.
- **Layout:** CSS Grid para as áreas principais, Flexbox para alinhamentos internos e classes com convenção consistente.
- **Grid de 12 colunas:** estrutura pronta para ser ampliada no CSS; os principais leiautes usam grids CSS específicos para o conteúdo.
- **Responsividade:** breakpoints em 1200, 1024, 800, 600 e 420 px.
- **Navegação:** menu dropdown, menu hambúrguer em telas menores e fechamento por Escape.
- **Componentes:** cards de projetos, filtros por categoria, botão de favorito, botões com estados, formulário de doação demonstrativo, newsletter, badges/tags, toasts e modal.
- **Acessibilidade:** idioma declarado, link para pular ao conteúdo, foco visível, atributos ARIA, rótulos de formulário, estados anunciados e suporte a movimento reduzido.

## Interações para demonstrar na apresentação

1. Redimensione a janela para visualizar os breakpoints.
2. Abra o menu **Explorar** e teste o submenu.
3. Em largura mobile, use o menu hambúrguer.
4. Filtre projetos por categoria e salve um projeto no coração.
5. Teste o formulário de doação com e-mail inválido, valor menor que R$ 5 e dados válidos.
6. Inscreva um e-mail na newsletter.
7. Abra os links “Privacidade” e “Termos de uso” no rodapé para ver o modal demonstrativo.

## Observações importantes

- Os números, organizações, metas e resultados são **dados fictícios de demonstração**.
- Os formulários não enviam dados a um servidor, não fazem cadastro persistente e não processam pagamentos.
- Os links de redes sociais e de algumas seções são ilustrativos.
- As fotografias são carregadas de URLs externas do Unsplash. Para entrega offline, baixe imagens com licença adequada e atualize os `src` no HTML.
- O diretório `assets/img/` fica reservado para as imagens locais do projeto.

## Sugestões para uma próxima versão

- Criar backend e banco de dados para organizações, projetos, doações e voluntários.
- Implementar autenticação e painel administrativo.
- Integrar um provedor de pagamento em ambiente seguro.
- Adicionar testes de acessibilidade e validação entre navegadores.
