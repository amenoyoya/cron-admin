/**
 * Client Side UI 関連プラグイン
 */
import Vue from 'vue'

/**
 * Vue.js Dialog
 * @usage vue.$dialog
 */
import VuejsDialog from 'vuejs-dialog'
Vue.use(VuejsDialog)


/**
 * Vue.js Ace Editor
 * <AceEditor v-model="document" lang="json" theme="tomorrow" width="auto" height="60vh" :options="{}" />
 */
import AceEditor from 'vue2-ace-editor'
// language extension prerequsite...
import 'brace/ext/language_tools'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/mode/sass'
import 'brace/mode/javascript'
import 'brace/mode/json'
import 'brace/mode/xml'
// themes
import 'brace/theme/tomorrow'
import 'brace/theme/tomorrow_night_eighties'
// snippet
// import 'brace/snippets/javascript'

Vue.component('AceEditor', AceEditor)


/**
 * Vue.js Quill Wysiwyg Editor
 */
import {VueEditor} from 'vue2-editor'

Vue.component('Quill', VueEditor)


/**
 * Vue.js sidebar menu
 * <sidebar-menu :menu="[{header, title, hiddenOnCollapse, icon, child}, ...]" />
 */
import VueSidebarMenu from 'vue-sidebar-menu'
Vue.use(VueSidebarMenu)
