# Assets

Esta pasta contém todos os recursos estáticos do projeto.

## Estrutura

```
assets/
├── styles/          # Arquivos CSS globais e estilos compartilhados
│   └── main.css     # Estilos globais da aplicação
├── images/          # Imagens e fotos
├── icons/           # Ícones SVG ou PNG
└── fonts/           # Fontes customizadas (se houver)
```

## Uso

### Estilos
Os estilos globais estão em `styles/main.css` e são importados no `main.js`.

### Imagens
Para usar imagens nos componentes:

```vue
<template>
  <img src="@/assets/images/logo.png" alt="Logo" />
</template>
```

### Ícones
Para usar ícones SVG:

```vue
<template>
  <img src="@/assets/icons/icon.svg" alt="Ícone" />
</template>
```

Ou importe diretamente:

```javascript
import icon from '@/assets/icons/icon.svg'
```

