# 🔗 Como Adicionar Links dos Projetos na Timeline

## 📝 **Instruções Simples**

Para adicionar links que direcionam para cada projeto quando clicado, siga estes passos:

### **1. Localize o Projeto no Arquivo `timeline.html`**

Cada projeto tem uma estrutura como esta:
```html
<div class="timeline-item" data-year="2020" data-category="education health" data-project-url="#">
```

### **2. Substitua o `#` pela URL do Seu Projeto**

**ANTES:**
```html
data-project-url="#"
```

**DEPOIS:**
```html
data-project-url="https://seulink.com"
```

## 🎯 **Exemplos Práticos**

### **Projeto A Torre de Alendar (2020)**
```html
<!-- Linha 88 aproximadamente -->
<div class="timeline-item" data-year="2020" data-category="education health" data-project-url="https://github.com/seuusuario/torre-alendar">
```

### **Projeto Peltier Box (2021)**
```html
<!-- Linha 130 aproximadamente -->
<div class="timeline-item" data-year="2021" data-category="iot" data-project-url="https://github.com/seuusuario/peltier-box">
```

### **Projeto Smart Valve (2022)**
```html
<!-- Linha 172 aproximadamente -->
<div class="timeline-item" data-year="2022" data-category="iot" data-project-url="https://github.com/seuusuario/smart-valve">
```

### **Projeto Gear Up Arts (2023)**
```html
<!-- Linha 214 aproximadamente -->
<div class="timeline-item" data-year="2023" data-category="education" data-project-url="https://github.com/seuusuario/gear-up-arts">
```

### **Projeto Gear Up LEGO (2024)**
```html
<!-- Linha 256 aproximadamente -->
<div class="timeline-item" data-year="2024" data-category="education health" data-project-url="https://github.com/seuusuario/gear-up-lego">
```

### **Projeto Design Gráfico (2024)**
```html
<!-- Linha 298 aproximadamente -->
<div class="timeline-item" data-year="2024" data-category="design" data-project-url="https://behance.net/seuusuario">
```

### **Projetos Web 2025**
```html
<!-- Linha 340 aproximadamente -->
<div class="timeline-item" data-year="2025" data-category="web" data-project-url="https://github.com/seuusuario/projetos-web-2025">
```

## 🌐 **Tipos de Links Sugeridos**

### **Para Projetos de Código:**
- `https://github.com/seuusuario/nome-do-projeto`
- `https://gitlab.com/seuusuario/nome-do-projeto`

### **Para Sites/Aplicações:**
- `https://seusite.com`
- `https://seudominio.netlify.app`
- `https://seudominio.vercel.app`

### **Para Design/Portfolio:**
- `https://behance.net/seuusuario`
- `https://dribbble.com/seuusuario`
- `https://figma.com/file/seu-arquivo`

### **Para Documentação:**
- `https://docs.google.com/document/seu-documento`
- `https://notion.so/sua-pagina`

### **Para Apresentações:**
- `https://docs.google.com/presentation/sua-apresentacao`
- `https://canva.com/design/sua-apresentacao`

## ⚡ **Funcionalidade Atual**

### **✅ O que acontece quando há link:**
- Card fica clicável (cursor pointer)
- Aparece seta no canto superior direito
- Abre em nova aba quando clicado
- Efeito visual de clique

### **✅ O que acontece quando NÃO há link (#):**
- Mostra notificação: "Link será adicionado em breve"
- Card não é clicável
- Sem efeitos visuais de link

## 🎨 **Comportamento Visual**

### **Cards com Link:**
```
🎯 Cursor: pointer
→ Seta no canto superior direito
✨ Hover effects intensificados
🔗 Tooltip: "Clique para ver o projeto"
```

### **Cards sem Link:**
```
🎯 Cursor: default
🚀 Notificação temporária
✨ Hover effects normais
💬 Tooltip: "Link será adicionado em breve"
```

## 🔧 **Dicas Avançadas**

### **1. Links para Seções Específicas:**
```html
data-project-url="https://github.com/usuario/projeto#readme"
```

### **2. Links para Demonstrações:**
```html
data-project-url="https://seusite.com/demo"
```

### **3. Links para Documentação:**
```html
data-project-url="https://seusite.com/docs"
```

### **4. Links para Vídeos:**
```html
data-project-url="https://youtube.com/watch?v=seu-video"
```

## ⚠️ **Importante**

- **Sempre teste** os links antes de publicar
- **Use HTTPS** sempre que possível
- **Links externos** abrem em nova aba automaticamente
- **Sem links?** Deixe `#` e será mostrada notificação amigável

## 🚀 **Resultado Final**

Após adicionar os links, sua timeline ficará:
- ✨ **Interativa** - Visitantes podem explorar seus projetos
- 🎯 **Profissional** - Links diretos para portfólio
- 📱 **Responsiva** - Funciona em todos os dispositivos
- 🔄 **Dinâmica** - Feedback visual em tempo real

---

**Pronto!** Agora sua timeline está completamente funcional e direcionará visitantes para seus projetos reais! 🎉 