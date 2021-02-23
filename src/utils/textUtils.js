import {  t } from '@lingui/macro';

function getText(text) {
   return t({ id: text}, text)

}

export { getText}