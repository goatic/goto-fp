const createScriptHtml = url =>
  ` <script src="${url}"></script>
  `

const createClientHtml = title =>
  scriptUrls =>
    ` <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta charset='UTF-8'>
          ${scriptUrls.map(createScriptHtml)}
        </head>
        <body>
        </body>
      </html>
    `

const clientHtml = createClientHtml
  ('Client Application')
  (['/public/client.js'])

module.exports = request =>
  clientHtml
