export const sanizeContent = (content) => content
.replace(/ +/g, ' ')
.replaceAll('&nbsp;',' ')
.replaceAll('<div><br></div>', '\n')
.replaceAll('<div>', '\n')
.replaceAll('</div>', '')

