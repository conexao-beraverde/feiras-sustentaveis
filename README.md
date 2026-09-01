# Conexão BeraVerde

Site do projeto de PANC (Plantas Alimentícias Não Convencionais), aproveitamento
integral dos alimentos e Mapa das Feiras — 1º ano A do curso técnico em
Informática do IFRO, Porto Velho / RO.

## Publicar / rodar

Site estático — não precisa de build. Basta servir a pasta:

```
npx serve .
```

O CSS já vem compilado em `css/output.css`. Para regenerar a partir do Tailwind:

```
npx @tailwindcss/cli -i css/input.css -o css/output.css --watch
```

## GitHub Pages

Hospedado direto da branch `main`, raiz do repositório (`/`).
O arquivo `.nojekyll` desliga o processamento Jekyll.
